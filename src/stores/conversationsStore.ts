
import { createTempConversation, createTempMessage, isTempConversation } from '@/services/conversationsUtils'
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { create } from 'zustand'

type ConversationsStore = {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversationIndex: number | null
	targetUser: UserPublicInfo | null
	fetchConversations: () => Promise<void>
	selectFirstConversation: (loggedUser: UserPublicInfo) => void
	selectConversationByUser: (loggedUser: UserPublicInfo, targetUser: UserPublicInfo) => void
	getSelectedConversation: () => ConversationWithUsersAndMessages | null
	sendMessage: (messageContent: string, loggedUser: UserPublicInfo) => Promise<void>
}

const useConversationsStore = create<ConversationsStore>((set, get) => ({
	conversations: [],
	selectedConversationIndex: null,
	targetUser: null,

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
				targetUser: null
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
				conversations: [tempConversation, ...conversations]
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
			// And do nothing else, since the message is already in the state so UI shows it (and it's stored)
		}
	}
}))

export { useConversationsStore }
