
import { PostsList } from '@/components/posts/PostsList'
import { redirect } from 'next/navigation'
import { getUserFromSession } from '@/services/utils'
import { Container } from '@/components/Container'

export default async function PostsPage() {

	const user = await getUserFromSession()

	return (
		<Container asSection className='mt-4 max-w-[860px]'>
			<PostsList loggedUserId={user.id || ''} />
		</Container>
	)
}