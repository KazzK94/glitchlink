import { type User } from 'next-auth'
import { type VideoGame } from '@prisma/client'
import { getOwnedVideoGames } from '@/services/games'
import { Button } from '../ui/button'
import { GameCard } from '../games/GameCard'
import Link from 'next/link'

export async function MyVideoGames({ user }: { user: User }) {

	const { videoGames } = await getOwnedVideoGames(user.id) || { videoGames: [] }

	return (
		<div className='px-3 py-1'>
			{videoGames.length === 0 && <p>No games added yet...</p>}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly mb-8 gap-4'>
				{
					videoGames.map((game: VideoGame) => (
						<GameCard
							key={game.id}
							externalId={game.externalId}
							title={game.title}
							imageUrl={game.image}
							userIsLogged={true}
							isOwned
						/>
					))
				}
			</div>
			<Link href='/games' className='inline-block mb-4 ml-2'>
				<Button className='text-lg bg-green-700/90 hover:bg-green-600/80' >
					Find{videoGames.length > 0 ? ' more ' : ' '}games
				</Button>
			</Link>
		</div>
	)
}
