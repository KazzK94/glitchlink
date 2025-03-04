'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from '../auth'
import { createNotification } from './notifications'
import { extractMentions } from '../postsUtils'

const ADMIN_ID = process.env.ADMIN_ID

export async function createPost({ content }: { content: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	const usernamesMentioned = extractMentions(content)

	try {
		const newPost = await prisma.post.create({
			data: {
				content,
				authorId: user.id
			}
		})
		if (usernamesMentioned.length > 0) {
			const usersMentioned = await prisma.user.findMany({
				where: { username: { in: usernamesMentioned } }
			})
			await Promise.all(usersMentioned.map(async (mentionedUser) => {
				if (mentionedUser.id !== user.id) {
					await createNotification({
						generatedById: user.id,
						targetUserId: mentionedUser.id,
						entityType: 'POST',
						entityId: newPost.id,
						actionType: 'MENTION_IN_POST'
					})
				}
			}))
		}
		return newPost
	} catch (error) {
		console.error('Failed to create the post:', error)
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
					comments: { include: { author: true }, orderBy: { createdAt: 'asc' } }
				},
				orderBy: { createdAt: 'desc' } // Newest first
			}
		}
	})

	return userWithPosts?.posts || []
}

export async function getPosts(options?: { page: number, postsPerPage: number }) {
	return await prisma.post.findMany({
		include: {
			author: true,
			likedBy: true,
			comments: { include: { author: true }, orderBy: { createdAt: 'asc' } }
		},
		orderBy: { createdAt: 'desc' }, // Newest first
		skip: options && ((options.page - 1) * options.postsPerPage),
		take: options?.postsPerPage
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
				orderBy: { createdAt: 'asc' }
			}
		}
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
					comments: { include: { author: true }, orderBy: { createdAt: 'asc' } }
				},
				orderBy: { createdAt: 'desc' } // Newest first
			}
		}
	})
}

export async function getPostsContainingHashtag(hashtag: string) {
	if (hashtag[0] !== '#') hashtag = '#' + hashtag

	const posts = await prisma.post.findMany({
		where: {
			content: {
				contains: hashtag,
				mode: 'insensitive'
			}
		},
		include: {
			author: true,
			likedBy: true,
			comments: {
				include: { author: true },
				orderBy: { createdAt: 'asc' }
			}
		}
	})

	return posts
}

export async function updatePost({ id, content }: { id: string, content: string }) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	const post = await prisma.post.findUnique({
		where: {
			id,
			authorId: (loggedUser.id !== ADMIN_ID) ? loggedUser.id : undefined
		}
	})

	if (!post) return null

	return await prisma.post.update({
		where: { id },
		data: { content }
	})
}

export async function deletePost(id: string) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	const post = await prisma.post.findUnique({
		where: {
			id,
			authorId: (loggedUser.id !== ADMIN_ID) ? loggedUser.id : undefined
		}
	})

	if (!post) return null

	return await prisma.post.delete({
		where: { id }
	})
}
