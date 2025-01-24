
import { Post } from '../posts/Post'
import { CompletePost } from '@/types'

export async function MyPosts({ posts, loggedUserId }: { posts: CompletePost[], loggedUserId: string }) {
	return (
		<div className='px-3 py-1'>
			{posts.length === 0 && <p>No posts created yet...</p>}

			<div className="mt-1 flex flex-col gap-3">
				{posts.map((post) => (
					<Post key={post.id} post={post} loggedUserId={loggedUserId} />
				))}
			</div>
		</div>
	)
}
