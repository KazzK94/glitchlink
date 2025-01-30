import { Container } from '@/components/common/Container'
import { GamesList } from '@/components/videoGames/VideoGamesList'


export default function GamesPage() {
	return (
		<Container asSection>
			<GamesList />
		</Container>
	)
}