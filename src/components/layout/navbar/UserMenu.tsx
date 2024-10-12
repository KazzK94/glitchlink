
import Link from 'next/link'
import { UserIcon, LogInIcon, BellIcon } from 'lucide-react'

import { getServerSession } from "next-auth/next"

export async function UserMenu() {

	const session = await getServerSession()
	const isUserLogged = !!session?.user

	return (
		<div className='flex gap-0.5 md:gap-2 items-center'>
			{
				isUserLogged ? (
					<>
						<UserButton url="#" text="Notifications">
							<BellIcon className="size-6 md:size-7 pt-1" />
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

function UserButton({ url, text, children }: { url: string, text: string, children: React.ReactNode }) {
	return (
		<Link href={url} className='rounded-full p-2 hover:bg-gray-800 transition-colors'>
			{children}
			<span className="sr-only">{text}</span>
		</Link>
	)
}