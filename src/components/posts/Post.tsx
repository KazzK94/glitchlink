'use client'

import { MessageSquareIcon, Share2Icon, ThumbsUpIcon, EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'

import { Button } from '@/components/ui/button'
import { PostComment } from './comments/Comment'
import { PostCommentCreateForm } from './comments/CommentCreateForm'
import { CompletePost } from '@/types'

interface PostProps {
	post: CompletePost
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	const userIsAuthor = post.authorId === loggedUserId

	const [isLikedByUser, setIsLikedByUser] = useState(post.likedBy.some(like => like.id === loggedUserId))
	const [likes, setLikes] = useState(post.likedBy.length)

	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => {
		setShowComments(!showComments)
	}

	const toggleLike = async () => {
		const previousIsLiked = isLikedByUser
		setIsLikedByUser(!previousIsLiked)
		const response = await fetch(`/api/posts/${post.id}/likes`, { method: 'PATCH' })
		if (!response.ok) {
			setIsLikedByUser(!previousIsLiked)
			console.error('Failed to toggle like:', response)
			return
		}
		setLikes(likes + (previousIsLiked ? -1 : 1))
	}

	return (
		<article key={post.id} className={`bg-gray-800 pt-4 pb-2 rounded-lg ${userIsAuthor && 'border border-blue-800/30'}`}>
			{/* Post Author */}
			<div className='flex justify-between mb-4 px-4'>
				<div className="flex items-center">
					<div className="size-10 bg-gray-700 rounded-full mr-3"></div>
					<div>
						<h3 className="font-semibold">{post.author.name}</h3>
						<p className="text-sm text-gray-400 italic">@{post.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>
			{/* Post Content */}
			<PostParsedContent content={post.content} />

			{/* Buttons */}
			<div className='px-4 sm:px-6 flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<ToggleLikeButton onClick={toggleLike} likesCount={likes} isLikedByUser={isLikedByUser} />
					<ToggleCommentsButton onClick={toggleComments} commentsCount={post.comments.length} />
					<ShareButton postId={post.id} />
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{new Date(post.createdAt).toDateString()}</p>
				</div>
			</div>

			{/* Comments (conditionally rendered) */}
			{showComments && (
				<div className='mx-1 px-1 mt-2 pt-2 border-t border-gray-600'>
					<PostCommentCreateForm post={post} className='mb-3' />
					<div className='flex flex-col gap-2'>
						{
							post.comments.map((comment, index) => (
								<PostComment key={index} comment={comment} />
							))
						}
					</div>
				</div>
			)}
		</article>
	)
}

/** Returns the Post's content formatted, embedding the mentions and hashtags as links and creating <br>s for new lines */
function PostParsedContent({ content }: { content: string }) {
	const { parsePostContent } = usePosts()
	return (
		<div className='mb-5 px-4'>
			{content.trim().split('\n').map((line, index) => (
				<div key={index}>
					{parsePostContent(line)}
					<br />
				</div>
			))}
		</div>
	)
}

function ToggleLikeButton({ onClick, likesCount, isLikedByUser }: { onClick: () => void, likesCount: number, isLikedByUser: boolean }) {
	return (
		<Button variant="ghost" onClick={onClick} className={`flex items-center gap-1.5 hover:bg-transparent ${isLikedByUser && 'text-blue-500 hover:text-blue-700'}`}>
			<ThumbsUpIcon size={20} />
			{(likesCount > 0) && <span>{likesCount}</span>}
		</Button>
	)
}

function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<Button variant="ghost" onClick={onClick} className='flex items-center gap-1.5 hover:bg-transparent'>
			<MessageSquareIcon size={20} />
			{(commentsCount > 0) && <span>{commentsCount}</span>}
		</Button>
	)
}

function ShareButton({ postId }: { postId: string }) {

	const handleClick = () => {
		const url = `${window.location.host}/posts/${postId}`
		navigator.clipboard.writeText(url)
		alert('Copied URL of the post.')
	}

	return (
		<Button variant="ghost" onClick={handleClick} className="hover:bg-transparent">
			<Share2Icon size={20} />
		</Button>
	)
}
