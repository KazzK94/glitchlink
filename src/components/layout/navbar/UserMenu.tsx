
import Link from 'next/link'
import { UserIcon, LogInIcon, BellIcon } from 'lucide-react'

import { getUserFromSession } from '@/services/auth'
import { getNewNotifications } from '@/services/notifications'

export async function UserMenu() {

	const user = await getUserFromSession()

	const notifications = user ? await getNewNotifications(user.id) : []
	const notificationsCount = notifications.length

	return (
		<div className='flex md:gap-0.5 items-center'>
			{
				user ? (
					<>
						<UserButton url="/notifications" text="Notifications" className='relative'>
							<BellIcon className="size-7 pt-1" />
							{
								notificationsCount > 0 && (
									<span className='absolute bottom-2 right-1 px-1 text-xs font-bold rounded-full bg-red-700'>
										{notificationsCount}
									</span>
								)
							}
						</UserButton>
						<UserButton url="/profile" text="My Profile">
							<UserIcon className="size-7" />
						</UserButton>
					</>
				) : (
					<UserButton url="/login" text="Log In">
						<LogInIcon className="size-7" />
					</UserButton>
				)
			}
		</div>

	)
}

function UserButton({ url, text, children, className }: { url: string, text: string, children: React.ReactNode, className?: string }) {
	return (
		<Link href={url} className={`rounded-full p-2 hover:bg-gray-800 transition-colors ${className}`}>
			{children}
			<span className="sr-only">{text}</span>
		</Link>
	)
}