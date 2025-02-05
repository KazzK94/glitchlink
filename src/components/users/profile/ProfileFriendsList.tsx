
import Link from 'next/link'
import { UserPublicInfo } from '@/types'
import { UserCard } from '../UserCard'

export async function ProfileFriendsList({ friends, loggedUserId }: { friends: UserPublicInfo[], loggedUserId?: string }) {

	if (!friends || friends.length === 0) return <NoFriends />

	return (
		<div className='px-3 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
			{
				friends.map(friend => {
					return <UserCard key={friend.id} user={friend} isSelf={friend.id === loggedUserId} />
				})
			}
		</div>
	)
}

function NoFriends() {
	return (
		<div className='px-3 py-2'>
			<p>YOU HAVE NO FRIENDS YET, LOL!!</p>
			<p>But don&apos;t worry, you can still make some!</p>
			<Link href='/users' className='text-lg p-3 text-amber-200 hover:text-amber-400 mt-4 border border-slate-400 rounded block w-fit'>
				Find new friends now!
			</Link>
		</div>
	)
}