'use client'

import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'

import Link from 'next/link'
import { Avatar } from './Avatar'
import { UserSocialLinkInteractions } from './UserSocialLinkInteractions'

interface UserCardProps {
	user: UserPublicInfo
	socialLink?: {
		id?: string
		status?: SocialLinkDetailedStatus | null
	} | null
	className?: string
	isSelf?: boolean
}

export function UserCard({ user, socialLink, className, isSelf = false }: UserCardProps) {

	// Skip Card if blocked (in any direction)
	if (socialLink?.status === 'BLOCKED') return null

	return (
		<div className={`flex items-center justify-between transition duration-200 rounded-lg p-2 ${className}`}>
			<div className="flex items-center">
				<Avatar src={user.avatar} className="size-14 bg-gray-700 rounded-full mr-3" />
				<div className='flex flex-col'>
					<Link href={`/u/${user.username}`}>
						<span>{user.name}</span>
					</Link>
					<span className='italic text-gray-400 text-sm'>@{user.username}</span>
				</div>
			</div>
			{
				!isSelf && (
					<UserSocialLinkInteractions user={user} socialLink={{ id: socialLink?.id, status: socialLink?.status }} />
				)
			}
		</div>
	)
}
