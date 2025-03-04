
import { NextRequest } from 'next/server'
import { deleteComment } from '@/services/api/posts'

// Route: /api/posts/[postId]/comments/[commentId]
export async function DELETE(_request: NextRequest, { params }: { params: { postId: string, commentId: string } }) {
	const { postId, commentId } = params
	// The deleteComment() function already checks if the user is the author of the post or an admin
	const result = await deleteComment({ postId, commentId })
	return Response.json({ message: 'Comment deleted successfully', result })
}
