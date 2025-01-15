'use client'

import { useRef, useState } from 'react'

// TODO: Prevent Avatar edition if profile is not the user's profile

const AVATAR_PLACEHOLDER_URL = '/images/avatar-placeholder.webp'

export function Avatar({ avatarUrl, className, isSelf = false }: { avatarUrl: string | null | undefined, className?: string, isSelf: boolean }) {
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null | undefined>(avatarUrl)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleOpenFileSelector = () => {
		inputRef.current?.click()
	}

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		if (!e.target || !e.target.files || e.target.files.length === 0) {
			return alert('No file selected')
		}

		const selectedFile = e.target.files[0]

		const formData = new FormData()
		formData.append('avatar', selectedFile)

		const response = await fetch('/api/users/me/avatar', {
			method: 'PATCH',
			body: formData
		})
		const data = await response.json()
		setUploadedImageUrl(data.avatarUrl)
	}

	return (
		<div onClick={handleOpenFileSelector} className={`rounded-full size-16 border-2 overflow-hidden ${isSelf ? 'cursor-pointer hover:opacity-60 transition' : ''} ${className || ''}`}>
			<img className='w-full h-full object-cover' src={uploadedImageUrl ? uploadedImageUrl : AVATAR_PLACEHOLDER_URL} />
			<input type='file' className='hidden' ref={inputRef} onChange={handleSubmit} accept='.jpg,.jpeg,.png,.avif,.webp' />
		</div>
	)
}
