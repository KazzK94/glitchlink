
import { getPosts, getPostsContainingHashtag } from '@/services/api/posts'
import { Post } from './Post'

export async function PostsList({ loggedUserId, hashtag }: { loggedUserId: string, hashtag?: string }) {

	// If url contains a 'hashtag' query param, filter posts by hashtag (e.g. /posts?hashtag=javascript -> search #javascript)
	const posts = await (hashtag ?  getPostsContainingHashtag(hashtag) : getPosts())

	return (
		<div className="space-y-6 lg:space-y-5 pb-10">
			{posts.map((post) => (
				<Post key={post.id} post={post} loggedUserId={loggedUserId} />
			))}
		</div>
	)
}
