import { Container } from '@/components/Container'
import { GamesList } from '@/components/games/GamesList'


export default function GamesPage() {
	return (
		<Container asSection>
			<h1 className='text-3xl mt-4 mb-4'>Games</h1>
			<GamesList />
		</Container>
	)
}