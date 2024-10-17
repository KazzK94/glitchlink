import { getOwnedPosts } from '@/services/posts'
import { User } from 'next-auth'
import { Post } from '../posts/Post'

export async function MyPosts({ user }: { user: User }) {

	const posts = await getOwnedPosts(user.id)

	return (
		<div className='px-3 py-1'>
			{posts.length === 0 && <p>No posts created yet...</p>}

			<div className="mt-1 flex flex-col gap-3">
				{posts.map((post) => (
					<Post key={post.id} post={post} loggedUserId={user.id} />
				))}
			</div>
		</div>
	)
}
