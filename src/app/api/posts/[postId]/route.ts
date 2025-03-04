
import { NextRequest } from 'next/server'
import { deletePost } from '@/services/api/posts'

export async function DELETE(_request: NextRequest, { params }: { params: { postId: string } }) {
	const { postId } = params
	// The deletePost() function already checks if the user is the author of the post or an admin
	const result = await deletePost(postId)
	return Response.json({ message: 'Post deleted', result })
}
