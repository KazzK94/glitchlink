'use server'

import prisma from '@/lib/db'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'
import { getUserFromSession } from './utils'

export async function createPost({ content }: { content: string }) {
	const user = await getUserFromSession()
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

export async function addCommentToPost({ postId, content }: { postId: string, content: string }) {
	const user = await getUserFromSession()
	try {
		return await prisma.comment.create({
			data: {
				content,
				authorId: user.id,
				postId
			}
		})
	} catch (error) {
		console.error('Failed to create the comment:', error)
		throw error
	}
}

export async function getOwnedPosts(userId: string = '') {
	if (!userId) {
		// Get the session
		const session = await getServerSession(authOptions)
		if (!session) {
			throw new Error('You must be signed in to create a post')
		}
		const { user } = session
		userId = user.id
	}

	// Find user and get its posts
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			posts: {
				include: { author: true },
				orderBy: { createdAt: 'desc' } // Newest first
			}
		}
	})
}

export async function getPosts() {
	return await prisma.post.findMany({
		include: {
			author: true,
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
		where: { id }
	})
}

export async function getPostsByUser(userId: string) {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: { posts: true }
	})
}

export async function deletePost(id: string) {
	return await prisma.post.delete({
		where: { id }
	})
}