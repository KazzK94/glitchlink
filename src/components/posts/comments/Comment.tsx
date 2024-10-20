import { usePosts } from '@/hooks/usePosts'
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

			<CommentParsedContent content={comment.content} />
		</div>
	)
}

/** Returns the Comment's content formatted, embedding the mentions and hashtags as links and creating <br>s for new lines */
function CommentParsedContent({ content }: { content: string }) {
	const { parsePostContent } = usePosts()
	return (
		<div className='text-sm mt-3 pr-5 md:pr-8'>
			{content.trim().split('\n').map((line, index) => (
				<div key={index}>
					{parsePostContent(line)}
					<br />
				</div>
			))}
		</div>
	)
}
