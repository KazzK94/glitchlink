import { EllipsisVerticalIcon } from 'lucide-react'

export function PostComment() {

	const comment = getMockComment()

	return (
		<div className='bg-gray-700/40 p-3 rounded-lg'>
			<div className='flex justify-between'>
				<div className="flex items-center flex-grow">
					<div className="size-8 bg-gray-600 rounded-full mr-2"></div>
					<div>
						<h3 className="text-sm font-semibold">{comment.author.name}</h3>
						<p className="text-xs text-gray-400 italic">@{comment.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>

			<p className='text-sm mt-3'>
				{comment.content}
			</p>
		</div>
	)
}


function getMockComment() {
	
	const comments = [
		{
			content: 'I love this game!! It is so much fun to play and the graphics are amazing! I can\'t wait to see what the developers come up with for the next part!',
			author: {
				name: 'The Greatest Gamer',
				username: 'gamergod192'
			}
		},
		{
			content: 'well if you ask me this game is a total waste of time lol better go play fortnite lmao',
			author: {
				name: 'Ray of Death',
				username: 'killitwithfire777'
			}
		},
		{
			content: 'This game is so much fun!',
			author: {
				name: 'Pixel Queen',
				username: 'pixelqueen99'
			}
		},
		{
			content: 'I love the graphics in this game!',
			author : {
				name: 'Pixel Queen',
				username: 'pixelqueen99'
			}
		},
		{
			content: 'I have to agree with you, this game is amazing!',
			author: {
				name: 'The Greatest Gamer',
				username: 'gamergod192'
			}
		}
	]

	const randomIndex = Math.floor(Math.random() * comments.length)

	return comments[randomIndex]
}