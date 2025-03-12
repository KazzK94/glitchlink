'use client'

import { UserPublicInfo } from '@/types'
import { Conversation } from './Conversation'
import { useConversationsStore } from '@/stores/conversationsStore'

interface ConversationContainerProps {
	loggedUser: UserPublicInfo,
	className?: string
}

export function ConversationContainer({ loggedUser }: ConversationContainerProps) {

	const targetUser = useConversationsStore(state => state.targetUser)

	return (
		<>
			{
				targetUser
					? (
						<Conversation
							targetUser={targetUser}
							loggedUser={loggedUser}
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
