'use client'

import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'

import { Avatar } from '@/components/users/Avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from './Message'
import { useEffect, useRef } from 'react'
import { NewMessageForm } from './NewMessageForm'

interface ConversationProps {
	conversation: ConversationWithUsersAndMessages
	targetUser: UserPublicInfo
	handleToggleMobileMenu: () => void

	loggedUser: UserPublicInfo
	handleSendMessage: (message: string) => void
}

export function Conversation({
	conversation, targetUser, handleToggleMobileMenu, loggedUser, handleSendMessage
}: ConversationProps) {

	const messageEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	useEffect(() => {
		scrollToBottom()
	}, [conversation])

	return <>
		{/* Conversation View */}
		<div className="flex-1 flex flex-col">
			{/* Conversation Header */}
			<div className="p-4 flex items-center justify-between border-b border-gray-700">
				<Link href={`/u/${targetUser.username}`} className='min-w-32 flex items-center gap-4'>
					<Avatar src={targetUser.avatar} className='size-12' />
					<div className="flex flex-col">
						<h2 className="text-xl md:text-xl font-semibold">{targetUser.name}</h2>
						<p className='text-sm italic opacity-80'>@{targetUser.username}</p>
					</div>
				</Link>
				<button className='md:hidden border bg-slate-700/30 rounded p-2' onClick={handleToggleMobileMenu}>
					<MenuIcon className='size-6' />
				</button>
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
			<NewMessageForm 
				onSendMessage={handleSendMessage}
			/>
		</div>
	</>
}