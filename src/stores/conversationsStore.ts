
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { create } from 'zustand'

type ConversationsStore = {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversation: ConversationWithUsersAndMessages | null
	targetUser: UserPublicInfo | null
	fetchConversations: () => Promise<void>
	selectFirstConversation: () => void
	selectConversationByUsername: (username: string) => void
}

const useConversationsStore = create<ConversationsStore>((set) => ({
	conversations: [],
	selectedConversation: null,
	targetUser: null,

	fetchConversations: async () => {
		const conversations = await fetch('/api/conversations')
			.then((res) => res.json())
		set({ conversations })
	},
	selectFirstConversation: () => {
		set((state) => ({ selectedConversation: state.conversations.length > 0 ? state.conversations[0] : null }))
	},
	selectConversationByUsername: (username: string) => {
		set((state) => {
			const selectedConversation = state.conversations.find((conversation) => {
				const otherUser = conversation.userA.username === username ? conversation.userB : conversation.userA
				return otherUser.username === username
			}) || null
			const targetUser = selectedConversation ?
				selectedConversation.userA.username === username ? selectedConversation.userB : selectedConversation.userA
				: null
			return {
				selectedConversation,
				targetUser
			}
		})
	}
}))

export { useConversationsStore }