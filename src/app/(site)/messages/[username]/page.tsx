
import { ConversationsContainer } from '@/components/conversations/ConversationsContainer'
import { getUserFromSession } from '@/services/auth'
import { getConversations } from '@/services/api/conversations'
import { getUser } from '@/services/api/users'

export default async function ConversationPage({ params }: { params: { username: string } }) {

	const { username } = params

	const [conversations, loggedUser, targetUser] = await Promise.all([
		getConversations(),
		getUserFromSession(),
		getUser({ username })
	])

	if (!loggedUser || !conversations || !targetUser) {
		return <div className='w-fit mx-auto text-red-300 bg-gray-800/60 rounded-lg p-12 mt-12 text-center text-lg'>
			<p className='text-2xl mb-1'>Error: Unable to open conversation</p>
			<p>Could not find or create a conversation with the user <span className='font-semibold'>@{username}</span>.</p>
			<p>Make sure that the user exists and that you are correctly logged in.</p>
		</div>
	}

	return (
		<ConversationsContainer targetUser={targetUser} loggedUser={loggedUser} conversations={conversations} />
	)
}
