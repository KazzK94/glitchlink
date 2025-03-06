
import { Message } from '@prisma/client'
import { pusherServer } from '@/lib/pusher'
import { UserPublicInfo } from '@/types'

interface SendMessageToPusherProps {
	message: Message
	author: UserPublicInfo
	targetId: string
}

export async function sendMessageToPusher({ message, author, targetId }: SendMessageToPusherProps) {
	'use server'
	try {
		const result = await pusherServer.trigger(
			[`user-${author.id}`, `user-${targetId}`],
			"new-message",
			{ message }
		)
		return {
			success: (result.status === 200)
		}
	} catch (error) {
		console.error('Failed to send the message to Pusher:', error)
		throw error
	}
}

