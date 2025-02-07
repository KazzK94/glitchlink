'use client'

import { UserPublicInfo } from '@/types'
import { toast } from 'sonner'
import { createReport } from '@/services/reports'
import { GenericReportModal } from '../common/GenericReportModal'

interface ReportUserModalProps {
	isOpen: boolean
	onClose: () => void
	user: UserPublicInfo
}

export function ReportUserModal({ isOpen, onClose, user }: ReportUserModalProps) {

	if (!isOpen) return null

	async function handleSubmit(reason: string) {
		try {
			await createReport({ reason, entityType: 'USER', entityId: user.id })
			toast.info('Report sent. It will be reviewed by the administrators as soon as possible. Thank you for your help.', { duration: 5000 })
			onClose()
		} catch (error) {
			console.error({ error })
			toast.error('An error occurred while submitting the report. Please try again later or contact an administrator.', { duration: 5000 })
		}
	}

	return (
		<GenericReportModal
			title={`Reporting user ${user.name} (@${user.username})`}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	)
}
