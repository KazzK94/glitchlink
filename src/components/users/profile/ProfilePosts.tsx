
import { Post } from '../../posts/Post'
import { CompletePost } from '@/types'

export async function ProfilePosts({ posts, loggedUserId }: { posts: CompletePost[], loggedUserId: string }) {
	return (
		<div className='px-3 py-1'>
			{posts.length === 0 && <p>No posts created yet...</p>}

			<div className="mt-2 flex flex-col gap-5 max-w-3xl mx-auto">
				{posts.map((post) => (
					<Post key={post.id} post={post} loggedUserId={loggedUserId} />
				))}
			</div>
		</div>
	)
}
