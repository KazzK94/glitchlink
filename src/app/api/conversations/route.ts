
import { createConversation, getConversations } from '@/services/api/conversations'
import { getUserFromSession } from '@/services/auth'
import { NextRequest } from 'next/server'

export async function GET() {
	const posts = await getConversations()
	return Response.json(posts)
}

export async function POST(request: NextRequest) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser) return Response.json('You must be logged in to create a conversation.', { status: 401 })

	const body = await request.json()
	const { targetUserId, message } = body

	const conversation = await createConversation({
		targetUserId,
		message
	})
	return Response.json(conversation)
}