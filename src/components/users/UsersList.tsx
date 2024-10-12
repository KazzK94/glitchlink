
import { getUsers } from '@/services/users'

// AUTH
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

import { UserCard } from './UserCard'

export async function UsersList() {
	const session = await getServerSession(authOptions)
	const user = session?.user

	const whereClause = { NOT: {} }
	if (user) whereClause.NOT = { id: user.id }
	const users = await getUsers({ where: whereClause })

	return (
		<ul className='text-xl text-neutral-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{users.map(user => (
				<li key={user.id}>
					<UserCard user={user} className='bg-gray-700/5 shadow-sm shadow-gray-400 hover:shadow-gray-200 p-3' />
				</li>
			))}
		</ul>
	)
}
