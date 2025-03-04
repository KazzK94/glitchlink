
import { createOrGetVideoGame, getVideoGamesByUser } from '@/services/api/videoGames'
import { type VideoGame } from '@prisma/client'
import { type NextRequest } from 'next/server'
import { addVideoGameToCollection } from '../../../../services/api/videoGames'

import { getServerSession, User } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

// Get all the logged user's games
export async function GET() {
	const session = await getServerSession(authOptions)
	if (!session) {
		return Response.json({ ok: false, message: 'No user logged in.' })
	}

	const user: User = session.user

	const { videoGames } = (await getVideoGamesByUser(user.id)) || { videoGames: [] }
	return Response.json(videoGames)
}

// Add a game to the user's collection (if game is not already in the database, add it)
export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions)
	if (!session) {
		return Response.json({ ok: false, message: 'No user logged in.' })
	}

	const body = await request.json()
	const { externalId, title, description, image, genres, developers, platforms } = body

	const game: VideoGame = await createOrGetVideoGame(
		{ externalId, title, description, image, genres, developers, platforms }
	)

	await addVideoGameToCollection({ videoGameId: game.id })

	return Response.json(game)
}
