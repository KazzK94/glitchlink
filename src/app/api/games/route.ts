
import { type NextRequest } from 'next/server'
import { getGamesBySearch, getGames } from '@/services/games'

export async function GET(request: NextRequest) {
	// Get the page number from the query params
	const searchParams = request.nextUrl.searchParams

	const search = searchParams.get('search')
	const page = searchParams.get('page')

	if (search) {
		// Search for games (paged)
		const games = await getGamesBySearch({ search, page: Number(page || 1) })
		return Response.json({ games })
	} else {
		// Get all games (paged)
		const games = await getGames({ page: Number(page || 1) })
		return Response.json({ games })
	}
}
