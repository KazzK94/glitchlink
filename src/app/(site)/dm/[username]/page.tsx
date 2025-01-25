import { Container } from '@/components/common/Container'

export default async function ConversationPage({ params }: { params: { username: string } }) {

	// const conversation = await getConversationByTargetUsername({ username: params.username })

	return (
		<Container asSection className='h-full'>
			<h1 className='text-2xl pt-4'>
				A conversation with <span className='font-semibold text-blue-300'>@{params.username}</span> would go here
			</h1>
		</Container>
	)
}
