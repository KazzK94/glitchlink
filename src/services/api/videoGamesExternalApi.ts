
const BASE_URL = 'https://api.rawg.io/api/games'
const BASE_URL_NO_SEARCH = 'https://rawg.io/api/games/lists/main'
const BASE_QUERY_PARAMS = '?key=8941ce3c4a6248cebc73ad45ffc780c2&ordering=-relevance'

export async function getGamesFromExternalApi({ search = '', page = 1, pageSize = 12 }: { search?: string, page?: number, pageSize?: number } = {}) {
	const baseUrl = search ? BASE_URL : BASE_URL_NO_SEARCH
	const response = await fetch(`${baseUrl}${BASE_QUERY_PARAMS}&page=${page}&page_size=${pageSize}&search=${search}&search_precise=true`, {
		next: { revalidate: 3 * 24 * 60 * 60 /* revalidate every 3 days (revalidate in seconds) */ }
	})
	const data = await response.json()
	return {
		games: data.results,
		isLastPage: data.next === null
	}
}

export async function getGameByIdFromExternalApi(id: number) {
	const response = await fetch(`${BASE_URL}/${id}${BASE_QUERY_PARAMS}`, {
		next: { revalidate: 3 * 24 * 60 * 60 /* revalidate every 3 days (revalidate in seconds) */ }
	})
	const data = await response.json()
	return data
}



export function parseExternalGameData(gameData: {
	id: number,
	name: string,
	background_image: string,
	released: string,
	genres: { name: string }[],
	parent_platforms: { platform: { name: string } }[],
	description_raw: string,
	developers: { name: string }[]
}) {
	return {
		externalId: gameData.id,
		title: gameData.name,
		image: gameData.background_image || '/images/game-placeholder.jpg',
		genres: gameData.genres.map((genre: { name: string }) => genre.name),
		platforms: gameData.parent_platforms.map((platform: { platform: { name: string } }) => platform.platform.name),
		description: gameData.description_raw.split('\n\n')[0],
		developers: gameData.developers.map((developer: { name: string }) => developer.name)
	}
}
