'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'
import { createNotification } from './notifications'

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


function extractMentions(content: string): string[] {
	const MENTIONS_REGEX = /\B@(\w+)\b/g
	const mentions = []
	let match
	while ((match = MENTIONS_REGEX.exec(content)) !== null) {
		mentions.push(match[1])
	}
	return mentions
}
