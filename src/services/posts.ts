'use server'

import prisma from '@/lib/db'

export async function createPost({ content, authorId }: { content: string, authorId: string }) {
	try {
		return await prisma.post.create({
			data: {
				content,
				authorId
			}
		})
	} catch (error) {
		console.error('Failed to create the post:', error)
		throw error
	}
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