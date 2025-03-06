'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from '../auth'
import { getUser } from './users'
import { sendMessageToPusher } from '../pusher'

/**
 * Checks if a conversation between these two users already exists. 
 *  - If it exists, it returns the conversation (adding the message if it was included).
 *  - If it doesn't exist, it creates a new conversation and returns it (also adding the message if it was included).
 * @param targetUserId The id of the user to start a conversation with.
 * @param message (optional) The initial message to send in the conversation.
 * @returns The conversation between the logged user and the target user.
 * */
export async function createConversation({ targetUserId, message }: { targetUserId: string, message?: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) throw new Error('User not logged in')

	const targetUser = await getUser({ where: { id: targetUserId } })
	if (!targetUser) throw new Error('Target user not found')

	const existingConversation = await prisma.conversation.findFirst({
		where: {
			OR: [
				{ userAId: loggedUser.id, userBId: targetUser.id },
				{ userAId: targetUser.id, userBId: loggedUser.id }
			]
		},
		include: {
			messages: {
				take: 20,
				orderBy: { createdAt: 'desc' }
			},
			userA: { select: { id: true, username: true, name: true, avatar: true } },
			userB: { select: { id: true, username: true, name: true, avatar: true } }
		}
	})

	if (existingConversation) {
		if (message) {
			const response = await sendMessage({ conversationId: existingConversation.id, message })
			if (!response) throw new Error('Failed to send the message')
			return response
		}
		return existingConversation
	}

	try {
		const result = await prisma.conversation.create({
			data: {
				userAId: loggedUser.id,
				userBId: targetUser.id,
				messages: message ? {
					create: [{
						content: message,
						authorId: loggedUser.id
					}]
				} : undefined
			},
			include: {
				messages: {
					take: 20,
					orderBy: { createdAt: 'desc' }
				},
				userA: { select: { id: true, username: true, name: true, avatar: true } },
				userB: { select: { id: true, username: true, name: true, avatar: true } }
			}
		})
		// - Pusher Logic -
		const author = result.userAId === loggedUser.id ? result.userA : result.userB
		const targetId = result.userAId === loggedUser.id ? result.userBId : result.userAId
		await sendMessageToPusher({ message: result.messages[0], author, targetId })
		// - End of Pusher Logic -
		return result
	} catch (error) {
		console.error('Failed to create the conversation:', error)
		throw error
	}
}

/**
 * Obtains all the conversations of the logged user, with the last 20 messages of each conversation.
 * @returns An array with all the conversations of the logged user.
 */
export async function getConversations() {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) return null

	// Find all conversations of the logged user, and the last 20 messages of each conversation
	return prisma.conversation.findMany({
		where: {
			OR: [
				{ userAId: loggedUser.id },
				{ userBId: loggedUser.id }
			]
		},
		include: {
			messages: {
				take: 20,
				orderBy: { createdAt: 'desc' }
			},
			userA: { select: { id: true, username: true, name: true, avatar: true } },
			userB: { select: { id: true, username: true, name: true, avatar: true } }
		},
		orderBy: { lastMessageAt: 'desc' }
	})
}

/** 
 * Sends a message in an existing conversation.
 * @param conversationId The id of the conversation where the message will be sent.
 * @param message The content of the message to send.
 * @returns The conversation with the new message included.
 */
export async function sendMessage({ conversationId, messageContent }: { conversationId: string, messageContent: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) throw new Error('User not logged in')

	// Create the message and update the lastMessageAt field of the conversation
	try {
		const result = await prisma.conversation.update({
			where: { id: conversationId },
			data: {
				lastMessageAt: new Date(),
				messages: {
					create: {
						content: messageContent,
						authorId: loggedUser.id
					}
				}
			},
			include: {
				messages: {
					take: 20,
					orderBy: { createdAt: 'desc' }
				},
				userA: { select: { id: true, username: true, name: true, avatar: true } },
				userB: { select: { id: true, username: true, name: true, avatar: true } }
			}
		})

		// - Pusher Logic -
		const author = result.userAId === loggedUser.id ? result.userA : result.userB
		const targetId = result.userAId === loggedUser.id ? result.userBId : result.userAId
		await sendMessageToPusher({ message: result.messages[0], author, targetId })
		// - End of Pusher Logic -
		return result
	} catch (error) {
		console.error('Failed to send the message:', error)
		throw error
	}
}
