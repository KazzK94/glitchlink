
import { type User } from 'next-auth'
import { getFriends } from '@/services/socialLinks'
import { UsersList } from '../users/UsersList'
import Link from 'next/link'

export async function MyFriendsList({ user }: { user: User }) {
	const friends = await getFriends(user.id)

	if (!friends || friends.length === 0) return <NoFriends />

	return (
		<div className='px-3 py-1'>
			<UsersList
				className='text-xl text-neutral-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
				cardClassName='bg-gray-700/10 hover:bg-gray-700/15 shadow-sm shadow-gray-400/90 hover:shadow-gray-200/90 p-3'
				users={friends}
			/>
		</div>
	)
}

function NoFriends() {
	return (
		<div className='px-3 py-1'>
			<p>YOU HAVE NO FRIENDS YET, LOL!!</p>
			<p>But don&apos;t worry, you can still make some!</p>
			<Link href='/users' className='text-lg p-3 text-amber-200 hover:text-amber-400 mt-4 border border-slate-400 rounded block w-fit'>
				Find new friends now!
			</Link>
		</div>
	)
}