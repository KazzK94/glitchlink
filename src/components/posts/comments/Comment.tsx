import type { User, Comment } from '@prisma/client'
import { EllipsisVerticalIcon } from 'lucide-react'


interface CommentProps {
	comment: Comment & {
		author: User
	}
}

export function PostComment({ comment }: CommentProps) {

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

			<p className='text-sm mt-3 pr-5 md:pr-8'>
				{comment.content}
			</p>
		</div>
	)
}

