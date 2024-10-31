import { UserPublicInfo } from '@/types'
import { Container } from '../common/Container'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'

export function UserProfile({ user }: { user: UserPublicInfo }) {
	return (
		<Container className='mt-4'>
			{/* Buttons */}
			<div className='float-right flex items-center gap-3'>
				<Link href={`/dm/${user.username}`} className='border rounded-lg px-2.5 py-1.5  text-slate-300/90 border-slate-300/60'>
					<MailIcon size={32} />
				</Link>
			</div>

			<h1 className='text-3xl font-semibold'>{user.name}</h1>
			<p className='italic opacity-80 text-base mt-0.5 ml-1'>@{user.username}</p>

			<h2 className='text-2xl mt-6'>{user.name}&apos;s Video Games</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3'>
				{
					user.videogames
						? user.videogames.map((videogame, index) => (
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