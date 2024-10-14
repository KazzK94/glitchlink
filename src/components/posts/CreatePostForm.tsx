'use client'

import { createPost } from '@/services/posts'
import { Button } from '../ui/button'
import { useRef } from 'react'

import { useRouter } from 'next/navigation'


export function CreatePostForm({ loggedUserId }: { loggedUserId: string }) {

	const router = useRouter()
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const content = formData.get('content') as string

		// TODO: Show the user a proper error explaining the minimum length
		if (!content || content.length < 6) return

		await createPost({ content: content , authorId: loggedUserId })
		textareaRef.current!.value = ''

		router.refresh()
	}

	// TODO: Control submit on Ctrl+Enter

	return (
		<form onSubmit={handleSubmit} className="bg-gray-800 px-6 py-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">What have you been playing?</h2>
			<textarea
				name='content'
				ref={textareaRef}
				className="w-full min-h-20 max-h-[50vh] bg-gray-700 text-white rounded-md p-3 mb-3"
				placeholder="Tell everyone about your gaming..."
				rows={3}
			></textarea>
			<div className='flex w-full justify-end'>
				<Button className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-purple-600">
					Create post
				</Button>
			</div>
		</form>
	)
}
