
import { sendMessage } from '@/services/api/conversations'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { conversationId: string } }) {
	const { conversationId } = params
	const body = await request.json()
	const { message } = body
	await sendMessage({ conversationId, messageContent: message })
	return Response.json({ conversationId, body })
}
