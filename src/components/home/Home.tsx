
import { redirect } from 'next/navigation'
import { getPopularVideoGames } from '@/services/videoGames'
import { getActiveUsers } from '@/services/users'

import { Gamepad2Icon } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { PostsList } from '@/components/posts/PostsList'
import { PostCreateForm } from '@/components/posts/PostCreateForm'

import { getUserFromSession } from '@/services/auth'
import { Suspense } from 'react'
import { PostsListFallback } from '../posts/PostsListFallback'
import { UsersList } from '../users/UsersList'

export async function Home() {

	const user = await getUserFromSession()
	if (!user) {
		redirect('/login')
	}

	return (
		<Container className="my-4 lg:my-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6 max-w-[760px] lg:max-w-full mx-auto w-full">
					<PostCreateForm />
					<Suspense fallback={<PostsListFallback />}>
						<PostsList loggedUserId={user.id} />
					</Suspense>
				</div>
				<div className='hidden lg:block space-y-4'>
					<TrendingGames />
					<SuggestedFriends />
				</div>
			</div>
		</Container>
	)
}


async function TrendingGames() {
	const popularGames = await getPopularVideoGames(3)

	return (
		<div className="bg-gray-800 p-6 pt-5 rounded-lg shadow shadow-gray-400">
			<h2 className="text-2xl font-semibold mb-4">Trending Games</h2>
			<ul className="space-y-3">
				{popularGames.map((game) => (
					<li key={game.id} className="relative h-20 rounded border overflow-hidden cursor-pointer hover:saturate-150 transition-all duration-300">
						<img className='w-full h-full object-cover' src={game.image.replace('media/', 'media/crop/600/400/')} alt={game.title} />
						<div className='absolute inset-0 flex justify-center items-end pb-2 bg-gradient-to-t from-black to-transparent'>
							<p className='font-bold text-xl !select-none cursor-pointer'>
								<Gamepad2Icon className="h-5 w-5 mr-2 inline-block" />
								{game.title}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

async function SuggestedFriends() {

	const suggestedFriends = await getActiveUsers(3)

	return (
		<div className="bg-gray-800 p-4 pb-5 rounded-lg shadow shadow-gray-400">
			<h2 className="text-2xl font-semibold pl-2 mb-3">Suggested Friends</h2>
			<UsersList users={suggestedFriends} className="space-y-2" cardClassName='hover:bg-gray-700/15' />
		</div>
	)
}
