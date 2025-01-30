
import { type VideoGame } from '@prisma/client'
import { VideoGameCard } from '../../videoGames/VideoGameCard'

export async function ProfileVideoGames({ videoGames, loggedUserVideoGames = [], isSelf = false }: { videoGames: VideoGame[], loggedUserVideoGames?: VideoGame[], isSelf?: boolean }) {
	return (
		<div className='px-3 py-1'>
			{videoGames.length === 0 && <p>No games added yet...</p>}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly gap-4'>
				{
					videoGames.map((game: VideoGame) => {
						const isOwned = isSelf || loggedUserVideoGames.some(vg => vg.externalId === game.externalId)
						return (
							<VideoGameCard
								key={game.id}
								localId={game.id}
								externalId={game.externalId}
								title={game.title}
								imageUrl={game.image}
								userIsLogged={true}
								isOwned={isOwned}
							/>
						)
					})
				}
			</div>
		</div>
	)
}
