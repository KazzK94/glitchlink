
import { Message } from '@prisma/client'
import { pusherServer } from '@/lib/pusher'

interface SendMessageToPusherProps {
	conversationId: string
	message: Message
	senderId: string
	targetId: string
}

export async function sendMessageToPusher({ conversationId, message, senderId, targetId }: SendMessageToPusherProps) {
	try {
		const result = await pusherServer.trigger(
			[`user-${senderId}`, `user-${targetId}`],
			"new-message",
			{ message, conversationId }
		)
		return {
			success: (result.status === 200)
		}
	} catch (error) {
		console.error('Failed to send the message to Pusher:', error)
		throw error
	}
}