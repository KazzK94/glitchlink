'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'
import { addCommentToPost } from '@/services/posts'
import { Button } from '@/components/ui/button'

interface PostCommentCreateFormProps {
	post: { id: string, author: { id: string } }
	className?: string
}

export function PostCommentCreateForm({ post, className }: PostCommentCreateFormProps) {

	const router = useRouter()
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const content = formData.get('content') as string

		// TODO: Show the user a proper error explaining the minimum length
		if (!content || content.length < 6) return

		await addCommentToPost({ post: post, content })
		textareaRef.current!.value = ''

		router.refresh()
	}

	// TODO: Control submit on Ctrl+Enter

	return (
		<form onSubmit={handleSubmit} className={`bg-gray-800 rounded-lg px-1 ${className}`}>
			<textarea
				name='content'
				ref={textareaRef}
				className="text-sm w-full max-h-[50vh] bg-gray-700 text-white rounded-md p-3 mb-0.5"
				placeholder="Add a comment about this Post..."
				rows={2}
			></textarea>
			<div className='flex w-full justify-end'>
				<Button className="w-full px-4 py-2 text-sm rounded-md bg-gradient-to-br from-gray-600/90 to-slate-500/90 hover:from-slate-500/70 hover:to-slate-400/60">
					Comment
				</Button>
			</div>
		</form>
	)
}
