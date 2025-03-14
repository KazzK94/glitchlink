'use client'

import { useConversationsStore } from '@/stores/conversationsStore'
import { UserPublicInfo } from '@/types'
import { useEffect } from 'react'

interface InitConversationsProps {
	loggedUser: UserPublicInfo
	targetUser?: UserPublicInfo
}

export function InitConversations({ loggedUser, targetUser: baseTargetUser }: InitConversationsProps) {
	const fetchConversations = useConversationsStore((state) => state.fetchConversations)
	const selectFirstConversation = useConversationsStore((state) => state.selectFirstConversation)
	const selectConversationByUser = useConversationsStore((state) => state.selectConversationByUser)
	const subscribeToNewMessages = useConversationsStore((state) => state.subscribeToNewMessages)
	const targetUser = useConversationsStore((state) => state.targetUser)

	useEffect(() => {
		async function populateConversations() {
			// Check based on targetUser instead of selectedConversation to prevent unnecessary re-renders
			if(targetUser === null) {
				await fetchConversations()
			}
			if (baseTargetUser) {
				selectConversationByUser(loggedUser, baseTargetUser)
			} else if(loggedUser.username) {
				selectFirstConversation(loggedUser)
			} else {
				console.error('Error initializing conversations')
			}
		}
		populateConversations()

		subscribeToNewMessages(loggedUser.id)
	}, [fetchConversations, selectConversationByUser, selectFirstConversation, baseTargetUser, loggedUser, targetUser, subscribeToNewMessages])

	return null
}