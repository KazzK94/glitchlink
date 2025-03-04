
import { getVideoGameByIdFromExternalApi } from '@/services/api/videoGamesExternalApi'
import { type NextRequest } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { gameId: number } }) {
	const { gameId } = params
	const game = await getVideoGameByIdFromExternalApi(gameId)
	return Response.json(game)
}
