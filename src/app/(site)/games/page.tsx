import { Container } from '@/components/common/Container'
import { GamesList } from '@/components/videoGames/VideoGamesList'
import { getUserProfile } from '@/services/users'


export default async function GamesPage() {

	const user = await getUserProfile()

	return (
		<Container asSection>
			<GamesList userVideoGames={user?.videoGames} />
		</Container>
	)
}