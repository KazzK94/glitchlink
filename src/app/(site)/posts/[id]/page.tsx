
import { Container } from '@/components/Container'
import { Post } from '@/components/posts/Post'
import { getPostById } from '@/services/posts'
import { getUserFromSession } from '@/services/utils'

export default async function ({ params }: { params: { id: string } }) {

	const postId = params.id
	const post = await getPostById(postId)
	if (!post) return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: Post not found</Container>

	const user = await getUserFromSession()

	return (
		<Container asSection className='mt-4 max-w-[860px]'>
			<Post post={post} loggedUserId={user.id || ''} />
		</Container>
	)
}