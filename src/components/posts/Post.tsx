
import type { User, Post } from '@prisma/client'

import { MessageSquareIcon, Share2Icon, ThumbsUpIcon, EllipsisVerticalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface PostProps {
	post: Post & {
		author: User
	}
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	// TODO: Logged User ID will be used to check if the user can update/delete the post
	//   		as well as to see if the user has already liked the post
	console.log({ loggedUserId })

	const conditionalClassName = post.authorId === loggedUserId ? 'border border-green-900/80' : ''

	return (
		<article key={post.id} className={`bg-gray-800 p-6 pb-4 rounded-lg ${conditionalClassName}`}>

			<div className='flex mb-4'>
				<div className="flex items-center flex-grow">
					<div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
					<div>
						<h3 className="font-semibold">{post.author.name}</h3>
						<p className="text-sm text-gray-400 italic">@{post.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>


			<p className="mb-5">{post.content}</p>

			<div className='flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<Button variant="ghost"><ThumbsUpIcon size={20} /></Button>
					<Button variant="ghost"><MessageSquareIcon size={20} /></Button>
					<Button variant="ghost"><Share2Icon size={20} /></Button>
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{post.createdAt.toLocaleString()}</p>
				</div>
			</div>
		</article>
	)
}