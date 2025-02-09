
import { ConversationsContainer } from '@/components/messages/ConversationsContainer'
import { getUserFromSession } from '@/services/auth'
import { getConversations } from '@/services/conversations'

export default async function ConversationsPage() {

	const [conversations, loggedUser] = await Promise.all([
		getConversations(),
		getUserFromSession()
	])

	if (!loggedUser) return null

	return (
		<ConversationsContainer loggedUser={loggedUser} conversations={conversations || []} />
	)
}
