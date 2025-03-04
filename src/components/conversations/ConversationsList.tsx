import { ScrollArea } from '@/components/ui/scroll-area'
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import Link from 'next/link'
import { Avatar } from '@/components/users/Avatar'

interface ConversationsListProps {
	conversations: ConversationWithUsersAndMessages[]
	selectedConversationIndex: number
	onConversationSelected: (index: number) => void
	loggedUser: UserPublicInfo
}

export function ConversationsList({ conversations, selectedConversationIndex, loggedUser, onConversationSelected }: ConversationsListProps) {
	return <ScrollArea className='h-full'>
		{conversations.map((conversation, index) => {
			const lastMessage = conversation.messages.length > 0 ? conversation.messages[0].content : 'No messages yet.'
			const otherUser = conversation.userA.id === loggedUser.id ? conversation.userB : conversation.userA
			return (
				<Link
					key={conversation.id}
					className={`flex items-center p-4 cursor-pointer ${selectedConversationIndex !== -1 && conversations[selectedConversationIndex].id === conversation.id ? "bg-gray-700" : "hover:bg-gray-700/40"}`}
					href={`/messages/${otherUser.username}`}
					onClick={() => { onConversationSelected(index) }}
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
}