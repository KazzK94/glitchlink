import { Container } from '@/components/Container'
import { GameCard } from '@/components/GameCard'

interface Game {
	id: number
	name: string
	background_image: string
}

export default function GamesPage() {

	// TODO: Fetch games from the API
	// https://api.rawg.io/api/games?key=8941ce3c4a6248cebc73ad45ffc780c2

	const games: Game[] = [
		{
			id: 3498,
			name: 'Grand Theft Auto V',
			background_image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
		},
		{
			id: 3328,
			name: 'The Witcher 3: Wild Hunt',
			background_image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
		},
		{
			id: 4200,
			name: "Portal 2",
			background_image: "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg"
		},
		{
			id: 28,
			name: 'Red Dead Redemption 2',
			background_image: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg'
		}
	]

	return (
		<Container asSection>
			<h1 className='text-3xl mt-4 mb-4'>Games</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly gap-6 md:gap-4'>
				{
					games.map(game => (
						<GameCard
							key={game.id}
							title={game.name}
							imageUrl={game.background_image}
						/>
					))
				}
			</div>
			<p className='text-lg text-center my-8'>
				Data obtained from the API in&nbsp;
				<a className='text-cyan-600' href='https://rawg.io'>RAWG.io</a>
			</p>
		</Container>
	)
}