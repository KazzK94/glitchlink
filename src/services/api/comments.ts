'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from '../auth'
import { createNotification } from './notifications'
import { extractMentions } from '../postsUtils'

const ADMIN_ID = process.env.ADMIN_ID

// COMMENTS
export async function addCommentToPost({ post, content }: { post: { id: string, author: { id: string } }, content: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	const usernamesMentioned = extractMentions(content)

	try {
		const createdComment = await prisma.comment.create({
			data: {
				content,
				authorId: user.id,
				postId: post.id
			}
		})
		if (user.id !== post.author.id) {
			await createNotification({
				generatedById: user.id,
				targetUserId: post.author.id,
				entityType: 'POST',
				entityId: post.id,
				actionType: 'REPLY_TO_POST'
			})
		}

		if (usernamesMentioned.length > 0) {
			const usersMentioned = await prisma.user.findMany({
				where: { username: { in: usernamesMentioned } }
			})
			await Promise.all(usersMentioned.map(async (mentionedUser) => {
				if (mentionedUser.id !== user.id) {
					await createNotification({
						generatedById: user.id,
						targetUserId: mentionedUser.id,
						entityType: 'COMMENT',
						entityId: createdComment.id,
						actionType: 'MENTION_IN_COMMENT'
					})
				}
			}))
		}

		return createdComment

	} catch (error) {
		console.error('Failed to create the comment:', error)
		throw error
	}
}

export async function getCommentById(id: string) {
	return await prisma.comment.findUnique({
		where: { id },
		include: { author: true }
	})
}


export async function updateComment({ id, content }: { id: string, content: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	const comment = await prisma.comment.findUnique({
		where: {
			id,
			authorId: (loggedUser.id !== ADMIN_ID) ? loggedUser.id : undefined
		}
	})

	if (!comment) return null

	return await prisma.comment.update({
		where: { id },
		data: { content }
	})
}

export async function deleteComment({ postId, commentId }: { postId: string, commentId: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId,
			postId,
			authorId: (loggedUser.id !== ADMIN_ID) ? loggedUser.id : undefined
		}
	})

	if (!comment) return null

	return await prisma.comment.delete({
		where: { id: commentId }
	})
}
