
import { Container } from '../common/Container'
import { EditIcon, LogOutIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import { LogoutButton } from '../auth/LogoutButton'
import { Avatar } from './Avatar'

import { getUserFromSession } from '@/services/auth'
import { getUserByUsername } from '@/services/users'

export async function UserProfile({ username }: { username: string }) {

	const [loggedUser, user] = await Promise.all([
		getUserFromSession(),
		getUserByUsername({ username: username })
	])

	if (!user) return <UserNotFound />

	const isSelf = loggedUser?.id === user.id

	return (
		<Container className='mt-4'>
			{/* Buttons */}
			{
				isSelf ? (
					<div className='float-right flex items-center gap-3'>
						<Link href='#' className='flex items-center border-2 rounded-lg p-3 z-10 text-slate-300 border-slate-300'>
							<EditIcon size={20} />
						</Link>
						<LogoutButton formClassName='z-10' className='flex items-center border-2 rounded-lg p-3 z-10 text-red-400 border-red-400'>
							<LogOutIcon size={20} />
						</LogoutButton>
					</div>
				) : (
					<div className='float-right flex items-center gap-3'>
						<Link href={`/dm/${user.username}`} className='flex items-center border-2 rounded-lg p-2.5 z-10 text-purple-300 border-purple-300/80 hover:text-purple-300 hover:border-purple-400'>
							<MailIcon size={24} />
						</Link>
					</div>
				)
			}

			{/* Content */}
			<div className="flex gap-4 items-center ml-2">
				<div>
					<Avatar src={user.avatar} className='size-16' editable={isSelf} />
				</div>
				<div>
					<h1 className='text-xl font-semibold text-blue-200'>
						{user.name}
					</h1>
					<p className='italic opacity-80 text-sm mt-0.5 ml-1'>
						@{user.username}
					</p>
				</div>
			</div>

			{/* Video Games */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-6'>
				{
					user.videoGames
						? user.videoGames.map((videogame, index) => (
							<div key={index} className='p-2 bg-slate-600/30 rounded'>
								<p className='text-center'>{videogame.title}</p>
							</div>
						))
						: <p className='italic text-sm'>This user has not added any videogames yet.</p>
				}
			</div>
		</Container>
	)
}

function UserNotFound() {
	return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: User not found</Container>
}