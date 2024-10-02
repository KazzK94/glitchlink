
import Link from 'next/link'
import { Button } from '../ui/button'
import { UserIcon, LogInIcon } from 'lucide-react'

import { useSession } from 'next-auth/react'

export function UserButton() {

	const session = useSession()
	const isUserLogged = session.data?.user || null

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