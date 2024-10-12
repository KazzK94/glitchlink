

import { UserPublicInfo } from '@/types'

import Link from 'next/link'
import { Button } from '../ui/button'
import { UserRoundPlusIcon } from 'lucide-react'

export function UserCard({ user, className }: { user: UserPublicInfo, className?: string }) {
	return (
		<div key={user.id} className={`flex items-center justify-between transition duration-200 rounded-lg p-2 ${className}`}>
			<div className="flex items-center">
				<div className="size-10 bg-gray-700 rounded-full mr-3" />
				<div className='flex flex-col'>
					<Link href={`/u/${user.username}`}>
						<span>{user.name}</span>
					</Link>
					<span className='italic text-gray-400 text-sm'>@{user.username}</span>
				</div>
			</div>
			<Button variant="ghost" className='hover:bg-transparent hover:text-green-500 transition duration-200'><UserRoundPlusIcon /></Button>
		</div>
	)
}