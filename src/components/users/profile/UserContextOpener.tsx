'use client'

import { ContextOpener, ContextOption } from '@/components/common/ContextOpener'
import { UserPublicInfo } from '@/types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

export function UserContextOpener({ user }: { user: UserPublicInfo }) {

	const handleReportUser = () => {
		toast.warning('Reporting users is Not Implemented Yet')
	}

	return (
		<ContextOpener>
			<ContextOption className='text-red-500' onClick={handleReportUser}>
				<ExclamationTriangleIcon className='size-5' />
				Report @{user.username}
			</ContextOption>
		</ContextOpener>
	)
}
