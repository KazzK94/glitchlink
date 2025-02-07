
import React, { useEffect, useRef, useState } from 'react'

interface GenericReportModalProps {
	title: string
	isOpen: boolean
	onClose: () => void
	onSubmit: (reason: string) => void
}

export function GenericReportModal({ title, isOpen, onClose, onSubmit }: GenericReportModalProps) {

	const modalRef = useRef<HTMLDivElement>(null)
	const [reason, setReason] = useState('')

	// useEffect to handle clicks outside the modal
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSubmit(reason)
		onClose()
	}

	return (
		<div className="fixed inset-0 px-2 z-50 flex items-center justify-center bg-black bg-opacity-60">
			<div ref={modalRef} className="bg-gray-800 rounded-lg shadow-md shadow-gray-400/10 py-4 px-4 w-full max-w-lg">
				<div className="flex justify-between mb-2 gap-1">
					<h2 className="text-lg font-semibold mb-1 pl-1">{title}</h2>
					<div className='relative'>
						<button onClick={onClose} className="absolute top-1 md:top-0 right-0 text-gray-500 hover:text-gray-700 text-3xl -mt-3">&times;</button>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<textarea
						className="w-full p-2 bg-gray-900 border border-gray-400 rounded mb-2"
						placeholder="Describe the issue"
						required
						value={reason}
						onChange={(event) => setReason(event.target.value)}
					></textarea>
					<button type="submit" className="w-full font-semibold py-2 rounded text-red-600 border-2 border-red-700 bg-gray-700/35 hover:bg-gray-700/25">
						Send Report
					</button>
				</form>
			</div>
		</div>
	)
}