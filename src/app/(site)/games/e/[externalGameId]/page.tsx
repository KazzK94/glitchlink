
import { Container } from '@/components/common/Container'
import VideoGameDetailError from '../../error'
import { getGameByIdFromExternalApi, parseExternalGameData } from '@/services/videoGamesExternalApi'
import VideoGameDetail from '@/components/videoGames/VideoGameDetail'
import { getVideoGameByExternalId } from '@/services/videoGames'

export default async function ExternalGameDetailPage({ params }: { params: { externalGameId: string } }) {
	const externalGameId = Number(params.externalGameId)
	const localGameData = await getVideoGameByExternalId(externalGameId, true)

	const externalGameData = localGameData ? null : await getGameByIdFromExternalApi(externalGameId)

	const game = localGameData || parseExternalGameData(externalGameData)
	if (!game) return <VideoGameDetailError />

	return (
		<Container asSection className='pt-3 pb-6'>
			<VideoGameDetail game={game} players={localGameData?.users} />
		</Container>
	)
}

