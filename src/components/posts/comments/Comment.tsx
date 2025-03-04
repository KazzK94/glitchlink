
import type { User, Comment } from '@prisma/client'
import { CommentParsedContent } from './CommentParsedContent'
import { Avatar } from '@/components/users/Avatar'
import { ContextOpener, ContextOption } from '@/components/common/ContextOpener'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import { updateComment } from '@/services/api/posts'
import { Button } from '@/components/ui/button'
import { ReportCommentModal } from '../ReportModal'

interface CommentProps {
	comment: Comment & {
		author: User
	}
	loggedUserId?: string
}

export function PostComment({ comment, loggedUserId }: CommentProps) {

	const router = useRouter()
	const [mode, setMode] = useState<'view' | 'edit'>('view')
	const [isReportModalOpen, setIsReportModalOpen] = useState(false)

	// Confirm delete post
	const handleDeleteComment = async () => {
		if (!confirm('Are you sure you want to delete this comment?')) {
			// If not confirmed, stop here
			return
		}
		const response = await fetch(`/api/posts/${comment.postId}/comments/${comment.id}`, {
			method: 'DELETE'
		})
		if (!response.ok) {
			toast.error('Error: Failed to delete comment')
			return
		}
		toast.success('Comment deleted successfully!')
		router.refresh()
	}

	const handleEnableEditComment = () => {
		setMode('edit')
	}

	const handleReportComment = () => {
		setIsReportModalOpen(true)
	}


	return (
		<div className='bg-gray-700/70 p-3 rounded-lg'>
			<div className='flex justify-between'>
				<div className="flex items-center flex-grow">
					<Avatar src={comment.author.avatar} className='size-10 mr-2' />
					<Link href={`/u/${comment.author.username}`}>
						<h3 className="text-sm font-semibold cursor-pointer">{comment.author.name}</h3>
						<p className="text-xs text-gray-400 italic cursor-pointer">@{comment.author.username}</p>
					</Link>
				</div>
				{mode === 'view' && (

					<ContextOpener>
						{
							loggedUserId === comment.authorId && (
								<>
									<ContextOption onClick={handleEnableEditComment}>
										<EditIcon className='size-4' />Edit Comment
									</ContextOption>
									<ContextOption className='text-red-500' onClick={handleDeleteComment}>
										<TrashIcon className='size-4' />Delete Comment
									</ContextOption>
								</>
							)
						}
						{
							loggedUserId !== comment.authorId && (
								<ContextOption className='text-red-500' onClick={handleReportComment}>
									<ExclamationTriangleIcon className='size-4' />Report Comment
								</ContextOption>
							)
						}
					</ContextOpener>
				)}
			</div>
			{
				mode === 'edit' ? (
					<UpdateComment
						comment={comment}
						onUpdated={() => { router.refresh(); setMode('view') }}
						onCancel={() => setMode('view')}
					/>
				) : (
					<CommentParsedContent content={comment.content} />
				)
			}

			<ReportCommentModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} comment={comment} />
		</div>
	)
}


interface UpdateCommentProps {
	comment: Comment,
	onUpdated: () => void
	onCancel: () => void
}

function UpdateComment({ comment, onUpdated, onCancel }: UpdateCommentProps) {

	const [commentContent, setCommentContent] = useState(comment.content)

	const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const response = await updateComment({ id: comment.id, content: commentContent })
		if (!response) {
			toast.error('Error: Failed to update comment')
			return
		}
		toast.success('Comment updated correctly!')
		onUpdated()
	}

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onCancel()
	}

	return (
		<form className="px-0 py-0.5 mt-2">
			<textarea
				name='content'
				placeholder="Update your comment here..."
				className="w-full max-h-[30vh] [field-sizing:content] bg-gray-700 text-white rounded-md p-3 mb-2 resize-none"
				onChange={(e) => setCommentContent(e.target.value)}
				value={commentContent}
			></textarea>
			<div className='flex gap-2 w-full mb-3'>
				<Button onClick={handleUpdate} className="w-full px-4 py-2 text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-md hover:from-cyan-600 hover:to-purple-600">
					Update comment
				</Button>
				<Button onClick={handleCancel} className="w-full px-4 py-2 text-base bg-gray-700 text-white rounded-md hover:bg-gray-800">
					Cancel
				</Button>
			</div>
		</form>
	)
}