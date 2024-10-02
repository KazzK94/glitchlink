
import { Container } from '@/components/Container'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// AUTH
import { getServerSession } from "next-auth/next"
import { LogoutButton } from '@/components/LogoutButton'
import { LogOutIcon } from 'lucide-react'

export default async function ProfilePage() {

	const session = await getServerSession()

	if (!session) {
		redirect('/login')
	}

	const { user } = session

	return (
		<Container asSection className='mt-4'>
			<h1 className='text-3xl'>
				Profile Page:&nbsp;
				<span style={{ color: user.color }}>{user?.name}</span>
			</h1>
			<p className='mt-1'>You should only be able to see this if you are logged in.</p>

			<Link href='/users' className='text-amber-200 hover:text-amber-400 mt-12 border rounded p-2 block w-fit'>
				See all users list
			</Link>

			<LogoutButton className='border-2 rounded-lg mt-12 p-4 flex gap-4 hover:bg-slate-800/50'>
				<LogOutIcon size={32} />
				<span className='text-xl'>
					Logout
				</span>
			</LogoutButton>
		</Container>
	)
}
