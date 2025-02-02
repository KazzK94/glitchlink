'use client'

import { useEffect, useRef, useState } from "react"
import { SendIcon, LucideMessagesSquare as MenuIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from '@/components/users/Avatar'
import { Message } from './Message'
import { Conversation as ConversationType, Message as MessageType } from '@prisma/client'
import { UserPublicInfo } from '@/types'

interface ConversationWithUsersAndMessages extends ConversationType {
	messages: MessageType[]
	userA: UserPublicInfo,
	userB: UserPublicInfo
}

const CONVERSATION_NO_ID = 'NO_ID'

export function MessagesContainer({ conversations, loggedUser, targetUser, className }: { conversations: ConversationWithUsersAndMessages[], loggedUser: UserPublicInfo, targetUser: UserPublicInfo, className?: string }) {

	// TODO: Adjust this to fit the real data syntax in db
	let conversationIndex = conversations.findIndex((conversation) => {
		return (
			conversation.userA.username === targetUser.username ||
			conversation.userB.username === targetUser.username
		)
	})

	if (conversationIndex === -1) {
		conversations.unshift({
			id: CONVERSATION_NO_ID,
			userA: loggedUser,
			userAId: loggedUser.id,
			userB: {
				username: targetUser.username,
				name: targetUser.name,
				avatar: targetUser.avatar,
				id: targetUser.id
			},
			userBId: targetUser.id,
			createdAt: new Date(),
			lastMessageAt: new Date(),
			messages: []
		})
		conversationIndex = 0
	}

	const [selectedConversation, setSelectedConversation] = useState(conversations[conversationIndex])
	const [messageInput, setMessageInput] = useState("")
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const messageEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		if (messageInput.trim() !== "") {
			// Add the new message to the list
			const newMsg: MessageType = {
				id: '#a1b2' + Math.random().toString() + 'c3d4' + (new Date().getTime().toString()) + 'e5',
				authorId: loggedUser.id,
				content: messageInput,
				conversationId: selectedConversation.id,
				updatedAt: new Date(),
				createdAt: new Date()
			}
			setSelectedConversation({
				...selectedConversation,
				messages: [...selectedConversation.messages, newMsg]
			})
			setMessageInput("")
		}
	}

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	useEffect(() => {
		scrollToBottom()
	}, [selectedConversation])

	return (
		<div className={`flex h-full bg-gray-900 text-white ${className}`}>
			{/* Conversation List */}
			<div
				className={`w-full md:w-1/3 border-r border-gray-700 bg-gray-800/80 backdrop-blur-md h-[calc(100vh_-_64px)] absolute md:relative z-10 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"
					}`}
			>
				<ScrollArea className='h-full'>
					{conversations.map((conversation) => {
						const lastMessage = conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].content : 'No messages yet.'
						return (
							<div
								key={conversation.id}
								className={`flex items-center p-4 cursor-pointer ${selectedConversation.id === conversation.id ? "bg-gray-700" : "hover:bg-gray-700/40"
									}`}
								onClick={() => { setSelectedConversation(conversation); setIsMobileMenuOpen(false) }}
							>
								<Avatar src={targetUser.avatar} className='size-12 flex-grow-0 flex-shrink-0' />
								<div className="ml-4">
									<div className="font-semibold">{targetUser.name}</div>
									<div className="text-xs text-gray-400">
										{(lastMessage.length < 40) ? lastMessage : lastMessage.slice(0, 40).trim() + '...'}
									</div>
								</div>
							</div>
						)
					})}
				</ScrollArea>
			</div>

			{/* Conversation View */}
			<div className="flex-1 flex flex-col">
				{/* Conversation Header */}
				<div className="p-4 flex items-center justify-between border-b border-gray-700">
					<div className='flex items-center gap-4'>
						<Avatar src={targetUser.avatar} className='size-12' />
						<div className="flex flex-col">
							<h2 className="text-xl md:text-xl font-semibold">{targetUser.name}</h2>
							<p className='text-sm italic opacity-80'>@{targetUser.username}</p>
						</div>
					</div>
					<button className='md:hidden border bg-slate-700/30 rounded p-2' onClick={toggleMobileMenu}>
						<MenuIcon className='size-6' />
					</button>
				</div>

				{/* Messages */}
				<ScrollArea className="flex-1 px-4 bg-gray-800/40">
					{selectedConversation.messages.map((message) => (
						<Message key={message.id} message={message} loggedUser={loggedUser} />
					))}
					<div ref={messageEndRef} />
				</ScrollArea>

				{/* Message Input */}
				<form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
					<div className="flex">
						<Input
							type="text"
							placeholder="Type a message..."
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
							className="flex-1 bg-gray-800 text-white border-gray-600 placeholder:text-white/60"
						/>
						<Button type="submit" className="ml-2 border border-gray-400/80">
							<SendIcon className="size-5" />
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
