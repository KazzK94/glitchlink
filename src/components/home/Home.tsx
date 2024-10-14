
import { redirect } from 'next/navigation'

import { Gamepad2Icon } from 'lucide-react'
import { Container } from '@/components/Container'
import { UserCard } from '@/components/users/UserCard'
import { PostsList } from '@/components/posts/PostsList'
import { CreatePostForm } from '@/components/posts/CreatePostForm'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

export async function Home() {

	const session = await getServerSession(authOptions)
	if (!session?.user) {
		redirect('/login')
	}
	const { user } = session

	return (
		<Container className="my-4 md:my-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<CreatePostForm loggedUserId={user.id} />
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


function TrendingGames() {
	return (
		<div className="bg-gray-800 p-6 pt-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Trending Games</h2>
			<ul className="space-y-2">
				{['Elden Ring', 'Fortnite', 'Valorant', 'Among Us', 'Minecraft'].map((game) => (
					<li key={game} className="flex items-center">
						<Gamepad2Icon className="h-5 w-5 mr-2" />
						<span>{game}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

function SuggestedFriends() {

	const suggestedFriends = [
		{
			id: crypto.randomUUID(),
			name: 'Pixel Queen',
			username: 'pixelqueen99',
			color: '#ff66ff'
		},
		{
			id: crypto.randomUUID(),
			name: 'The Greatest Gamer',
			username: 'gamergod192',
			color: '#ffcc44'
		},
		{
			id: crypto.randomUUID(),
			name: 'Ray of Death',
			username: 'killitwithfire777',
			color: '#ff7777'
		}
	]

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