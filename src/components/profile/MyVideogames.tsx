
import { type VideoGame } from '@prisma/client'
import { GameCard } from '../games/GameCard'

export async function MyVideoGames({ videoGames }: { videoGames: VideoGame[] }) {
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
		</div>
	)
}
