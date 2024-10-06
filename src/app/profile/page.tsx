
import { Container } from '@/components/Container'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// AUTH
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LogoutButton } from '@/components/LogoutButton'
import { LogOutIcon } from 'lucide-react'

export default async function ProfilePage() {

	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/login')
	}

	const { user } = session

	console.log({ profileSession: session })

	return (
		<Container asSection className='mt-4 relative'>
			<h1 className='text-3xl' style={{ color: user.color }}>
				{user?.name}
			</h1>
			<p className='mt-1'>You should only be able to see this if you are logged in.</p>

			<Link href='/users' className='text-lg p-3 text-amber-200 hover:text-amber-400 mt-4 border border-slate-400 rounded block w-fit'>
				See the list of all Users
			</Link>

			<LogoutButton className='flex items-center gap-2 absolute top-2 right-4 border-2 rounded-lg p-3'>
				<LogOutIcon size={24} />
				<span className='text-lg'>
					Logout
				</span>
			</LogoutButton>
		</Container>
	)
}
