
import { getGameByIdFromExternalApi } from '@/services/gamesExternalApi'
import { type NextRequest } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { id: number } }) {
	// Get the game id from the url params
	const gameId = params.id
	const game = await getGameByIdFromExternalApi(gameId)
	return Response.json({ game })
}
