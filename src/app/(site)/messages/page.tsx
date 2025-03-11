
import { ConversationContainer } from '@/components/conversations/ConversationContainer'
import { getUserFromSession } from '@/services/auth'

export default async function ConversationsPage() {

	const loggedUser = await getUserFromSession()
	if (!loggedUser) return null

	return (
		<div className='flex h-[calc(100vh_-_64px)]  bg-gray-900 text-white relative overflow-x-hidden'>
			<ConversationContainer
				loggedUser={loggedUser}
			/>
		</div>
	)
}
