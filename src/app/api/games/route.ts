
import { type NextRequest } from 'next/server'
import { getGamesFromApi } from '@/services/gamesApi'

export async function GET(request: NextRequest) {
	// Get the page number from the query params
	const searchParams = request.nextUrl.searchParams
	const page = searchParams.get('page')
	const games = await getGamesFromApi({ page: Number(page || 1) })
	return Response.json({ games })
}
