
import { getGameByExternalId } from '@/services/games'
import { type NextRequest } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { id: number } }) {
	// Get the game id from the url params
	const gameId = params.id
	const game = await getGameByExternalId(gameId)
	return Response.json({ game })
}
