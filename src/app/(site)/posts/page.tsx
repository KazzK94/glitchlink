
import { Suspense } from 'react'
import { getUserFromSession } from '@/services/auth'

import { Container } from '@/components/common/Container'
import { PostsList } from '@/components/posts/PostsList'
import { PostsListFallback } from '@/components/posts/PostsListFallback'

export default async function PostsPage() {

	const user = await getUserFromSession()

	return (
		<Container asSection className='mt-4 max-w-[760px]'>
			<Suspense fallback={<PostsListFallback />}>
				<PostsList loggedUserId={user?.id || ''} />
			</Suspense>
		</Container>
	)
}