
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
		return <div className='text-red-500 text-center mt-12 text-xl'><p className='text-2xl mb-1'>ERROR FOUND</p><p>Could not find or create a conversation with the user @{username}.</p><p>Make sure that the user exists and that you are correctly logged in.</p></div>
	}

	return (
		<ConversationsContainer targetUser={targetUser} loggedUser={loggedUser} conversations={conversations} />
	)
}
