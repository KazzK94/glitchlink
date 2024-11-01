import { Container } from '@/components/common/Container'

export default async function ConversationPage({ params }: { params: { username: string } }) {
	
	// const conversation = await getConversationByTargetUsername({ username: params.username })

	return (
		<Container asSection className='h-full'>
			<h1 className='text-3xl'>
				Conversation with <span className='font-semibold text-blue-300'>@{params.username}</span>
			</h1>
		</Container>
	)
}
