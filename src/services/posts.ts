'use server'

import prisma from '@/lib/db'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export async function createPost({ content }: { content: string }) {

	// Get the session
	const session = await getServerSession(authOptions)
	if (!session) {
		throw new Error('You must be signed in to create a post')
	}
	const { user } = session

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
		select: { posts: {
			include: { author: true },
			orderBy: { createdAt: 'desc' } // Newest first
		} }
	})
}

export async function getPosts() {
	return await prisma.post.findMany({
		include: { author: true },
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