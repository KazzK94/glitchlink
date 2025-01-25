
import type { User, Comment } from '@prisma/client'
import { EllipsisVerticalIcon } from 'lucide-react'
import { CommentParsedContent } from './CommentParsedContent'
import { Avatar } from '@/components/users/Avatar'


interface CommentProps {
	comment: Comment & {
		author: User
	}
}

export function PostComment({ comment }: CommentProps) {
	return (
		<div className='bg-gray-700/70 p-3 rounded-lg'>
			<div className='flex justify-between'>
				<div className="flex items-center flex-grow">
					<Avatar src={comment.author.avatar} className='size-10 mr-2' />
					<div>
						<h3 className="text-sm font-semibold">{comment.author.name}</h3>
						<p className="text-xs text-gray-400 italic">@{comment.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8' aria-label='Open comment context menu'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>

			<CommentParsedContent content={comment.content} />
		</div>
	)
}
