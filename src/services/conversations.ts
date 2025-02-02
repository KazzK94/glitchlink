'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'
import { } from '@prisma/client'
import { getUser } from './users'

export async function createConversation({ targetUserId, message }: { targetUserId: string, message?: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) return null

	const targetUser = await getUser({ where: { id: targetUserId } })
	if (!targetUser) return null

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
			return await sendMessage({ conversationId: existingConversation.id, message })
		}
		return existingConversation
	}

	try {
		return await prisma.conversation.create({
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
	} catch (error) {
		console.error('Failed to create the conversation:', error)
		throw error
	}
}

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

/** Sends a message in a conversation. Returns the conversation */
export async function sendMessage({ conversationId, message }: { conversationId: string, message: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) return null

	// Create the message and update the lastMessageAt field of the conversation
	try {
		return await prisma.conversation.update({
			where: { id: conversationId },
			data: {
				lastMessageAt: new Date(),
				messages: {
					create: {
						content: message,
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
	} catch (error) {
		console.error('Failed to send the message:', error)
		throw error
	}
}
