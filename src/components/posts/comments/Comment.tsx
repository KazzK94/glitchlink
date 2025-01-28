
import type { User, Comment } from '@prisma/client'
import { CommentParsedContent } from './CommentParsedContent'
import { Avatar } from '@/components/users/Avatar'
import { ContextOpener, ContextOption } from '@/components/common/ContextOpener'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'


interface CommentProps {
	comment: Comment & {
		author: User
	}
	loggedUserId?: string
}

export function PostComment({ comment, loggedUserId }: CommentProps) {
	return (
		<div className='bg-gray-700/70 p-3 rounded-lg'>
			<div className='flex justify-between'>
				<div className="flex items-center flex-grow">
					<Avatar src={comment.author.avatar} className='size-10 mr-2' />
					<Link href={`/u/${comment.author.username}`}>
						<h3 className="text-sm font-semibold cursor-pointer">{comment.author.name}</h3>
						<p className="text-xs text-gray-400 italic cursor-pointer">@{comment.author.username}</p>
					</Link>
				</div>
				<ContextOpener>
					{
						loggedUserId === comment.authorId && (
							<>
								<ContextOption onClick={() => alert('Editing comments is Not Implemented Yet')}>
									<EditIcon className='size-4' />Edit Comment
								</ContextOption>
								<ContextOption className='text-red-500' onClick={() => alert('Deleting comments is Not Implemented Yet')}>
									<TrashIcon className='size-4' />Delete Comment
								</ContextOption>
							</>
						)
					}
					{
						loggedUserId !== comment.authorId && (
							<ContextOption className='text-red-500' onClick={() => alert('Reporting comments is Not Implemented Yet')}>
								<ExclamationTriangleIcon className='size-4' />Report Comment
							</ContextOption>
						)
					}
				</ContextOpener>
			</div>

			<CommentParsedContent content={comment.content} />
		</div>
	)
}
