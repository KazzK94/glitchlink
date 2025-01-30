'use client'

import { VideoGameCard } from '@/components/videoGames/VideoGameCard'
import { Button } from '@/components/ui/button'

import { type ExternalVideoGame } from '@/types'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { GameSearchBar } from './VideoGamesSearchBar'

interface UserVideoGame {
	id: string
	externalId: number
	title: string
}

export function GamesList({ userVideoGames = [] }: { userVideoGames?: UserVideoGame[] }) {

	const [games, setGames] = useState<ExternalVideoGame[]>([])
	const [isLastPageReached, setIsLastPageReached] = useState(false)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	const session = useSession()
	const userIsLogged = Boolean(session?.data)

	// On initial render, get first games (no search)
	useEffect(() => {
		async function fetchGames() {
			const response = await fetch('/api/external/videoGames')
			const { games: newGames, isLastPage } = await response.json()
			setGames(newGames.map(getRelevantGameInfo))
			setLoading(false)
			setIsLastPageReached(isLastPage)
		}
		fetchGames()
	}, [])

	// First query or new search:
	async function fetchGamesWithSearch(search: string) {
		setSearch(search)
		setGames([])
		setLoading(true)
		setPage(1)
		const searchUri = search ? `&search=${encodeURIComponent(search)}` : ''
		const response = await fetch('/api/external/videoGames?page=1' + searchUri)
		const { games: newGames, isLastPage } = await response.json()
		setGames(newGames.map(getRelevantGameInfo))
		setLoading(false)
		setIsLastPageReached(isLastPage)
	}

	// On consequent queries (both with or without search):
	async function fetchMoreGames() {
		setLoading(true)
		// Get the next page of games
		const searchUri = search ? `&search=${encodeURIComponent(search)}` : ''
		const response = await fetch('/api/external/videoGames?page=' + (page + 1) + searchUri)
		const { games: newGames, isLastPage } = await response.json()
		setPage((prevPage) => prevPage + 1)
		setGames((prev) => [...prev, ...newGames.map(getRelevantGameInfo)])
		setLoading(false)
		setIsLastPageReached(isLastPage)
	}

	return (
		<>
			<GameSearchBar onSearch={(newSearch) => fetchGamesWithSearch(newSearch)} />

			{
				games.length > 0 && (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly mx-2 mb-8 gap-4'>
						{
							games.map(game => {
								const isOwned = userVideoGames.some(vg => vg.externalId === game.id)
								return (
									<VideoGameCard
										key={game.id}
										className={isOwned ? 'border-2 border-green-600' : ''}
										externalId={game.id}
										title={game.name}
										imageUrl={game.background_image}
										userIsLogged={userIsLogged}
										isOwned={isOwned}
									/>
								)
							})
						}
					</div>
				)
			}

			{/* Text: "Loading Games..." */}
			{loading && <p className='text-xl text-center mt-4'>Loading {games.length !== 0 && 'more'} games...</p>}

			{/* Button: "Show more games" */}
			{!loading && games.length !== 0 && !isLastPageReached && <ButtonShowMoreGames onClick={fetchMoreGames} />}

			{/* Text (credit for Rawg): "Data obtained from RAWG.io's API" */}
			{
				games.length !== 0 && (
					<p className='italic text-center mt-12 mb-8'>
						Data obtained from&nbsp;
						<a className='text-cyan-600' href='https://rawg.io' target='_blank'>RAWG.io&apos;s API</a>.
					</p>
				)
			}

			{games.length === 0 && !loading && (
				<p className='mt-6 text-center text-muted italic'>
					No games were found with that criteria. Try with a different search.
				</p>
			)}

		</>
	)
}

function ButtonShowMoreGames({ onClick }: { onClick: () => void }) {
	return (
		<Button onClick={onClick} className='text-lg flex mx-auto mt-5 p-5' variant='secondary'>
			Show more games
		</Button>
	)
}

function getRelevantGameInfo(game: ExternalVideoGame) {
	return {
		id: game.id,
		name: game.name,
		background_image: game.background_image || '/images/game-placeholder.jpg'
	}
}