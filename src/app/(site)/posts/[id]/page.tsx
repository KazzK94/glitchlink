
import { Container } from '@/components/common/Container'
import { Post } from '@/components/posts/Post'
import { getPostById } from '@/services/api/posts'
import { getUserFromSession } from '@/services/auth'

export default async function PostDetailPage({ params }: { params: { id: string } }) {

	const postId = params.id
	const post = await getPostById(postId)
	if (!post) return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: Post not found</Container>

	const user = await getUserFromSession()

	return (
		<Container asSection className='mt-4 max-w-[860px]'>
			<Post post={post} loggedUserId={user?.id || ''} />
		</Container>
	)
}