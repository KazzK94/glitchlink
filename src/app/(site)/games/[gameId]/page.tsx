import { Container } from '@/components/common/Container'
import { getVideoGameById } from '@/services/api/videoGames'

import VideoGameDetailError from '../error'
import VideoGameDetail from '@/components/videoGames/VideoGameDetail'

export default async function LocalGameDetailPage({ params }: { params: { gameId: string } }) {
	const gameId = params.gameId
	const game = await getVideoGameById(gameId, true)
	if (!game) return <VideoGameDetailError />

	return (
		<Container asSection className='pt-3 pb-6'>
			<VideoGameDetail game={game} players={game.users} />
		</Container>
	)

}