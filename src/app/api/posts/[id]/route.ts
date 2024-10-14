
import { NextRequest } from 'next/server'
import { deletePost } from '@/services/posts'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const postId = params.id
	const result = await deletePost(postId)
	return Response.json({ message: 'Post deleted', result })
}
