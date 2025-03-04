'use client'

// Hooks
import { useState } from "react"
import { useConversations } from '@/hooks/useConversations'

// Types
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { ConversationsList } from './ConversationsList'
import { Conversation } from './Conversation'

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
		handleSendMessage
	} = useConversations({ conversations: conversationsBase, loggedUser, targetUser: targetUserBase })

	const handleToggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	return (
		<div className={`flex h-full bg-gray-900 text-white ${className}`}>
			{/* Conversation List */}
			<div
				className={`w-full md:w-1/3 h-[calc(100vh_-_64px)] border-r border-gray-700 bg-gray-800/80 backdrop-blur-md 
					absolute md:relative z-10 transition-[left] duration-300 ease-in-out ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"}`}
			>
				<ConversationsList
					conversations={conversations}
					selectedConversationIndex={conversationIndex}
					onConversationSelected={() => setIsMobileMenuOpen(false)}
					loggedUser={loggedUser}
				/>

			</div>

			{
				targetUser
					? (
						<Conversation
							targetUser={targetUser}
							handleToggleMobileMenu={handleToggleMobileMenu}
							conversation={conversations[conversationIndex]}
							loggedUser={loggedUser}
							handleSendMessage={handleSendMessage}
						/>
					) : (
						<p className='grid justify-center items-center w-full text-center mt-4'>No conversations started, start one from the profile of a friend</p>
					)
			}
		</div>
	)
}
