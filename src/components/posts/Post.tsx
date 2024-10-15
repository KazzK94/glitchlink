'use client'

import { MessageSquareIcon, Share2Icon, ThumbsUpIcon, EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { PostComment } from './comments/Comment'
import { PostCommentCreateForm } from './comments/CommentCreateForm'
import { CompletePost } from '@/types'

interface PostProps {
	post: CompletePost
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	// TODO: 
	// Logged User ID will be used:
	// 		1) to check if the user is the author (can update/delete the post) or not (can report the post)
	//   	2) to see if the user has already liked the post

	const userIsAuthor = post.authorId === loggedUserId

	const [isLiked, setIsLiked] = useState(post.likedBy.some(like => like.id === loggedUserId))
	const [likes, setLikes] = useState(post.likedBy.length)

	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => {
		setShowComments(!showComments)
	}

	const toggleLike = async () => {
		const previousIsLiked = isLiked
		setIsLiked(!previousIsLiked)
		const response = await fetch(`/api/posts/${post.id}/likes`, { method: 'PATCH' })
		if (!response.ok) {
			setIsLiked(!previousIsLiked)
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
			<p className="mb-5 px-4">{post.content}</p>

			{/* Buttons */}
			<div className='px-4 sm:px-6 flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<ToggleLikeButton onClick={toggleLike} likesCount={likes} isLiked={isLiked} />
					<ToggleCommentsButton onClick={toggleComments} commentsCount={post.comments.length} />
					<ShareButton postId={post.id} />
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{post.createdAt.toLocaleString()}</p>
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

function ToggleLikeButton({ onClick, likesCount, isLiked }: { onClick: () => void, likesCount: number, isLiked: boolean }) {
	return (
		<Button variant="ghost" onClick={onClick} className={`flex items-center gap-1.5 ${isLiked && 'text-blue-500 hover:text-blue-700'}`}>
			<ThumbsUpIcon size={20} />
			{(likesCount > 0) && <span>{likesCount}</span>}
		</Button>
	)
}

function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<Button variant="ghost" onClick={onClick} className='flex items-center gap-1.5'>
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
		<Button variant="ghost" onClick={handleClick}>
			<Share2Icon size={20} />
		</Button>
	)
}