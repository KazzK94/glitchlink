
export function parseExternalVideoGameData(gameData: {
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
