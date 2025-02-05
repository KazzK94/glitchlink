'use client'

import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'
import { UserPlusIcon, UsersIcon, UserCheckIcon, UserXIcon, UserMinusIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface UserCardProps {
	user: UserPublicInfo
	socialLink?: {
		id?: string
		status?: SocialLinkDetailedStatus | null
	} | null
	isSelf?: boolean
}

export function UserSocialLinkInteractions({ user, socialLink, isSelf = false }: UserCardProps) {

	console.log({socialLink})

	const router = useRouter()

	// Skip Card if blocked (in any direction)
	if (socialLink?.status === 'BLOCKED') return null

	if (socialLink && !socialLink?.id) {
		socialLink.status = 'NONE'
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
		if (!confirm(`Remove your link with ${user.name} (@${user.username})?`)) return
		removeSocialLink()
	}

	async function handleRemoveSocialLinkRequest() {
		if (!confirm(`Cancel your friend request to ${user.name} (@${user.username})?`)) return
		removeSocialLink()
	}

	async function handleRejectSocialLinkRequest() {
		if (!confirm(`Cancel your friend request to ${user.name} (@${user.username})?`)) return
		removeSocialLink()
	}

	async function removeSocialLink() {
		if (!socialLink?.id) return
		await fetch('/api/users/socialLinks/' + socialLink.id, { method: 'DELETE' })
		router.refresh()
	}

	async function handleAcceptSocialLinkRequest() {
		if (!socialLink?.id) return
		await fetch('/api/users/socialLinks/' + socialLink.id, {
			method: 'PATCH',
			body: JSON.stringify({ status: 'FRIENDS' })
		})
		router.refresh()
	}

	return (
		<div>
			{
				!isSelf && (
					<>
						{(!socialLink || socialLink.status === 'NONE') && (
							<SendSocialLinkRequest onClick={handleSendSocialLinkRequest} />
						)}
						{(socialLink?.status === 'FRIENDS') && (
							<IdleSocialLinkExisting onClick={handleRemoveSocialLink} />
						)}
						{(socialLink?.status === 'SENT_PENDING') && (
							<CancelSocialLinkRequest onClick={handleRemoveSocialLinkRequest} />
						)}
						{(socialLink?.status === 'RECEIVED_PENDING') && (
							<div className='flex'>
								<AcceptSocialLinkRequest onClick={handleAcceptSocialLinkRequest} />
								<RejectSocialLinkRequest onClick={handleRejectSocialLinkRequest} />
							</div>
						)}
					</>
				)
			}
		</div>
	)
}

function SendSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button aria-label='Send request' onClick={onClick} variant="ghost"
			className='hover:bg-transparent text-green-50 hover:text-green-400 transition-none'>
			<UserPlusIcon />
		</Button>
	)
}

function IdleSocialLinkExisting({ onClick }: { onClick?: () => void }) {
	return (
		<Button aria-label='Remove friend' onClick={onClick} variant="ghost"
			className='hover:bg-transparent text-blue-400 hover:text-red-400 group transition-none'>
			<UsersIcon className='group-hover:hidden' />
			<UserXIcon className='hidden group-hover:inline-block' />
		</Button>
	)
}

function CancelSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button aria-label='Cancel request' onClick={onClick} variant="ghost"
			className='hover:bg-transparent text-purple-400 hover:text-red-400 group transition-none'>
			<UserMinusIcon className='group-hover:hidden' />
			<UserXIcon className='hidden group-hover:inline-block' />
		</Button>
	)
}

function AcceptSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button aria-label='Accept request' onClick={onClick} variant="ghost"
			className='px-2 hover:bg-transparent text-green-200 hover:text-green-400 transition-none'>
			<UserCheckIcon />
		</Button>
	)
}

function RejectSocialLinkRequest({ onClick }: { onClick?: () => void }) {
	return (
		<Button aria-label='Reject request' onClick={onClick} variant="ghost"
			className='px-2 hover:bg-transparent text-red-200 hover:text-red-400'>
			<UserXIcon />
		</Button>
	)
}