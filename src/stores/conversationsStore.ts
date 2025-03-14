
import { createTempConversation, createTempMessage, isTempConversation } from '@/services/conversationsUtils'
import { getUserChannel, subscribeToMessagesPusherChannel } from '@/services/pusherClient'
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { Channel } from 'pusher-js'
import { create } from 'zustand'

type ConversationsStore = {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversationIndex: number | null
	targetUser: UserPublicInfo | null
	hasLoaded: boolean
	pusherChannel: Channel | null
	fetchConversations: () => Promise<void>
	selectFirstConversation: (loggedUser: UserPublicInfo) => void
	selectConversationByUser: (loggedUser: UserPublicInfo, targetUser: UserPublicInfo) => void
	getSelectedConversation: () => ConversationWithUsersAndMessages | null
	sendMessage: (messageContent: string, loggedUser: UserPublicInfo) => Promise<void>
	subscribeToNewMessages: (loggedUserId: string) => void
}

const useConversationsStore = create<ConversationsStore>((set, get) => ({
	conversations: [],
	selectedConversationIndex: null,
	targetUser: null,
	pusherChannel: null,
	hasLoaded: false,

	fetchConversations: async () => {
		const conversations = await fetch('/api/conversations')
			.then((res) => res.json())
		set({ conversations })
	},

	selectFirstConversation: (loggedUser) => {
		const { conversations } = get()
		if (conversations.length === 0) {
			return set({
				selectedConversationIndex: null,
				targetUser: null,
				hasLoaded: true
			})
		}
		const newTargetUser = conversations[0].userA.id === loggedUser.id
			? conversations[0].userB
			: conversations[0].userA
		set({
			selectedConversationIndex: 0,
			targetUser: newTargetUser
		})

	},

	selectConversationByUser: async (loggedUser, baseTargetUser) => {
		const { conversations } = get()

		const selectedConversationIndex = conversations.findIndex((conversation) => {
			return conversation.userA.id === baseTargetUser.id || conversation.userB.id === baseTargetUser.id
		})

		// If conversation is not found, create a temporary one
		if (selectedConversationIndex === -1) {
			const tempConversation = createTempConversation(loggedUser, baseTargetUser)
			return set({
				selectedConversationIndex: 0,
				targetUser: baseTargetUser,
				conversations: [tempConversation, ...conversations],
				hasLoaded: true
			})
		}

		const selectedConversation = conversations[selectedConversationIndex]

		const targetUser = selectedConversation.userA.id === baseTargetUser.id
			? selectedConversation.userA
			: selectedConversation.userB

		set({
			selectedConversationIndex,
			targetUser
		})
	},

	getSelectedConversation: () => {
		const { conversations, selectedConversationIndex } = get()
		if (selectedConversationIndex === null) {
			return null
		}
		return conversations[selectedConversationIndex]
	},

	sendMessage: async (messageContent: string, loggedUser: UserPublicInfo) => {
		const { conversations, selectedConversationIndex } = get()
		if (selectedConversationIndex === null) {
			return
		}

		const newMessage = createTempMessage({
			authorId: loggedUser.id,
			content: messageContent,
			conversationId: conversations[selectedConversationIndex].id
		})

		const clonedConversations = structuredClone(conversations)
		clonedConversations[selectedConversationIndex].messages = [
			newMessage,
			...clonedConversations[selectedConversationIndex].messages
		]

		set({
			conversations: clonedConversations
		})

		const conversationId = conversations[selectedConversationIndex].id

		if (isTempConversation({ conversationId })) {
			// If message is starting a new conversation, create it in the server
			const newConversation = await fetch('/api/conversations', {
				method: 'POST',
				body: JSON.stringify({
					targetUserId: conversations[selectedConversationIndex].userB.id,
					message: newMessage.content
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
			// Then replace the temp conversation with the real one
			set({
				conversations: [newConversation, ...clonedConversations.slice(1)]
			})
		} else {
			// If conversation already exists, send the message to the server
			await fetch(`/api/conversations/${conversationId}/messages`, {
				method: 'POST',
				body: JSON.stringify({
					message: newMessage.content
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())

			// And do nothing else, since the message is already in the state so UI shows it (and it's stored)
		}
	},

	subscribeToNewMessages: (loggedUserId: string) => {
		let { pusherChannel } = get()
		if (pusherChannel === null) {
			pusherChannel = getUserChannel(loggedUserId)
		}

		subscribeToMessagesPusherChannel({
			channel: pusherChannel,
			loggedUserId,
			onNewMessage: async (message) => {
				const { conversations } = get()
				const conversationIndex = conversations.findIndex((conversation) => conversation.id === message.conversationId)
				if (conversationIndex === -1) {
					// Conversation does not exist in the state, so create it

					// GET the new conversation from DB via fetch
					const { conversation } = await fetch(`/api/conversations/${message.conversationId}`)
						.then((res) => res.json())

					// If the newly created conversation is the logged user's, do nothing (it's alredy in the UI)
					if (conversation.userA.id === loggedUserId) {
						return
					}

					// If user is the receiver, add the new conversation to the state and adjust selectedConversationIndex
					set((state) => ({
						conversations: [conversation, ...conversations],
						selectedConversationIndex: state.selectedConversationIndex !== null ? state.selectedConversationIndex + 1 : null
					}))
				} else {
					// If I sent the message, my conversation is already updated
					if (message.authorId === loggedUserId) {
						return
					}
					// If conversation already exists, add the message to it
					const clonedConversations = structuredClone(conversations)
					clonedConversations[conversationIndex].messages = [
						message,
						...clonedConversations[conversationIndex].messages
					]
					set({
						conversations: clonedConversations
					})
				}
			}
		})
	}
}))

export { useConversationsStore }
