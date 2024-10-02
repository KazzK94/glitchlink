
import Link from 'next/link'
import { Button } from '../ui/button'
import { UserIcon, LogInIcon } from 'lucide-react'

import { getServerSession } from "next-auth/next"

export async function UserButton() {

	const session = await getServerSession()
	const isUserLogged = !!session?.user

	return (
		<>
			{
				isUserLogged ? (
					<Link href="/profile">
						<Button variant="ghost" size="icon" className="rounded-full">
							<UserIcon className="h-6 w-6" />
							<span className="sr-only">My Profile</span>
						</Button>
					</Link>
				) : (
					<Link href="/login">
						<Button variant="ghost" size="icon" className="rounded-full">
							<LogInIcon className="h-6 w-6" />
							<span className="sr-only">Log In</span>
						</Button>
					</Link>
				)
			}
		</>
	)
}