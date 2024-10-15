
import { redirect } from 'next/navigation'
import { getPopularVideoGames } from '@/services/games'
import { getActiveUsers } from '@/services/users'

import { Gamepad2Icon } from 'lucide-react'
import { Container } from '@/components/Container'
import { UserCard } from '@/components/users/UserCard'
import { PostsList } from '@/components/posts/PostsList'
import { PostCreateForm } from '@/components/posts/PostCreateForm'

import { getUserFromSession } from '@/services/utils'

export async function Home() {

	const user = await getUserFromSession()
	if (!user) {
		redirect('/login')
	}

	return (
		<Container className="my-4 md:my-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<PostCreateForm />
					<PostsList loggedUserId={user.id} />
				</div>
				<div className="space-y-6 md:space-y-0 lg:space-y-8 md:grid grid-cols-2 gap-8 lg:block">
					<TrendingGames />
					<SuggestedFriends />
				</div>
			</div>
		</Container>
	)
}


async function TrendingGames() {
	const popularGames = await getPopularVideoGames(5)

	return (
		<div className="bg-gray-800 p-6 pt-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Trending Games</h2>
			<ul className="space-y-2">
				{popularGames.map((game) => (
					<li key={game.id} className="flex items-center">
						<Gamepad2Icon className="h-5 w-5 mr-2" />
						<span>{game.title}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

async function SuggestedFriends() {

	const suggestedFriends = await getActiveUsers(3)

	return (
		<div className="bg-gray-800 p-6 pt-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Suggested Friends</h2>
			<ul className="flex flex-col gap-4">
				{suggestedFriends.map((friend) => (
					<UserCard key={friend.id} user={friend} className='hover:bg-gray-700/15' />
				))}
			</ul>
		</div>
	)
}