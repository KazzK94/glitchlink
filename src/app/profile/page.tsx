
import { Container } from '@/components/Container'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// AUTH
import { getServerSession } from "next-auth/next"
import { LogoutButton } from '@/components/LogoutButton'

export default async function ProfilePage() {

	const session = await getServerSession()

	if (!session) {
		redirect('/login')
	}

	const { user } = session

	return (
		<Container asSection className='mt-4'>
			<h1 className='text-3xl'>Profile Page: {user?.name}</h1>
			<p className='mt-1'>You should only be able to see this if you are logged in.</p>

			<Link href='/users' className='text-amber-200 hover:text-amber-400 mt-4 border rounded p-2 block w-fit'>
				See all users list
			</Link>
			<LogoutButton />
		</Container>
	)
}
