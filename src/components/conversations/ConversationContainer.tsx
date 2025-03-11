'use client'

// Hooks
import { useConversations } from '@/hooks/useConversations'

// Types
import { UserPublicInfo } from '@/types'
import { Conversation } from './Conversation'

interface ConversationContainerProps {
	loggedUser: UserPublicInfo,
	targetUser?: UserPublicInfo,
	className?: string
}

export function ConversationContainer({ loggedUser, targetUser: targetUserBase }: ConversationContainerProps) {

	const {
		targetUser,
		handleSendMessage
	} = useConversations({ conversations: [], loggedUser, targetUser: targetUserBase })

	return (
		<>
			{
				targetUser
					? (
						<Conversation
							targetUser={targetUser}
							loggedUser={loggedUser}
							handleSendMessage={handleSendMessage}
						/>
					) : (
						<p className='grid content-center text-lg w-full text-center px-6'>
							No conversations started, please start one from the profile of a friend.
						</p>
					)
			}
		</>
	)
}
