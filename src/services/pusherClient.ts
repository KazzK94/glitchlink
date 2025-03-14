'use client'

import { Message } from '@prisma/client'
import { pusherClient } from '@/lib/pusher'
import { Channel } from 'pusher-js'


export function getUserChannel(loggedUserId: string) {
	const channel = pusherClient.subscribe(`user-${loggedUserId}`)
	return channel
}

export function subscribeToMessagesPusherChannel({ channel, onNewMessage }:
	{ channel: Channel, loggedUserId: string, onNewMessage: (message: Message) => void }) {
	channel.unbind('new-message')
	channel.bind('new-message', ({ message }: { message: Message }) => {
		onNewMessage(message)
	})
}
