
export async function getGamesFromApi({ page = 1, pageSize = 12 }: { page?: number, pageSize?: number } = {}) {
	const response = await fetch(`https://api.rawg.io/api/games?key=8941ce3c4a6248cebc73ad45ffc780c2&page=${page}&page_size=${pageSize}`, {
		cache: 'force-cache'
	})
	const data = await response.json()
	return data.results
}

export async function getGameByIdFromApi(id: number) {
	const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8941ce3c4a6248cebc73ad45ffc780c2`, {
		cache: 'force-cache'
	})
	const data = await response.json()
	return data
}

export async function getGamesBySearchFromApi({ search = '', page = 1, pageSize = 12 }) {
	const response = await fetch(`https://api.rawg.io/api/games?key=8941ce3c4a6248cebc73ad45ffc780c2&page=${page}&page_size=${pageSize}&search=${search}`, {
		cache: 'force-cache'
	})
	const data = await response.json()
	return data.results
}