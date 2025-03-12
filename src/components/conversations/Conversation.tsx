'use client'

import Link from 'next/link'

import { UserPublicInfo } from '@/types'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from './Message'
import { useEffect, useRef } from 'react'
import { NewMessageForm } from './NewMessageForm'
import { useConversationsStore } from '@/stores/conversationsStore'
import { getAvatarUrl } from '@/services/avatarUtils'

interface ConversationProps {
	targetUser: UserPublicInfo
	loggedUser: UserPublicInfo
}

export function Conversation({
	targetUser, loggedUser
}: ConversationProps) {

	const conversation = useConversationsStore(state => state.selectedConversation)

	// -- Auto-Scroll Logic --
	const messageEndRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	useEffect(() => {
		scrollToBottom()
	}, [conversation])
	// -- End of Auto-Scroll Logic --

	if (!conversation) return null

	return <>
		{/* Conversation View */}
		<div className="flex-1 flex flex-col">
			{/* Conversation Header */}
			<div className="p-4 flex items-center justify-between border-b border-gray-700">
				<Link href={`/u/${targetUser.username}`} className='min-w-32 flex items-center gap-4'>
					<img
						src={getAvatarUrl(targetUser.avatar)}
						alt={`@${targetUser.username}'s Avatar`}
						className='size-12 rounded-full border-2 overflow-hidden aspect-square object-cover' />
					<div className="flex flex-col">
						<h2 className="text-xl md:text-xl font-semibold">{targetUser.name}</h2>
						<p className='text-sm italic opacity-80'>@{targetUser.username}</p>
					</div>
				</Link>
			</div>

			{/* Messages */}
			<ScrollArea className="flex-1 px-4 bg-gray-800/40">
				<div className='flex flex-col-reverse gap-3 pb-3'>
					{conversation.messages.map((message) => (
						<Message key={message.id} className='last:mt-6' message={message} loggedUser={loggedUser} />
					))}
				</div>
				<div ref={messageEndRef} />
			</ScrollArea>

			{/* Message Input */}
			<NewMessageForm />
		</div>
	</>
}