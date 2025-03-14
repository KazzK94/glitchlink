
import { getConversationById } from '@/services/api/conversations'
import { NextRequest } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { conversationId: string } }) {
	const { conversationId } = params
	const conversation = await getConversationById(conversationId)
	return Response.json({ conversation })
}
