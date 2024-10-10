import { Container } from '@/components/Container'
import { GamesList } from '@/components/games/GamesList'


export default function GamesPage() {
	return (
		<Container asSection>
			<GamesList />
		</Container>
	)
}