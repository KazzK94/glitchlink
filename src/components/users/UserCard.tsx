'use client'

import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'

import Link from 'next/link'
import { Avatar } from './Avatar'
import { UserSocialLinkInteractions } from './UserSocialLinkInteractions'
import { Card, CardContent } from '../ui/card'

interface UserCardProps {
	user: UserPublicInfo
	socialLink?: {
		id?: string
		status?: SocialLinkDetailedStatus | null
	} | null
	className?: string
	isSelf?: boolean
}

export function UserCard({ user }: UserCardProps) {
	return (
		<Link href={`/u/${user.username}`} passHref>
			<Card className="w-full bg-slate-800/85 border-0 overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1">
				<CardContent className="p-6 flex flex-col items-center text-center">
					<Avatar src={user.avatar} className="size-24 mb-4 border-4 border-slate-600 shadow-lg" />
					<h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
					<p className="text-sm text-gray-500">@{user.username}</p>
				</CardContent>
			</Card>
		</Link>
	)
}

export function UserSmallCard({ user, socialLink, className, isSelf = false }: UserCardProps) {

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
