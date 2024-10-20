
import { MessageSquareIcon, Share2Icon, ThumbsUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ToggleLikeButton({ onClick, likesCount, isLikedByUser }: { onClick: () => void, likesCount: number, isLikedByUser: boolean }) {
	return (
		<Button variant="ghost" onClick={onClick}
			className={`flex items-center gap-1.5 hover:text-inherit hover:bg-transparent hover:opacity-85 
						${isLikedByUser && 'text-blue-500 hover:text-blue-700'}`}
		>
			<ThumbsUpIcon size={20} />
			{(likesCount > 0) && <span>{likesCount}</span>}
		</Button>
	)
}

export function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<Button variant="ghost" onClick={onClick} className='flex items-center gap-1.5 hover:text-inherit hover:bg-transparent hover:opacity-85'>
			<MessageSquareIcon size={20} />
			{(commentsCount > 0) && <span>{commentsCount}</span>}
		</Button>
	)
}

export function ShareButton({ postId }: { postId: string }) {

	const handleClick = () => {
		const url = `${window.location.host}/posts/${postId}`
		navigator.clipboard.writeText(url)
		alert('Copied URL of the post.')
	}

	return (
		<Button variant="ghost" onClick={handleClick} className="hover:text-inherit hover:bg-transparent hover:opacity-85">
			<Share2Icon size={20} />
		</Button>
	)
}
