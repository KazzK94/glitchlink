'use client'

import { useConversationsStore } from '@/stores/conversationsStore'
import { useEffect } from 'react'

interface InitConversationsWithTargetUsernameProps {
	targetUsername: string
	loggedUsername?: never
}

interface InitConversationsWithLoggedUsernameProps {
	loggedUsername: string
	targetUsername?: never
}

type InitConversationsProps = InitConversationsWithTargetUsernameProps | InitConversationsWithLoggedUsernameProps

export function InitConversations({ targetUsername, loggedUsername }: InitConversationsProps) {
	const fetchConversations = useConversationsStore((state) => state.fetchConversations)
	const selectFirstConversation = useConversationsStore((state) => state.selectFirstConversation)
	const selectConversationByUsername = useConversationsStore((state) => state.selectConversationByUsername)
	const targetUser = useConversationsStore((state) => state.targetUser)

	useEffect(() => {
		async function populateConversations() {
			// Check based on targetUser instead of selectedConversation to prevent unnecessary re-renders
			if(targetUser === null) {
				await fetchConversations()
			}
			if (targetUsername) {
				selectConversationByUsername(targetUsername)
			} else if(loggedUsername) {
				selectFirstConversation(loggedUsername)
			} else {
				console.error('Error initializing conversations')
			}
		}
		populateConversations()
	}, [fetchConversations, selectConversationByUsername, selectFirstConversation, targetUsername, loggedUsername, targetUser])

	return null
}