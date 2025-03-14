
import { ConversationContainer } from '@/components/conversations/ConversationContainer'
import { InitConversations } from '@/components/conversations/InitConversations'
import { getUserFromSession } from '@/services/auth'

export default async function ConversationsPage() {

	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	return (
		<div className='flex h-[calc(100svh_-_64px)]  bg-gray-900 text-white relative overflow-x-hidden'>
			<InitConversations
				loggedUser={loggedUser}
			/>
			<ConversationContainer
				loggedUser={loggedUser}
			/>
		</div>
	)
}
