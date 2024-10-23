
import { User } from 'next-auth'
import { EditIcon, LogOutIcon } from 'lucide-react'
import { LogoutButton } from '../auth/LogoutButton'
import Link from 'next/link'

export function ProfileHeading({ user }: { user: User }) {
	return (
		<div>
			{/* Buttons */}
			<div className='float-right flex items-center gap-3'>
				<Link href='#' className='flex items-center gap-2 border-2 rounded-lg p-3 text-slate-300 border-slate-300'>
					<EditIcon size={20} />
				</Link>
				<LogoutButton className='flex items-center gap-2 border-2 rounded-lg p-3 text-red-400 border-red-400'>
					<LogOutIcon size={20} />
				</LogoutButton>
			</div>
			{/* Content */}
			<h1 className='text-3xl font-semibold'>
				{user.name}
			</h1>
			<p className='italic opacity-80 text-base mt-0.5 ml-1'>
				@{user.username}
			</p>
		</div>
	)
}
