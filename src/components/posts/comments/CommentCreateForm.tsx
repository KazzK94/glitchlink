'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'
import { addCommentToPost } from '@/services/api/posts'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

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
		const content = (formData.get('content') as string).trim()
		
		if(!content) return
		if (content.length < 3) return toast.warning('A comment must be at least 3 characters long')
		
		await addCommentToPost({ post: post, content })
		textareaRef.current!.value = ''
		
		router.refresh()
	}

	// TODO: Control submit on Ctrl+Enter

	return (
		<form onSubmit={handleSubmit} className={className}>
			<textarea
				className="text-sm p-3 w-full max-h-[50vh] bg-gray-700/60 text-white rounded-sm placeholder:opacity-80 placeholder:italic"
				name='content'
				ref={textareaRef}
				placeholder="Add a comment here..."
				rows={3}
			></textarea>
			<div className='flex w-full justify-end mt-0.5'>
				<Button className="w-full px-4 py-2 text-sm rounded-md bg-gradient-to-br from-gray-600/90 to-slate-500/90 hover:from-slate-500/70 hover:to-slate-400/60">
					Comment
				</Button>
			</div>
		</form>
	)
}
