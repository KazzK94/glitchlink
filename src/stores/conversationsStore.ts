
import { createTempConversation } from '@/services/conversationsUtils'
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { create } from 'zustand'

type ConversationsStore = {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversation: ConversationWithUsersAndMessages | null
	targetUser: UserPublicInfo | null
	fetchConversations: () => Promise<void>
	selectFirstConversation: (loggedUser: UserPublicInfo) => void
	selectConversationByUser: (loggedUser: UserPublicInfo, targetUser: UserPublicInfo) => void
}

const useConversationsStore = create<ConversationsStore>((set, get) => ({
	conversations: [],
	selectedConversation: null,
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
				selectedConversation: null,
				targetUser: null
			})
		}
		const selectedConversation = conversations[0]
		const newTargetUser = selectedConversation.userA.id === loggedUser.id ? selectedConversation.userB : selectedConversation.userA
		set({
			selectedConversation,
			targetUser: newTargetUser
		})

	},
	selectConversationByUser: async (loggedUser, baseTargetUser) => {
		const { conversations } = get()

		const selectedConversation = conversations.find((conversation) => {
			return conversation.userA.id === baseTargetUser.id || conversation.userB.id === baseTargetUser.id
		}) || null

		// If conversation is not found, create a temporary one
		if (!selectedConversation) {
			console.log({loggedUserId: loggedUser.id, baseTargetUserId: baseTargetUser.id})
			const tempConversation = createTempConversation(loggedUser, baseTargetUser)
			return set({
				selectedConversation: tempConversation,
				targetUser: baseTargetUser,
				conversations: [tempConversation, ...conversations]
			})
		}

		const targetUser = selectedConversation.userA.id === baseTargetUser.id 
			? selectedConversation.userA 
			: selectedConversation.userB

		set({
			selectedConversation,
			targetUser
		})
	}
}))

export { useConversationsStore }
