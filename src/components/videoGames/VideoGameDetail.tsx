
import { type UserPublicInfo } from '@/types'
import { UserCard } from '../users/UserCard'

interface VideoGameDetailProps {
	game: {
		title: string
		image: string
		developers: string[]
		description: string
		genres: string[]
		platforms: string[]
	}
	players?: UserPublicInfo[]
}

export default function VideoGameDetail({ game, players }: VideoGameDetailProps) {
	return (
		<>
			<div className=' bg-slate-700/50 rounded-md shadow-sm overflow-hidden'>
				<img src={game.image} className='max-h-[40svh] w-full object-cover shadow-gray-700' alt={'Image of the game ' + game.title} />
				<div className='px-4 py-3 flex flex-col gap-3'>
					<h1 className='text-3xl'>{game.title}</h1>
					<div className='flex gap-2 mx-0.5'>
						{
							game.genres.map(genre => (
								<span key={genre} className='bg-purple-200 text-gray-900 text-xs font-semibold px-2.5 py-1.5 rounded'>
									{genre}
								</span>
							))
						}
					</div>
					<div className='flex flex-col text-lg md:text-base gap-2'>
						<p>
							{game.description}
						</p>
						<p>
							<strong>Developed by:</strong> {game.developers.join(', ')}
						</p>
						<p>
							<strong>Available in:</strong> {game.platforms.join(', ')}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-6'>
				<h2 className='text-2xl'>Gamers who play this</h2>
				{
					(!players || players.length === 0)
						? <p className='opacity-80 italic text-sm mt-1 ml-0.5'>No users added this game yet.</p>
						: (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
								{players.map(user => (
									<UserCard key={user.id} user={user} />
								))}
							</div>
						)
				}
			</div>
		</>
	)
}