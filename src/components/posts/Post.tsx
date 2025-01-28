'use client'

import { useState } from 'react'
import { PostComment } from './comments/Comment'
import { PostCommentCreateForm } from './comments/CommentCreateForm'
import { CompletePost } from '@/types'
import { ToggleLikeButton, ToggleCommentsButton, ShareButton } from './PostButtons'
import { PostParsedContent } from './PostParsedContent'
import Link from 'next/link'
import { Avatar } from '../users/Avatar'
import { ContextOpener, ContextOption } from '../common/ContextOpener'
import { EditIcon, TrashIcon } from 'lucide-react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

interface PostProps {
	post: CompletePost
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	const router = useRouter()

	const loggedUserIsAuthor = post.authorId === loggedUserId

	const [likesData, setLikesData] = useState({
		likes: post.likedBy.length,
		isLikedByUser: post.likedBy.some(like => like.id === loggedUserId)
	})
	const [showComments, setShowComments] = useState(false)

	// Add or remove a like to the post (against DB)
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

	// Show/hide comments
	const toggleComments = () => {
		setShowComments(!showComments)
	}

	// Confirm delete post
	const handleDeletePost = async () => {
		if (!confirm('Are you sure you want to delete this post?')) {
			// If not confirmed, stop here
			return
		}
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'DELETE'
		})
		if (!response.ok) {
			alert('Failed to delete post')
			return
		}
		alert('Post deleted correctly')
		router.refresh()
	}


	return (
		<article key={post.id} className={`bg-gray-800/85 pt-4 pb-2 rounded-lg shadow shadow-gray-400/60 ${loggedUserIsAuthor && 'border border-purple-600/20'}`}>
			{/* Post Author */}
			<div className='flex justify-between mb-4 px-4'>
				<Link href={`/u/${post.author.username}`} className="flex items-center">
					<Avatar src={post.author.avatar} className="size-12 md:size-14 rounded-full mr-3" />
					<div>
						<h3 className="font-semibold cursor-pointer">{post.author.name}</h3>
						<p className="text-sm text-gray-400 italic cursor-pointer">@{post.author.username}</p>
					</div>
				</Link>
				<div className='flex justify-end items-start -mr-2 -mt-0.5 min-w-8'>
					<ContextOpener>
						{loggedUserIsAuthor && (
							<>
								<ContextOption
									onClick={() => { alert('Editing posts is Not Implemented Yet') }}
								>
									<EditIcon className='size-4' />
									Edit Post
								</ContextOption>
								<ContextOption
									className='text-red-500'
									onClick={handleDeletePost}
								>
									<TrashIcon className='size-4' />
									Delete Post
								</ContextOption>
							</>
						)}
						{!loggedUserIsAuthor && (
							<ContextOption
								className='text-red-500'
								onClick={() => { alert('Reporting posts is Not Implemented Yet') }}
							>
								<ExclamationTriangleIcon className='size-4' />
								Report Post
							</ContextOption>
						)}
					</ContextOpener>
				</div>
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
									<PostComment key={index} comment={comment} loggedUserId={loggedUserId} />
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

