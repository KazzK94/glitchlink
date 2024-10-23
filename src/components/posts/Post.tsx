'use client'

import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { PostComment } from './comments/Comment'
import { PostCommentCreateForm } from './comments/CommentCreateForm'
import { CompletePost } from '@/types'
import { ToggleLikeButton, ToggleCommentsButton, ShareButton } from './PostButtons'
import { PostParsedContent } from './PostParsedContent'

interface PostProps {
	post: CompletePost
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	const userIsAuthor = post.authorId === loggedUserId

	const [likesData, setLikesData] = useState({
		likes: post.likedBy.length,
		isLikedByUser: post.likedBy.some(like => like.id === loggedUserId)
	})

	const toggleLike = async () => {
		const previousIsLiked = likesData.isLikedByUser
		setLikesData({
			likes: likesData.likes + (previousIsLiked ? -1 : 1),
			isLikedByUser: !previousIsLiked
		})
		const response = await fetch(`/api/posts/${post.id}/likes`, { method: 'PATCH' })
		if (!response.ok) {
			console.error('Failed to toggle like:', response)
			return
		}
		setLikesData({
			likes: likesData.likes + (previousIsLiked ? -1 : 1),
			isLikedByUser: !previousIsLiked
		})
	}

	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => {
		setShowComments(!showComments)
	}

	return (
		<article key={post.id} className={`bg-gray-800/85 pt-4 pb-2 rounded-lg ${userIsAuthor && 'border border-purple-600/20'}`}>
			{/* Post Author */}
			<div className='flex justify-between mb-4 px-4'>
				<div className="flex items-center">
					<div className="size-10 bg-gray-700 rounded-full mr-3"></div>
					<div>
						<h3 className="font-semibold">{post.author.name}</h3>
						<p className="text-sm text-gray-400 italic">@{post.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8' aria-label='Open post context menu'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>
			{/* Post Content */}
			<PostParsedContent content={post.content} />

			{/* Buttons */}
			<div className='px-4 sm:px-6 flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<ToggleLikeButton onClick={toggleLike} likesCount={likesData.likes} isLikedByUser={likesData.isLikedByUser} />
					<ToggleCommentsButton onClick={toggleComments} commentsCount={post.comments.length} />
					<ShareButton postId={post.id} />
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{new Date(post.createdAt).toDateString()}</p>
				</div>
			</div>

			{/* Comments (conditionally rendered) */}
			{showComments && (
				<div className='my-1 pt-2 border-t border-gray-600 space-y-3'>
					{post.comments.length > 0 && <>
						<div className='flex flex-col gap-2 mx-2'>
							{
								post.comments.map((comment, index) => (
									<PostComment key={index} comment={comment} />
								))
							}
						</div>
						<hr className='opacity-40 mx-1' />
					</>}
					<PostCommentCreateForm post={post} className='mx-2' />
				</div>
			)}
		</article>
	)
}

