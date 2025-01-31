
import { MessagesContainer } from '@/components/messages/MessagesContainer'

export default function ConversationPage({ params }: { params: { username: string } }) {

	const { username } = params

	return (
		<MessagesContainer username={username} />
	)
}
