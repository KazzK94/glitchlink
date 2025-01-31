'use client'

import { useEffect, useRef, useState } from "react"
import { SendIcon, LucideMessagesSquare as MenuIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from '@/components/users/Avatar'
import { Message } from './Message'

export function MessagesContainer({ username, className }: { username: string, className?: string }) {

	const conversations = getMockConversations()

	console.log("username:", username)

	const [selectedConversation, setSelectedConversation] = useState(conversations[0])
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
			const newMsg = {
				id: selectedConversation.messages.length + 2,
				sender: "You",
				content: messageInput,
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
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
					{conversations.map((conversation) => (
						<div
							key={conversation.id}
							className={`flex items-center p-4 cursor-pointer ${selectedConversation.id === conversation.id ? "bg-gray-700" : "hover:bg-gray-700/40"
								}`}
							onClick={() => { setSelectedConversation(conversation); setIsMobileMenuOpen(false) }}
						>
							<Avatar src={null} className='size-12 flex-grow-0 flex-shrink-0' />
							<div className="ml-4">
								<div className="font-semibold">{conversation.name}</div>
								<div className="text-xs text-gray-400">
									{(conversation.lastMessage.length < 40) ? conversation.lastMessage : conversation.lastMessage.slice(0, 40).trim() + '...'}
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</div>

			{/* Conversation View */}
			<div className="flex-1 flex flex-col">
				{/* Conversation Header */}
				<div className="p-4 flex items-center justify-between border-b border-gray-700">
					<div className='flex items-center gap-4'>
						<Avatar src={null} className='size-8 md:size-10' />
						<h2 className="text-xl md:text-2xl font-semibold">{selectedConversation.name}</h2>
					</div>
					<button className='md:hidden border bg-slate-700/30 rounded p-2' onClick={toggleMobileMenu}>
						<MenuIcon className='size-6' />
					</button>
				</div>

				{/* Messages */}
				<ScrollArea className="flex-1 px-4 bg-gray-800/40">
					{selectedConversation.messages.map((message) => (
						<Message key={message.id} {...message} />
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
							className="flex-1 bg-gray-700 text-white border-gray-600"
						/>
						<Button type="submit" className="ml-2">
							<SendIcon className="h-4 w-4" />
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}


function getMockConversations() {
	return [
		{
			id: 1,
			name: "Hulkenberg",
			lastMessage: "You: Nah, still doing side quests in FFVII Rebirth lol",
			messages: [
				{ id: 1, sender: "Hulkenberg", content: "Hey, how's it going?", timestamp: "10:30" },
				{ id: 2, sender: "You", content: "Not bad, thanks! How about you?", timestamp: "10:32" },
				{ id: 3, sender: "Hulkenberg", content: "I'm doing well. Just playing some games.", timestamp: "10:35" },
				{ id: 4, sender: "You", content: "Sounds interesting! What kind of games?", timestamp: "10:37" },
				{ id: 5, sender: "Hulkenberg", content: "I'm now playing Elden Ring", timestamp: "10:40" },
				{ id: 6, sender: "Hulkenberg", content: "It's quite hard but not as much as I expected", timestamp: "10:42" },
				{ id: 7, sender: "Hulkenberg", content: "What about you? Anything interesting lately?", timestamp: "10:45" },
				{ id: 8, sender: "You", content: "Nah, still doing side quests in FFVII Rebirth lol", timestamp: "10:57" },
			]
		},
		{
			id: 2,
			name: "Junpei Iori",
			lastMessage: "Oh man, nobody understands my suffering",
			messages: [
				{ id: 1, sender: "Junpei Iori", content: "Dude did you see how gorgeous the mc of Stellar Blade looks?? Man I need that game rn", timestamp: "17:11" },
				{ id: 2, sender: "You", content: "Dude, lower your hormones, you're... you're too much xD", timestamp: "17:32" },
				{ id: 3, sender: "Junpei Iori", content: "I can't help it mate, just... ARE YOU NOT A MAN??", timestamp: "17:34" },
				{ id: 4, sender: "You", content: "...", timestamp: "17:35" },
				{ id: 5, sender: "Junpei Iori", content: "Oh man, nobody understands my suffering", timestamp: "17:35" },
			]
		},
		{
			id: 3,
			name: "Laharl",
			lastMessage: "MUHAHAHAHAHA",
			messages: [
				{ id: 1, sender: "You", content: "Mornin', overlord", timestamp: "10:30" },
				{ id: 2, sender: "Laharl", content: "What's up, vassal?", timestamp: "10:32" },
				{ id: 3, sender: "You", content: "Just finished the paperwork for the day", timestamp: "10:35" },
				{ id: 4, sender: "Laharl", content: "Good job, now go and do something useful", timestamp: "10:37" },
				{ id: 5, sender: "You", content: "Yes, my lord- I will do that right away", timestamp: "10:40" },
				{ id: 6, sender: "Laharl", content: "MUHAHAHAHAHA", timestamp: "10:42" },
			]
		}, {
			id: 4,
			name: "Admin",
			lastMessage: "DISCLAIMER (please read)",
			messages: [
				{ id: 1, sender: "Admin", content: "DISCLAIMER: This section is not implemented yet, all you see is a mockup to show how it looks.", timestamp: "0:00" },
				{ id: 2, sender: "Admin", content: "You can \"send\" a message and you will see it in the conversation, but that's it. If you change conversations or reload the page it will vanish.", timestamp: "0:00" },
				{ id: 3, sender: "Admin", content: "We will implement this soon, so please be patient. And that's why I'm adding this...", timestamp: "0:00" },
				{ id: 4, sender: "Admin", content: "DISCLAIMER (please read)", timestamp: "0:01" },
			]
		},
	]
}
