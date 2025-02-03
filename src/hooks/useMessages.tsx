'use client'

import { useEffect, useState } from "react"

import { pusherClient } from '@/lib/pusher'

import { Conversation as ConversationType, Message as MessageType } from '@prisma/client'
import { UserPublicInfo } from '@/types'
import { toast } from 'sonner'
import { createConversation, sendMessage } from '@/services/conversations'

interface ConversationWithUsersAndMessages extends ConversationType {
	messages: MessageType[]
	userA: UserPublicInfo,
	userB: UserPublicInfo
}

const CONVERSATION_NO_ID = 'NO_ID'

export function useMessages({ conversations: conversationsBase, loggedUser, targetUser }: { conversations: ConversationWithUsersAndMessages[], loggedUser: UserPublicInfo, targetUser: UserPublicInfo }) {

	let conversationIndex = findConversationIndex(conversationsBase, targetUser)
	if (conversationIndex === -1) {
		conversationsBase.unshift(createEmptyConversation(loggedUser, targetUser))
		conversationIndex = 0
	}

	const [conversations, setConversations] = useState(conversationsBase)
	const [messageInput, setMessageInput] = useState("")
	const [isSendingMessage, setIsSendingMessage] = useState(false)

	// Subscribe to new messages of current conversation
	useEffect(() => {
		const conversationId = conversations[conversationIndex].id
		const channel = pusherClient.subscribe(`conversation-${conversationId}`)
		channel.bind('new-message', function (data: { message: MessageType }) {
			setConversations((conversations) => conversations.map((conversation) => {
				if (conversation.id === conversationId) {
					return {
						...conversation,
						messages: [data.message, ...conversations[conversationIndex].messages]
					}
				}
				return conversation
			}))
		})
		return () => {
			channel.unbind('new-message')
			pusherClient.unsubscribe(`conversation-${conversationId}`)
		}
	}, [])

	const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageInput(e.target.value)
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (messageInput.trim() !== "") {
			if (isSendingMessage) return
			setIsSendingMessage(true)
			try {
				setMessageInput("")
				setIsSendingMessage(false)
				if (conversationIndex === 0 && conversations[0].id === CONVERSATION_NO_ID) {
					// CREATE NEW CONVERSATION
					toast.info('You started a conversation with ' + targetUser.name)
					const newConversation = await createConversation({ targetUserId: targetUser.id, message: messageInput })
					setConversations((conversations) => [newConversation, ...conversations.slice(1)])
				} else {
					// SEND MESSAGE TO EXISTING CONVERSATION
					await sendMessage({ conversationId: conversations[conversationIndex].id, message: messageInput })
					// This will update the conversation via Pusher (see useEffect above)
				}
			} catch (error) {
				console.error(error)
				toast.error('Failed to send message')
				setIsSendingMessage(false)
			}
		}
	}

	return {
		conversations,
		conversationIndex,
		messageInput,
		isSendingMessage,
		handleChangeMessageInput,
		handleSendMessage
	}
}


function createEmptyConversation(userA: UserPublicInfo, userB: UserPublicInfo): ConversationWithUsersAndMessages {
	return {
		id: CONVERSATION_NO_ID,
		userA,
		userAId: userA.id,
		userB,
		userBId: userB.id,
		createdAt: new Date(),
		lastMessageAt: new Date(),
		messages: []
	}
}

function findConversationIndex(conversations: ConversationWithUsersAndMessages[], targetUser: UserPublicInfo): number {
	return conversations.findIndex((conversation) => {
		return (
			conversation.userA.username === targetUser.username ||
			conversation.userB.username === targetUser.username
		)
	})
}