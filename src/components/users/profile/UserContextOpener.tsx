'use client'

import { useState } from 'react'

import { ContextOpener, ContextOption } from '@/components/common/ContextOpener'
import { UserPublicInfo } from '@/types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { ReportUserModal } from '../ReportUserModal'

export function UserContextOpener({ user }: { user: UserPublicInfo }) {

	const [isOpen, setIsOpen] = useState(false)

	const handleCloseModal = () => setIsOpen(false)

	const handleReportUser = () => {
		setIsOpen(true)
	}

	return (
		<>
			<ContextOpener>
				<ContextOption className='text-red-500' onClick={handleReportUser}>
					<ExclamationTriangleIcon className='size-5' />
					Report @{user.username}
				</ContextOption>
			</ContextOpener>
			<ReportUserModal user={user} isOpen={isOpen} onClose={handleCloseModal} />
		</>
	)
}
