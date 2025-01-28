
import { addLikeToPost, getPostById, removeLikeFromPost } from '@/services/posts'
import { getUserFromSession } from '@/services/auth'
import { NextRequest } from 'next/server'

export async function PATCH(_request: NextRequest, { params }: { params: { postId: string } }) {

	const user = await getUserFromSession()

	const {postId} = params
	const post = await getPostById(postId)
	// Check if the post exists
	if (!post) {
		return Response.json({ message: 'Post not found' }, { status: 404 })
	}
	// Check if the user has already liked the post
	const likedBySelf = post.likedBy.some(like => like.id === user?.id)

	// Toggle like
	if (likedBySelf) {
		const result = await removeLikeFromPost({ id: postId })
		return Response.json({ result, liked: false })
	} else {
		const result = await addLikeToPost({ id: postId, authorId: post.author.id })
		return Response.json({ result, liked: true })
	}

}
