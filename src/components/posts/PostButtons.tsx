
import { MessageSquareIcon, Share2Icon, ThumbsUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ToggleLikeButton({ onClick, likesCount, isLikedByUser }: { onClick: () => void, likesCount: number, isLikedByUser: boolean }) {
	return (
		<GenericPostButton onClick={onClick} ariaLabel='Like post'
			className={isLikedByUser ? 'text-blue-500 hover:text-blue-700' : ''}
		>
			<ThumbsUpIcon size={20} />
			{(likesCount > 0) && <span className='!select-none'>{likesCount}</span>}
		</GenericPostButton>
	)
}

export function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<GenericPostButton onClick={onClick} ariaLabel='See comments'>
			<MessageSquareIcon size={20} />
			{(commentsCount > 0) && <span className='!select-none'>{commentsCount}</span>}
		</GenericPostButton>
	)
}

export function ShareButton({ postId }: { postId: string }) {

	const handleClick = () => {
		const url = `${window.location.host}/posts/${postId}`
		navigator.clipboard.writeText(url)
		toast.success('Copied URL of the post.')
	}

	return (
		<GenericPostButton onClick={handleClick} ariaLabel='Share post'>
			<Share2Icon size={20} />
		</GenericPostButton>
	)
}

function GenericPostButton({children, onClick, className, ariaLabel}: {children: React.ReactNode, onClick: () => void, className?: string, ariaLabel?: string}) {
	return (
		<Button variant="ghost" onClick={onClick} aria-label={ariaLabel}
			className={`flex items-center gap-1.5 hover:text-inherit hover:bg-transparent hover:opacity-80 ${className}`}>
			{children}
		</Button>
	)
}