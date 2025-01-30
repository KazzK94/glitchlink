import { Container } from '@/components/common/Container'
import { GamesList } from '@/components/games/VideoGamesList'


export default function GamesPage() {
	return (
		<Container asSection>
			<GamesList />
		</Container>
	)
}