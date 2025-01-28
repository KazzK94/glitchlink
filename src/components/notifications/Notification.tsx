'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { CompleteNotification } from '@/types'
import { BookOpenCheckIcon, XIcon } from 'lucide-react'

export function Notification({ notification }: { notification: CompleteNotification }) {

	if (notification.actionType === 'REPLY_TO_POST') {
		return <ReplyToPostNotification notification={notification} />
	}

	if (notification.actionType === 'MENTION_IN_POST') {
		return <MentionInPostNotification notification={notification} />
	}

	if (notification.actionType === 'MENTION_IN_COMMENT') {
		return <MentionInCommentNotification notification={notification} />
	}

	return (
		<p className='p-4 bg-gray-800 text-red-400 rounded-lg text-lg select-none italic cursor-pointer'>
			[ ! ] Error: Unknown notification... (please contact an admin or file a ticket)
		</p>
	)
}

function NotificationWrapper({ href, notification, children }: { href: string, notification: CompleteNotification, children: React.ReactNode }) {
	const router = useRouter()

	const handleLinkClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		const href = event.currentTarget.href
		if (!notification.read) {
			await fetch(`/api/notifications/${notification.id}/read`, { method: 'PATCH' })
		}
		router.push(href)
		router.refresh()
	}

	const handleMarkAsRead = async () => {
		if (!notification.read) {
			await fetch(`/api/notifications/${notification.id}/read`, { method: 'PATCH' })
			router.refresh()
		}
	}

	const handleDelete = async () => {
		await fetch(`/api/notifications/${notification.id}`, { method: 'DELETE' })
		router.refresh()
	}

	return (
		<div className='px-4 bg-gray-800 rounded-lg'>
			<div className='text-lg select-none flex justify-between items-center gap-4'>
				{/* Content */}
				<Link href={href} onClick={handleLinkClick} className='flex-grow py-4 flex items-center gap-3 hover:opacity-90'>
					{!notification.read && (<span className="bg-red-700 rounded p-1">NEW!!</span>)}
					<span>{children}</span>
				</Link>
				{/* Buttons */}
				<span className='flex gap-3'>
					{
						!notification.read && (
							<button onClick={handleMarkAsRead}>
								<BookOpenCheckIcon size={24} className='text-grey-400 cursor-pointer' />
							</button>
						)
					}
					<button onClick={handleDelete}>
						<XIcon size={24} className='text-grey-400 cursor-pointer' />
					</button>
				</span>
			</div>
		</div>
	)
}

function ReplyToPostNotification({ notification }: { notification: CompleteNotification }) {
	return (
		<NotificationWrapper href={`/posts/${notification.entityId}`} notification={notification}>
			<span className='text-blue-200'>@{notification.generatedBy.username}</span> replied to your post
		</NotificationWrapper>
	)
}

function MentionInPostNotification({ notification }: { notification: CompleteNotification }) {
	return (
		<NotificationWrapper href={`/posts/${notification.entityId}`} notification={notification}>
			<span className='text-blue-200'>@{notification.generatedBy.username}</span> mentioned you in a post
		</NotificationWrapper>
	)
}

function MentionInCommentNotification({ notification }: { notification: CompleteNotification }) {
	return (
		<NotificationWrapper href={`/posts/${notification.entityId}`} notification={notification}>
			<span className='text-blue-200'>@{notification.generatedBy.username}</span> mentioned you in a comment
		</NotificationWrapper>
	)
}