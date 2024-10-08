'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useState } from 'react'

interface ModalOpenerProps {
	dialogTrigger?: string | React.ReactNode
	dialogTriggerClassName?: string
	modalTitle: string | React.ReactNode
	modalContent: string | React.ReactNode
	children?: React.ReactNode
	onConfirm?: () => void
	closeOnConfirm?: boolean
	confirmText?: string
	onCancel?: () => Promise<void> | void
	showCancelButton?: boolean
	cancelText?: string
}

export function ModalOpener({
	dialogTrigger, dialogTriggerClassName, modalTitle, modalContent, children,
	onConfirm, closeOnConfirm = true, confirmText, onCancel, showCancelButton, cancelText
}: ModalOpenerProps) {

	const [isOpen, setIsOpen] = useState(false)

	const handleConfirm = async () => {
		if (onConfirm) {
			// Run function passed as prop
			await onConfirm()
		}
		if (closeOnConfirm) {
			setIsOpen(false)
		}
	}

	const handleCancel = async () => {
		if (onCancel) {
			// Run function passed as prop
			await onCancel()
		}
		setIsOpen(false)
	}

	const isDialogTriggerString = (children && typeof children === 'string') || (dialogTrigger && typeof dialogTrigger === 'string')

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild={!isDialogTriggerString} className={`${dialogTriggerClassName}`}>
				{children || dialogTrigger}
			</DialogTrigger>
			<DialogContent className='bg-gray-100 backdrop-blur-sm border-0 shadow-sm shadow-slate-400/60 w-fit mx-3 my-2 rounded'>
				<DialogHeader className='text-black flex flex-col gap-1 mb-2 pr-4'>
					{modalTitle &&
						<DialogTitle className='text-xl leading-none'>{modalTitle}</DialogTitle>
					}
					<DialogDescription className='text-black/90 text-pretty'>
						{modalContent}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className='flex justify-end gap-2'>
						{(onCancel || showCancelButton) && (
							<Button variant='ghost' className='text-red-700 hover:text-red-600 hover:bg-inherit' onClick={handleCancel}>
								{cancelText || 'Cancel'}
							</Button>
						)}
						{(onConfirm || closeOnConfirm) && (
							<Button onClick={handleConfirm}>
								{confirmText || 'Confirm'}
							</Button>
						)}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}