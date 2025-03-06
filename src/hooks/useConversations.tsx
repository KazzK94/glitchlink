/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef } from "react"
// import { pusherClient } from '@/lib/pusher'
import { toast } from 'sonner'
import { createConversation, sendMessage } from '@/services/api/conversations'
import { createTempConversation, createTempMessage, findConversationIndex, isTempConversation, NO_CONVERSATION_FOUND_INDEX } from '@/services/conversationsUtils'

// Types:
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { Message } from '@prisma/client'
// import { Channel } from 'pusher-js'

interface UseConversationsProps {
	conversations: ConversationWithUsersAndMessages[]
	loggedUser: UserPublicInfo
	targetUser?: UserPublicInfo
}

export function useConversations({
	conversations: conversationsBase,
	loggedUser,
	targetUser: targetUserBase
}: UseConversationsProps) {

	const conversationIndexRef = useRef(findConversationIndex(conversationsBase, targetUserBase))

	const [conversations, setConversations] = useState(() => {
		// If logged user has no conversations:
		if (conversationsBase.length <= 0) {
			return []
		}
		// If no user (to select the conversation with) is explicitly selected yet:
		if (conversationIndexRef.current === NO_CONVERSATION_FOUND_INDEX) {
			conversationIndexRef.current = 0
		}
		// If the selected user does not have a conversation with logged user yet:
		if (targetUserBase && conversationIndexRef.current === -1) {
			conversationIndexRef.current = 0
			return [
				createTempConversation(loggedUser, targetUserBase),
				...conversationsBase
			]
		}
		// In any proper case:
		return conversationsBase
	})

	const targetUser = useRef(
		targetUserBase || (
			conversationIndexRef.current < 0
				? null
				: (conversations[conversationIndexRef.current].userAId === loggedUser.id)
					? conversations[conversationIndexRef.current].userB
					: conversations[conversationIndexRef.current].userA
		)
	)

	const [isSendingMessage, setIsSendingMessage] = useState(false)

	/* 
	const channelRef = useRef<Channel | null>(null)
	
	const subscribeToChannel = (conversationId: string) => {
		channelRef.current = pusherClient.subscribe(`user-${loggedUser.id}`)
		channelRef.current.bind('new-message', function (data: { message: Message }) {
			setConversations((conversations) => conversations.map((conversation) => {
				if (conversation.id === conversationId) {
					// Remove the temporary optimistic message
					const tempMessageIndex = conversation.messages.findIndex((message) => {
						return (isTempMessage({ message }) && message.content === data.message.content)
					})
					// Store valid messages, adding the new one (and replacing the optimistic one if it exists)
					const validMessages = (tempMessageIndex === -1)
						? conversation.messages
						: conversation.messages.toSpliced(tempMessageIndex, 1)
					// and update the conversation 
					return {
						...conversation,
						messages: [data.message, ...validMessages]
					}
				}
				return conversation
			}))
		})
	}

	const unsubscribeFromChannel = () => {
		channelRef.current?.unbind('new-message')
		pusherClient.unsubscribe(`user-${loggedUser.id}`)
	}
 */
	const handleSendMessage = async (messageContent: string) => {
		if (!targetUser || messageContent.trim() === "" || isSendingMessage) return

		setIsSendingMessage(true)

		const tempMessage: Message = createTempMessage({
			authorId: loggedUser.id,
			content: messageContent
		})

		// Optimistic update
		setConversations((conversations) => conversations.map((conversation, index) => {
			if (index === conversationIndexRef.current) {
				return {
					...conversation,
					messages: [tempMessage, ...conversation.messages]
				}
			}
			return conversation
		}))


		try {
			if (targetUser?.current && conversationIndexRef.current === 0 && isTempConversation({ conversationId: conversations[0].id })) {
				// CREATE NEW CONVERSATION
				toast.info('You started a conversation with ' + targetUser.current.name)
				const newConversation = await createConversation({ targetUserId: targetUser.current.id, message: messageContent })
				setConversations([newConversation, ...conversations.slice(1)])
				// And subscribe to changes in that conversation
				// TODO: Uncomment the line below:
				//subscribeToChannel(newConversation.id)
			} else {
				// SEND MESSAGE TO EXISTING CONVERSATION
				await sendMessage({ conversationId: conversations[conversationIndexRef.current].id, messageContent: messageContent })
				// This will update the conversation via Pusher (see useEffect below)
			}
		} catch (error) {
			console.error(error)
			toast.error('Failed to send message')
		} finally {
			setIsSendingMessage(false)
		}

	}

	// Subscribe to new messages of current conversation
	useEffect(() => {
		console.log('- RENDERING HOOK useConversations!')
		if (conversationIndexRef.current < 0) return
		// TODO: Uncomment the 2 lines below:
		//subscribeToChannel(conversationId)
		//return () => unsubscribeFromChannel()
	}, [])

	return {
		conversations,
		conversationIndex: conversationIndexRef.current,
		targetUser: targetUser.current,
		isSendingMessage,
		handleSendMessage
	}
}
