
const BASE_URL = 'https://api.rawg.io/api/games'
const BASE_QUERY_PARAMS = '?key=8941ce3c4a6248cebc73ad45ffc780c2&ordering=-metacritic'

export async function getGamesFromExternalApi({ search = '', page = 1, pageSize = 12 }: { search?: string, page?: number, pageSize?: number } = {}) {
	const response = await fetch(`${BASE_URL}${BASE_QUERY_PARAMS}&page=${page}&page_size=${pageSize}&search=${search}`, {
		next: { revalidate: 3 * 24 * 60 * 60 /* revalidate every 3 days (revalidate in seconds) */ }
	})
	const data = await response.json()
	return data.results
}

export async function getGameByIdFromExternalApi(id: number) {
	const response = await fetch(`${BASE_URL}/${id}${BASE_QUERY_PARAMS}`, {
		next: { revalidate: 3 * 24 * 60 * 60 /* revalidate every 3 days (revalidate in seconds) */ }
	})
	const data = await response.json()
	return data
}
