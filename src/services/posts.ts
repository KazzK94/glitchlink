'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './utils'
import { createNotification } from './notifications'


export async function createPost({ content }: { content: string }) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		return await prisma.post.create({
			data: {
				content,
				authorId: user.id
			}
		})
	} catch (error) {
		console.error('Failed to create the post:', error)
		throw error
	}
}

export async function addCommentToPost({ post, content }: { post: { id: string, author: { id: string } }, content: string }) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		const createdComment = await prisma.comment.create({
			data: {
				content,
				authorId: user.id,
				postId: post.id
			}
		})

		await createNotification({
			type: 'CommentedPost',
			userId: post.author.id,
			message: `@${user.username} commented on your post`,
			targetUrl: `/posts/${post.id}`
		})

		return createdComment

	} catch (error) {
		console.error('Failed to create the comment:', error)
		throw error
	}
}

export async function getOwnedPosts(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if (!user) return { posts: [] }
		userId = user.id
	}

	// Find user and get its posts
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			posts: {
				include: {
					author: true,
					likes: true,
					comments: { include: { author: true }, orderBy: { createdAt: 'desc' } }
				},
				orderBy: { createdAt: 'desc' } // Newest first
			}
		}
	})
}

export async function getPosts() {
	return await prisma.post.findMany({
		include: {
			author: true,
			likes: true,
			comments: {
				include: { author: true },
				orderBy: { createdAt: 'desc' }
			}
		},
		orderBy: { createdAt: 'desc' } // Newest first
	})
}

export async function getPostById(id: string) {
	return await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
			likes: true,
			comments: {
				include: { author: true },
				orderBy: { createdAt: 'desc' }
			}
		},
	})
}

export async function getPostsByUser(userId: string) {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			posts: {
				include: {
					author: true,
					likes: true,
					comments: { include: { author: true }, orderBy: { createdAt: 'desc' } }
				},
				orderBy: { createdAt: 'desc' } // Newest first
			}
		},
	})
}

export async function deletePost(id: string) {
	return await prisma.post.delete({
		where: { id }
	})
}