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
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { updatePost } from '@/services/posts'
import { ReportPostModal } from './ReportModal'

interface PostProps {
	post: CompletePost
	loggedUserId?: string
}

export function Post({ post, loggedUserId }: PostProps) {

	const loggedUserIsAuthor = post.authorId === loggedUserId
	const router = useRouter()

	const [likesData, setLikesData] = useState({
		likes: post.likedBy.length,
		isLikedByUser: post.likedBy.some(like => like.id === loggedUserId)
	})
	const [showComments, setShowComments] = useState(false)
	const [mode, setMode] = useState<'view' | 'edit'>('view')
	const [isReportModalOpen, setIsReportModalOpen] = useState(false)

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

	const handleEnableEditPost = () => {
		setMode('edit')
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
			toast.error('Error: Failed to delete post')
			return
		}
		toast.success('Post deleted correctly!')
		router.refresh()
	}

	const handleOpenReportModal = () => {
		setIsReportModalOpen(true)
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
				{mode === 'view' && (
					<div className='flex justify-end items-start -mr-2 -mt-0.5 min-w-8'>
						<ContextOpener>
							{loggedUserIsAuthor && (
								<>
									<ContextOption onClick={handleEnableEditPost}>
										<EditIcon className='size-4' />
										Edit Post
									</ContextOption>
									<ContextOption onClick={handleDeletePost} className='text-red-500'>
										<TrashIcon className='size-4' />
										Delete Post
									</ContextOption>
								</>
							)}
							{!loggedUserIsAuthor && (
								<ContextOption
									className='text-red-500'
									onClick={handleOpenReportModal}
								>
									<ExclamationTriangleIcon className='size-4' />
									Report Post
								</ContextOption>
							)}
						</ContextOpener>
					</div>
				)}
			</div>
			{/* Post Content */}
			{
				mode === 'edit' ? (
					<UpdatePost post={post} onUpdated={() => { router.refresh(); setMode('view') }} onCancel={() => setMode('view')} />
				) : (
					<>
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
											post.comments.map((comment) => (
												<PostComment key={comment.id} comment={comment} loggedUserId={loggedUserId} />
											))
										}
									</div>
									<hr className='opacity-40 mx-1' />
								</>}
								<PostCommentCreateForm post={post} className='mx-2' />
							</div>
						)}
					</>
				)
			}

			<ReportPostModal post={post} isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
		</article>
	)
}

interface UpdatePostProps {
	post: CompletePost,
	onUpdated: () => void
	onCancel: () => void
}

function UpdatePost({ post, onUpdated, onCancel }: UpdatePostProps) {

	const [postContent, setPostContent] = useState(post.content)

	const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const response = await updatePost({ id: post.id, content: postContent })
		if (!response) {
			toast.error('Error: Failed to update post')
			return
		}
		toast.success('Post updated correctly!')
		onUpdated()
	}

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onCancel()
	}

	return (
		<form className="px-3 py-1">
			<textarea
				name='content'
				placeholder="Update your post here..."
				className="w-full min-h-20 max-h-[50vh] [field-sizing:content] bg-gray-700 text-white rounded-md p-3 mb-2 resize-none"
				rows={3}
				onChange={(e) => setPostContent(e.target.value)}
				value={postContent}
			></textarea>
			<div className='flex gap-2 w-full mb-3'>
				<Button onClick={handleUpdate} className="w-full px-4 py-2 text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-md hover:from-cyan-600 hover:to-purple-600">
					Update post
				</Button>
				<Button onClick={handleCancel} className="w-full px-4 py-2 text-base bg-gray-700 text-white rounded-md hover:bg-gray-800">
					Cancel
				</Button>
			</div>
		</form>
	)
}