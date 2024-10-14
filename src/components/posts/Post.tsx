
import { MessageSquareIcon, Share2Icon, ThumbsUpIcon } from 'lucide-react'
import { Button } from '../ui/button'

interface PostProps {
	post: {
		id: string
		content: string
		user: {
			name: string
			username: string
		},
		createdAt: string
	}
}

export function Post({ post }: PostProps) {
	return (
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
					<Button variant="ghost"><ThumbsUpIcon size={20} /></Button>
					<Button variant="ghost"><MessageSquareIcon size={20} /></Button>
					<Button variant="ghost"><Share2Icon size={20} /></Button>
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{post.createdAt}</p>
				</div>
			</div>
		</div>
	)
}