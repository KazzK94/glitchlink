
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { create } from 'zustand'

type ConversationsStore = {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversation: ConversationWithUsersAndMessages | null
	targetUser: UserPublicInfo | null
	fetchConversations: () => Promise<void>
	selectFirstConversation: (loggedUsername: string) => void
	selectConversationByUsername: (username: string) => void
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
	selectFirstConversation: (loggedUsername) => {
		const { conversations } = get()
		if (conversations.length === 0) {
			return set({
				selectedConversation: null,
				targetUser: null
			})
		}
		const selectedConversation = conversations[0]
		const newTargetUser = selectedConversation.userA.username === loggedUsername ? selectedConversation.userB : selectedConversation.userA
		set({
			selectedConversation,
			targetUser: newTargetUser
		})

	},
	selectConversationByUsername: (targetUsername) => {
		const { conversations } = get()

		const selectedConversation = conversations.find((conversation) => {
			return conversation.userA.username === targetUsername || conversation.userB.username === targetUsername
		}) || null

		const targetUser = selectedConversation ?
			selectedConversation.userA.username === targetUsername ? selectedConversation.userA : selectedConversation.userB
			: null

		set({
			selectedConversation,
			targetUser
		})
	}
}))

export { useConversationsStore }