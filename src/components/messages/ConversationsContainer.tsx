'use client'

// Hooks
import { useEffect, useRef, useState } from "react"
import { useMessages } from '@/hooks/useMessages'

// Icons
import { SendIcon, LucideMessagesSquare as MenuIcon } from "lucide-react"

// Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from '@/components/users/Avatar'
import { Message } from './Message'

// Types
import { Conversation as ConversationType, Message as MessageType } from '@prisma/client'
import { UserPublicInfo } from '@/types'
import Link from 'next/link'

interface ConversationWithUsersAndMessages extends ConversationType {
	messages: MessageType[]
	userA: UserPublicInfo,
	userB: UserPublicInfo
}

interface ConversationsContainerProps {
	conversations: ConversationWithUsersAndMessages[],
	loggedUser: UserPublicInfo,
	targetUser?: UserPublicInfo,
	className?: string
}

export function ConversationsContainer({ conversations: conversationsBase, loggedUser, targetUser: targetUserBase, className }: ConversationsContainerProps) {

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const {
		conversations,
		conversationIndex,
		targetUser,

		messageInput,
		handleChangeMessageInput,
		handleSendMessage
	} = useMessages({ conversations: conversationsBase, loggedUser, targetUser: targetUserBase })

	const messageEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const handleToggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	useEffect(() => {
		scrollToBottom()
	}, [conversations])

	return (
		<div className={`flex h-full bg-gray-900 text-white ${className}`}>
			{/* Conversation List */}
			<div
				className={`w-full md:w-1/3 border-r border-gray-700 bg-gray-800/80 backdrop-blur-md h-[calc(100vh_-_64px)] absolute md:relative z-10 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"
					}`}
			>
				<ScrollArea className='h-full'>
					{conversations.map((conversation) => {
						const lastMessage = conversation.messages.length > 0 ? conversation.messages[0].content : 'No messages yet.'
						const otherUser = conversation.userA.id === loggedUser.id ? conversation.userB : conversation.userA
						return (
							<Link
								key={conversation.id}
								className={`flex items-center p-4 cursor-pointer ${conversationIndex !== -1 && conversations[conversationIndex].id === conversation.id ? "bg-gray-700" : "hover:bg-gray-700/40"}`}
								href={`/messages/${otherUser.username}`}
								onClick={() => { setIsMobileMenuOpen(false) }}
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

			{
				targetUser
					? (
						<>
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
										{conversationIndex !== -1 && conversations[conversationIndex].messages.map((message) => (
											<Message key={message.id} className='last:mt-6' message={message} loggedUser={loggedUser} />
										))}
									</div>
									<div ref={messageEndRef} />
								</ScrollArea>

								{/* Message Input */}
								<form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
									<div className="flex">
										<Input
											type="text"
											placeholder="Type a message..."
											value={messageInput}
											onChange={handleChangeMessageInput}
											className="flex-1 text-lg md:text-sm py-5 md:py-4 bg-gray-800 text-white border-gray-600 placeholder:text-white/60"
										/>
										<Button type="submit" className="ml-2 h-full border border-gray-400/80">
											<SendIcon className="size-5 md:size-4" />
										</Button>
									</div>
								</form>
							</div>
						</>
					) : (
						<p className='grid justify-center items-center w-full text-center mt-4'>No conversations started, start one from the profile of a friend</p>
					)
			}
		</div>
	)
}
