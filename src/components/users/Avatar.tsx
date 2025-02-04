'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'

const AVATAR_PLACEHOLDER_URL = '/images/avatar-placeholder.webp'

export function Avatar({ src, className, editable = false }: { src: string | null | undefined, className?: string, editable?: boolean }) {
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null | undefined>(src)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleOpenFileSelector = () => {
		if (!editable) return
		inputRef.current?.click()
	}

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		if (!e.target || !e.target.files || e.target.files.length === 0) {
			return toast.warning('No file selected')
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
		toast.success('Avatar updated successfully')
	}

	return (
		<div onClick={handleOpenFileSelector} className={`rounded-full border-2 overflow-hidden ${editable ? 'cursor-pointer hover:opacity-60 transition' : ''} ${className || ''}`}>
			<img className={'object-cover aspect-square ' + className} alt='User avatar' src={uploadedImageUrl ? uploadedImageUrl : AVATAR_PLACEHOLDER_URL} />
			<input type='file' className='hidden' ref={inputRef} onChange={handleSubmit} accept='.jpg,.jpeg,.png,.avif,.webp' />
		</div>
	)
}
