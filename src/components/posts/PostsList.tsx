
import { getPosts } from '@/services/posts'
import { Post } from './Post'

export async function PostsList({ loggedUserId }: { loggedUserId: string }) {

	const posts = await getPosts()

	return (
		<div className="space-y-5">
			{posts.map((post) => (
				<Post key={post.id} post={post} loggedUserId={loggedUserId} />
			))}
		</div>
	)
}
