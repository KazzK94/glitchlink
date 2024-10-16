
import { PostsList } from '@/components/posts/PostsList'
import { getUserFromSession } from '@/services/auth'
import { Container } from '@/components/common/Container'

export default async function PostsPage() {

	const user = await getUserFromSession()

	return (
		<Container asSection className='mt-4 max-w-[860px]'>
			<PostsList loggedUserId={user?.id || ''} />
		</Container>
	)
}