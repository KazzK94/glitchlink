
import { Post } from './Post'

export function PostsList() {
	const posts = [
		{
			id: crypto.randomUUID(),
			user: { name: 'The Greatest Gamer', username: 'gamergod192' },
			createdAt: '2 hours ago',
			content: 'i just got the platinum trophy in Bloodborne 🏆🩸 ngl the chalice dungeons were a pain, but overall this was a masterpiece #Bloodborne #PS4 #PlatinumTrophy'
		},
		{
			id: crypto.randomUUID(),
			user: { name: 'Pixel Queen', username: 'pixelqueen99' },
			createdAt: '4 days ago',
			content: 'I need some help with the final boss in Dark Souls 3. Any tips?'
		},
		{
			id: crypto.randomUUID(),
			user: { name: 'Ninja Warrior', username: 'Xx_NinjaWarrior_xX' },
			createdAt: '1 week ago',
			content: 'Just got my hands on the new God of War game. Dude, it\'s freakin AMAZING!!! GoW 2018 was already so good but this one is on another level! 🤯 You have to play this if you havent already!! I\'m serious, dude!!'
		}
	]

	return (
		<div className="space-y-6">
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	)
}
