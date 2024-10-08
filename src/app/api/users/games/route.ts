
import { createOrGetVideoGame } from '@/services/games'
import { type VideoGame } from '@prisma/client'
import { type NextRequest } from 'next/server'

// Get all the logged user's games
export function GET() {
	const games: VideoGame[] = []
	return Response.json(games)
}

// Add a game to the user's collection (if game is not already in the database, add it)
export async function POST(request: NextRequest) {

	const body = await request.json()
	const { externalId, title, description, image, genres, developers, platforms } = body

	const game = await createOrGetVideoGame(
		{ externalId, title, description, image, genres, developers, platforms }
	)

	// TODO: Add the game to the user's collection (need to create the relation first)

	return Response.json(game)
}