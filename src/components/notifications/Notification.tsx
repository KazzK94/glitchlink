'use client'

import { type Notification } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Notification({ notification }: { notification: Notification }) {

	const router = useRouter()

	const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		const href = event.currentTarget.href
		if (!notification.read) {
			await fetch(`/api/notifications/${notification.id}/read`, { method: 'PATCH' })
		}
		router.push(href)
		router.refresh()
	}

	return (
		<Link key={notification.id} href={notification.targetUrl} onClick={handleClick} className='p-4 bg-gray-800 rounded-lg cursor-pointer'>
			<p className='text-lg select-none cursor-pointer flex items-center gap-3'>
				{!notification.read && (<span className="bg-red-700 rounded p-1">NEW!!</span>)}
				{notification.message}
			</p>
		</Link>
	)
}

async function forcedDelay(amount: number) {
	await new Promise(resolve => setTimeout(resolve, amount))
}