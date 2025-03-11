'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { UserPublicInfo } from '@/types'
import Link from 'next/link'
import { Avatar } from '@/components/users/Avatar'
import { useEffect, useState } from 'react'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { useConversationsStore } from '@/stores/conversationsStore'

interface ConversationsListProps {
	selectedConversationIndex?: number
	loggedUser: UserPublicInfo
}

export function ConversationsList({
	selectedConversationIndex: defaultSelectedConversationIndex, loggedUser
}: ConversationsListProps) {

	const conversations = useConversationsStore(state => state.conversations)
	const fetchConversations = useConversationsStore(state => state.fetchConversations)

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(defaultSelectedConversationIndex || -1)

	useEffect(() => {
		fetchConversations()
	}, [fetchConversations])

	function handleConversationClick(index: number) {
		setSelectedConversationIndex(index)
		setIsMobileMenuOpen(false)
	}

	return (
		<div
			className={`w-full md:w-1/3 h-[calc(100vh_-_64px)] border-r border-gray-700 bg-gray-800/80 backdrop-blur-md 
						absolute md:relative z-10 transition-[right] duration-300 ease-in-out 
						${isMobileMenuOpen ? "right-0" : "-right-full md:right-0"}`}
		>
			<button className='absolute md:hidden -left-12 top-4 bg-white/5 rounded-l-sm' onClick={() => setIsMobileMenuOpen(true)}>
				<CaretLeftIcon className='size-12' />
			</button>
			<ScrollArea className='h-full'>
				{conversations.map((conversation, index) => {
					const lastMessage = conversation.messages.length > 0 ? conversation.messages[0].content : 'No messages yet.'
					const otherUser = conversation.userA.id === loggedUser.id ? conversation.userB : conversation.userA
					return (
						<Link
							key={conversation.id}
							className={`flex items-center p-4 cursor-pointer ${selectedConversationIndex !== -1 && conversations[selectedConversationIndex].id === conversation.id ? "bg-gray-700" : "hover:bg-gray-700/40"}`}
							href={`/messages/${otherUser.username}`}
							onClick={() => handleConversationClick(index)}
						>
							<Avatar src={otherUser.avatar} className='size-12 flex-grow-0 flex-shrink-0' />
							<div className="ml-4">
								<div className="font-semibold">{otherUser.name}</div>
								<div className="text-xs text-gray-400">
									{(lastMessage.length < 40) ? lastMessage : lastMessage.slice(0, 40).trim() + '...'}
								</div>
							</div>
						</Link>
					)
				})}
			</ScrollArea>
		</div>
	)
}