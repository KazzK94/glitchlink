
import { Container } from '@/components/common/Container'
import { ConversationsList } from '@/components/conversations/ConversationsList'
import { getUserFromSession } from '@/services/auth'

export default async function MessagesLayout({ children, className }: { children: React.ReactNode, className?: string }) {

	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null


	return (
		<div className='h-full w-full bg-black/40'>
			<Container className='!px-0'>
				<div className={`flex h-full bg-gray-900 text-white relative overflow-x-hidden ${className}`}>
					{/* Conversation List */}
					<ConversationsList
						loggedUser={loggedUser}
					/>
					<div className='flex-1 h-full'>
						{children}
					</div>
				</div>
			</Container>
		</div>
	)
}