
import { type NextRequest } from 'next/server'
import { getGamesBySearchFromApi, getGamesFromApi } from '@/services/gamesApi'

export async function GET(request: NextRequest) {
	// Get the page number from the query params
	const searchParams = request.nextUrl.searchParams

	const search = searchParams.get('search')
	const page = searchParams.get('page')

	if (search) {
		// Search for games (paged)
		const games = await getGamesBySearchFromApi({ search, page: Number(page || 1) })
		return Response.json({ games })
	} else {
		// Get all games (paged)
		const games = await getGamesFromApi({ page: Number(page || 1) })
		return Response.json({ games })
	}
}
