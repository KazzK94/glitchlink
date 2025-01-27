'use client'

import { ContextOpener, ContextOption } from '@/components/common/ContextOpener'
import { UserPublicInfo } from '@/types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export function UserContextOpener({ user }: { user: UserPublicInfo }) {
	return (
		<ContextOpener>
			<ContextOption className='text-red-500' onClick={() => alert('Reporting users is Not Implemented Yet')}>
				<ExclamationTriangleIcon className='size-5' />
				Report @{user.username}
			</ContextOption>
		</ContextOpener>
	)
}
