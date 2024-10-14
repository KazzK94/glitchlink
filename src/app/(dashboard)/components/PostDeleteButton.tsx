'use client'

import { XIcon } from 'lucide-react'
import { ModalOpener } from '@/components/common/Modal'
import { useRouter } from 'next/navigation'

export function PostDeleteButton({ postId }: { postId: string }) {

	const router = useRouter()

	const handleConfirm = async () => {
		const response = await fetch(`/api/posts/${postId}`, {
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
		<ModalOpener
			modalTitle={`Delete Post ID ${postId}`}
			modalContent='Are you sure you want to delete this post?'
			onConfirm={handleConfirm}
			showCancelButton
			className='bg-red-500 text-white p-1 rounded-md'
		>
			<XIcon size={32} />
		</ModalOpener>
	)
}