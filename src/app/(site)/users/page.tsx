import { Container } from '@/components/Container'
import { getUsers } from '@/services/users'
import Link from 'next/link'

export default async function UsersPage() {

	const users = await getUsers()

	return (
		<Container asSection>
			<h1 className='mt-4 mb-2 text-3xl'>Users</h1>

			<ul className='text-xl text-neutral-300'>
				{users.map(user => (
					<li key={user.id}>
						<Link href={`/users/${user.id}`} className='hover:text-cyan-500'>
							· {user.name} <span className='text-sm opacity-85 italic'>(@{user.username})</span>
						</Link>
					</li>
				))}
			</ul>
		</Container>
	)
}
