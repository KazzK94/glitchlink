'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'
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
		if (user.id !== post.author.id) {
			await createNotification({
				type: 'CommentedPost',
				userId: post.author.id,
				message: `@${user.username} commented on your post`,
				targetUrl: `/posts/${post.id}`
			})
		}

		return createdComment

	} catch (error) {
		console.error('Failed to create the comment:', error)
		throw error
	}
}

export async function addLikeToPost(post: { id: string, authorId: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	try {
		await prisma.post.update({
			where: { id: post.id },
			data: {
				likedBy: {
					connect: { id: user.id }
				}
			}
		})

		if (user.id !== post.authorId) {
			await createNotification({
				type: 'LikedPost',
				userId: post.authorId,
				message: `@${user.username} liked your post`,
				targetUrl: `/posts/${post.id}`
			})
		}

		return true
	} catch (error) {
		console.error('Failed to like the post:', error)
		throw error
	}
}

export async function removeLikeFromPost(post: { id: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	try {
		await prisma.post.update({
			where: { id: post.id },
			data: {
				likedBy: {
					disconnect: { id: user.id }
				}
			}
		})
		return true
	} catch (error) {
		console.error('Failed to remove the like:', error)
		throw error
	}
}

export async function getOwnedPosts(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if (!user) return []
		userId = user.id
	}

	// Find user and get its posts
	const userWithPosts = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			posts: {
				include: {
					author: true,
					likedBy: true,
					comments: { include: { author: true }, orderBy: { createdAt: 'desc' } }
				},
				orderBy: { createdAt: 'desc' } // Newest first
			}
		}
	})

	return userWithPosts?.posts || []
}

export async function getPosts() {
	return await prisma.post.findMany({
		include: {
			author: true,
			likedBy: true,
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
			likedBy: true,
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
					likedBy: true,
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