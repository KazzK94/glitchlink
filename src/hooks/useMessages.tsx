/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// Hooks
import { useEffect, useState, useRef } from "react"

// Libs
import { pusherClient } from '@/lib/pusher'
import { toast } from 'sonner'

// Services
import { createConversation, sendMessage } from '@/services/conversations'

// Types
import { UserPublicInfo } from '@/types'
import { Conversation as ConversationType, Message as MessageType } from '@prisma/client'
import { Channel } from 'pusher-js'

interface ConversationWithUsersAndMessages extends ConversationType {
	messages: MessageType[]
	userA: UserPublicInfo,
	userB: UserPublicInfo
}

const CONVERSATION_NO_ID = 'NO_ID'

export function useMessages({ conversations: conversationsBase, loggedUser, targetUser }: { conversations: ConversationWithUsersAndMessages[], loggedUser: UserPublicInfo, targetUser: UserPublicInfo }) {

	const conversationIndexRef = useRef(findConversationIndex(conversationsBase, targetUser))

	const [conversations, setConversations] = useState(() => {
		if (conversationIndexRef.current === -1) {
			conversationIndexRef.current = 0
			return [
				createEmptyConversation(loggedUser, targetUser),
				...conversationsBase
			]
		}
		return conversationsBase
	})

	const [messageInput, setMessageInput] = useState("")
	const [isSendingMessage, setIsSendingMessage] = useState(false)

	const channelRef = useRef<Channel | null>(null)

	const subscribeToChannel = (conversationId: string) => {
		if (conversationId === CONVERSATION_NO_ID) return
		channelRef.current = pusherClient.subscribe(`conversation-${conversationId}`)
		channelRef.current.bind('new-message', function (data: { message: MessageType }) {
			setConversations((conversations) => conversations.map((conversation) => {
				if (conversation.id === conversationId) {
					// Remove the temporary optimistic message
					const equivalentOptimisticMessageIndex = conversation.messages.findIndex((message) => {
						return (!!isTempMessage({ message }) && message.content === data.message.content)
					})
					// Store valid messages, adding the new one (and replacing the optimistic one if it exists)
					const validMessages = (equivalentOptimisticMessageIndex === -1)
						? conversation.messages
						: conversation.messages.toSpliced(equivalentOptimisticMessageIndex, 1)
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

	const unsubscribeFromChannel = (conversationId: string) => {
		if (conversationId === CONVERSATION_NO_ID) return
		channelRef.current?.unbind('new-message')
		pusherClient.unsubscribe(`conversation-${conversationId}`)
	}

	const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageInput(e.target.value)
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (messageInput.trim() === "" || isSendingMessage) return

		setIsSendingMessage(true)

		const tempMessage: MessageType = createTempMessage({
			authorId: loggedUser.id,
			content: messageInput
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
			setMessageInput("")
			if (conversationIndexRef.current === 0 && conversations[0].id === CONVERSATION_NO_ID) {
				// CREATE NEW CONVERSATION
				toast.info('You started a conversation with ' + targetUser.name)
				const newConversation = await createConversation({ targetUserId: targetUser.id, message: messageInput })
				setConversations([newConversation, ...conversations.slice(1)])
				// And subscribe to changes in that conversation
				subscribeToChannel(newConversation.id)
			} else {
				// SEND MESSAGE TO EXISTING CONVERSATION
				await sendMessage({ conversationId: conversations[conversationIndexRef.current].id, message: messageInput })
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
		if (conversationIndexRef.current === -1) return
		const conversationId = conversations[conversationIndexRef.current].id
		subscribeToChannel(conversationId)
		return () => unsubscribeFromChannel(conversationId)
	}, [])

	return {
		conversations,
		conversationIndex: conversationIndexRef.current,
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

function createTempMessage({ authorId, content }: { authorId: string, content: string }): MessageType {
	return {
		id: `TEMP-${Date.now()}`, // Temporary ID
		conversationId: CONVERSATION_NO_ID,
		authorId,
		content,
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

function isTempMessage({ message }: { message: { id: string } }): boolean {
	return message.id.startsWith('TEMP-')
}

function findConversationIndex(conversations: ConversationWithUsersAndMessages[], targetUser: UserPublicInfo): number {
	return conversations.findIndex((conversation) => {
		return (
			conversation.userA.username === targetUser.username ||
			conversation.userB.username === targetUser.username
		)
	})
}