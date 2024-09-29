
import { getGameByIdFromApi } from '@/services/gamesApi'
import { type NextRequest } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { id: number } }) {
	// Get the game id from the url params
	const gameId = params.id
	const game = await getGameByIdFromApi(gameId)
	return Response.json({ game })
}
