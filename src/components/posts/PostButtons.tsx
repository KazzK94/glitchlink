
import { MessageSquareIcon, Share2Icon, ThumbsUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ToggleLikeButton({ onClick, likesCount, isLikedByUser }: { onClick: () => void, likesCount: number, isLikedByUser: boolean }) {
	return (
		<GenericPostButton onClick={onClick}
			className={isLikedByUser ? 'text-blue-500 hover:text-blue-700' : ''}
		>
			<ThumbsUpIcon size={20} />
			{(likesCount > 0) && <span>{likesCount}</span>}
		</GenericPostButton>
	)
}

export function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<GenericPostButton onClick={onClick}>
			<MessageSquareIcon size={20} />
			{(commentsCount > 0) && <span>{commentsCount}</span>}
		</GenericPostButton>
	)
}

export function ShareButton({ postId }: { postId: string }) {

	const handleClick = () => {
		const url = `${window.location.host}/posts/${postId}`
		navigator.clipboard.writeText(url)
		alert('Copied URL of the post.')
	}

	return (
		<GenericPostButton onClick={handleClick}>
			<Share2Icon size={20} />
		</GenericPostButton>
	)
}

function GenericPostButton({children, onClick, className}: {children: React.ReactNode, onClick: () => void, className?: string}) {
	return (
		<Button variant="ghost" onClick={onClick} 
			className={`flex items-center gap-1.5 hover:text-inherit hover:bg-transparent hover:opacity-80 ${className}`}>
			{children}
		</Button>
	)
}