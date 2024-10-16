'use client'

import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'
import { UserPlusIcon, UserCheckIcon, UserXIcon, UserMinusIcon, CheckIcon, XIcon } from 'lucide-react'

import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface UserCardProps {
	user: UserPublicInfo
	socialLinkId?: string
	socialLinkStatus?: SocialLinkDetailedStatus | null | undefined
	className?: string
}


export function UserCard({ user, socialLinkId, socialLinkStatus = 'NONE', className }: UserCardProps) {

	const router = useRouter()

	// Skip Card if blocked (in any direction)
	if (socialLinkStatus === 'BLOCKED') return null

	if (socialLinkStatus !== 'NONE' && !(socialLinkId)) {
		throw new Error('Need to provide socialLinkId when socialLinkStatus exists.')
	}

	async function handleSendSocialLinkRequest() {
		if (!confirm(`Send a friend request to ${user.name} (@${user.username})?`)) return
		await fetch('/api/users/socialLinks', {
			method: 'POST',
			body: JSON.stringify({ targetId: user.id })
		})
		router.refresh()
	}

	async function handleRemoveSocialLink() {
		console.log(socialLinkId)
		if (!confirm(`Remove your link with ${user.name} (@${user.username})?`)) return
		if (!socialLinkId) return
		await fetch('/api/users/socialLinks/' + socialLinkId, { method: 'DELETE' })
		router.refresh()
	}

	async function handleAcceptSocialLinkRequest() {
		if (!socialLinkId) return
		await fetch('/api/users/socialLinks/' + socialLinkId, {
			method: 'PATCH',
			body: JSON.stringify({ status: 'FRIENDS' })
		})
		router.refresh()
	}

	return (
		<div key={user.id} className={`flex items-center justify-between transition duration-200 rounded-lg p-2 ${className}`}>
			<div className="flex items-center">
				<div className="size-10 bg-gray-700 rounded-full mr-3" />
				<div className='flex flex-col'>
					<Link href={`/u/${user.username}`}>
						<span style={{ color: user.color }}>{user.name}</span>
					</Link>
					<span className='italic text-gray-400 text-sm'>@{user.username}</span>
				</div>
			</div>
			{(socialLinkStatus === 'NONE') && (
				<SendSocialLinkRequest onClick={handleSendSocialLinkRequest} />
			)}
			{(socialLinkStatus === 'FRIENDS') && (
				<IdleSocialLinkExisting onClick={handleRemoveSocialLink} />
			)}
			{(socialLinkStatus === 'SENT_PENDING') && (
				<CancelSocialLinkRequest onClick={handleRemoveSocialLink} />
			)}
			{(socialLinkStatus === 'RECEIVED_PENDING') && (
				<div>
					<AcceptSocialLinkRequest onClick={handleAcceptSocialLinkRequest} />
					<DenySocialLinkRequest onClick={handleRemoveSocialLink} />
				</div>
			)}
		</div>
	)
}

function SendSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button onClick={onClick} variant="ghost" className='hover:bg-transparent text-green-100 hover:text-green-400 transition duration-200'>
			<UserPlusIcon />
		</Button>
	)
}

function IdleSocialLinkExisting({ onClick }: { onClick?: () => void }) {
	return (
		<Button onClick={onClick} variant="ghost" className='hover:bg-transparent hover:text-red-400 transition duration-200 group'>
			<UserCheckIcon className='group-hover:hidden' />
			<UserXIcon className='hidden group-hover:inline-block' />
		</Button>
	)
}

function CancelSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button onClick={onClick} variant="ghost" className='hover:bg-transparent text-purple-400 hover:text-red-400 transition duration-200 group'>
			<UserMinusIcon className='group-hover:hidden' />
			<UserXIcon className='hidden group-hover:inline-block' />
		</Button>
	)
}

function AcceptSocialLinkRequest({onClick}: {onClick?: () => void}) {
	return (
		<Button onClick={onClick} variant="ghost" className='hover:bg-transparent text-green-200 hover:text-green-400 transition duration-200'>
			<CheckIcon />
		</Button>
	)
}

function DenySocialLinkRequest({onClick}: {onClick?: () => void}) {
	return (
		<Button onClick={onClick} variant="ghost" className='hover:bg-transparent text-red-200 hover:text-red-400 transition duration-200'>
			<XIcon />
		</Button>
	)
}