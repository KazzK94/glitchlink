
import { ConversationContainer } from '@/components/conversations/ConversationContainer'
import { getUserFromSession } from '@/services/auth'
import { getUser } from '@/services/api/users'

export default async function ConversationPage({ params }: { params: { username: string } }) {

	const { username } = params

	const [loggedUser, targetUser] = await Promise.all([
		getUserFromSession(),
		getUser({ username })
	])

	if (!loggedUser || !targetUser) {
		return <div className='w-fit mx-auto text-red-300 bg-gray-800/60 rounded-lg p-12 mt-12 text-center text-lg'>
			<p className='text-2xl mb-1'>Error: Unable to open conversation</p>
			<p>Could not start a conversation with the user <span className='font-semibold'>@{username}</span>.</p>
			<p>Make sure that the user exists and that you are correctly logged in.</p>
		</div>
	}

	return (
		<div className='flex h-[calc(100vh_-_64px)]  bg-gray-900 text-white relative overflow-x-hidden'>
			<ConversationContainer
				targetUser={targetUser}
				loggedUser={loggedUser}
			/>
		</div>
	)
}
