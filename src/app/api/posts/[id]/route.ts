
import { NextRequest } from 'next/server'
import { deletePost } from '@/services/posts'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const postId = params.id
	// The deletePost() function already checks if the user is the author of the post or an admin
	const result = await deletePost(postId)
	return Response.json({ message: 'Post deleted', result })
}
