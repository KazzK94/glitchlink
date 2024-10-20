'use client'

import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { PostComment } from './comments/Comment'
import { PostCommentCreateForm } from './comments/CommentCreateForm'
import { CompletePost } from '@/types'
import { ToggleLikeButton, ToggleCommentsButton, ShareButton } from './PostButtons'

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
