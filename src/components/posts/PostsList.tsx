
import { getPosts } from '@/services/posts'
import { Post } from './Post'

export async function PostsList({ loggedUserId }: { loggedUserId: string }) {

	// TODO: If url contains a 'hashtag' query param, filter posts by hashtag (e.g. /posts?hashtag=javascript -> search #javascript)
	const posts = await getPosts()

	return (
		<div className="space-y-6 lg:space-y-5 pb-10">
			{posts.map((post) => (
				<Post key={post.id} post={post} loggedUserId={loggedUserId} />
			))}
		</div>
	)
}
