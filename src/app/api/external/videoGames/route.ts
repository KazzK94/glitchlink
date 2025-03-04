
import { type NextRequest } from 'next/server'
import { getGamesFromExternalApi } from '@/services/api/videoGamesExternalApi'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const search = (searchParams.get('search') || '').trim()
	const page = Number(searchParams.get('page') || 1)

	// Search for games (no search = all games) + paging
	const { games, isLastPage } = await getGamesFromExternalApi({ search, page })
	return Response.json({ games, isLastPage })
}
