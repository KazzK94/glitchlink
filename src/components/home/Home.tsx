
import { Container } from '@/components/Container'
import { Button } from "@/components/ui/button"
import { Gamepad2Icon, ThumbsUpIcon, MessageSquareIcon, Share2Icon } from 'lucide-react'
import { UserCard } from '../users/UserCard'

export function Home() {
	return (
		<Container className="py-4">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<NewPostForm />
					<PostsList />
				</div>
				<div className="space-y-6 md:space-y-0 lg:space-y-8 md:grid grid-cols-2 gap-8 lg:block">
					<TrendingGames />
					<SuggestedFriends />
				</div>
			</div>
		</Container>
	)
}

function NewPostForm() {
	return (
		<div className="bg-gray-800 px-6 py-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">What&apos;s on your mind?</h2>
			<textarea
				className="w-full min-h-20 max-h-[50vh] bg-gray-700 text-white rounded-md p-3 mb-3"
				rows={3}
				placeholder="Share your thoughts..."
			></textarea>
			<div className='flex w-full justify-end'>
				<Button className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-purple-600">
					Create post
				</Button>
			</div>
		</div>
	)
}

function PostsList() {

	const posts = [
		{
			id: crypto.randomUUID(),
			user: { name: 'The Greatest Gamer', username: 'gamergod192' },
			time: '2 hours ago',
			content: 'i just got the platinum trophy in Bloodborne 🏆🩸 ngl the chalice dungeons were a pain, but overall this was a masterpiece #Bloodborne #PS4 #PlatinumTrophy'
		},
		{
			id: crypto.randomUUID(),
			user: { name: 'Pixel Queen', username: 'pixelqueen99' },
			time: '4 days ago',
			content: 'I need some help with the final boss in Dark Souls 3. Any tips?'
		},
		{
			id: crypto.randomUUID(),
			user: { name: 'Ninja Warrior', username: 'Xx_NinjaWarrior_xX' },
			time: '1 week ago',
			content: 'Just got my hands on the new God of War game. Dude, it\'s freakin AMAZING!!! GoW 2018 was already so good but this one is on another level! 🤯 You have to play this if you havent already!! I\'m serious, dude!!'
		}
	]

	const iconSize = 20

	return (
		<div className="space-y-6">
			{posts.map((post) => (
				<div key={post.id} className="bg-gray-800 p-6 pb-4 rounded-lg">
					<div className="flex items-center mb-4">
						<div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
						<div>
							<h3 className="font-semibold">{post.user.name}</h3>
							<p className="text-sm text-gray-400 italic">@{post.user.username}</p>
						</div>
					</div>
					<p className="mb-5">{post.content}</p>

					<div className='flex justify-evenly sm:justify-between items-center'>
						<div className="flex gap-x-4 flex-grow justify-evenly">
							<Button variant="ghost"><ThumbsUpIcon size={iconSize} /></Button>
							<Button variant="ghost"><MessageSquareIcon size={iconSize} /></Button>
							<Button variant="ghost"><Share2Icon size={iconSize} /></Button>
						</div>
						<div className='hidden sm:block'>
							<p className="text-sm text-muted opacity-60 italic">{post.time}</p>
						</div>
					</div>
				</div>
			))}
		</div>
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