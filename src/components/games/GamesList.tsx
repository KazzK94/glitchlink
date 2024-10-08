'use client'

import { GameCard } from '@/components/games/GameCard'
import { Button } from '@/components/ui/button'

import { type Game } from '@/types'

import { useEffect, useState } from 'react'
import GameSearchBar from './GameSearchBar'

export function GamesList() {

	const [games, setGames] = useState<Game[]>([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	// On initial render, get first games (no search)
	useEffect(() => {
		async function fetchGames() {
			const response = await fetch('/api/games')
			const { games: newGames } = await response.json()
			setGames(newGames.map(getRelevantGameInfo))
			setLoading(false)
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
		const response = await fetch('/api/games?page=1' + searchUri)
		const { games: newGames } = await response.json()
		setGames(newGames.map(getRelevantGameInfo))
		setLoading(false)
	}

	// On consequent queries (both with or without search):
	async function fetchMoreGames() {
		setLoading(true)
		// Get the next page of games
		const searchUri = search ? `&search=${encodeURIComponent(search)}` : ''
		const response = await fetch('/api/games?page=' + (page + 1) + searchUri)
		const { games: newGames } = await response.json()
		setPage((prevPage) => prevPage + 1)
		setGames((prev) => [...prev, ...newGames.map(getRelevantGameInfo)])
		setLoading(false)
	}

	return (
		<>
			<GameSearchBar onSearch={(newSearch) => fetchGamesWithSearch(newSearch)} />

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly mb-8 gap-4'>
				{
					games.map(game => (
						<GameCard
							key={game.id}
							id={game.id}
							title={game.name}
							imageUrl={game.background_image}
						/>
					))
				}
			</div>

			{/* Text: "Loading Games..." */}
			{loading && <p className='text-xl text-center mt-4'>Loading {games.length !== 0 && 'more'} games...</p>}

			{/* Button: "Show more games" */}
			{!loading && games.length !== 0 && <ButtonShowMoreGames onClick={fetchMoreGames} />}

			{/* Text (credit for Rawg): "Data obtained from RAWG.io's API" */}
			{
				games.length !== 0 && (
					<p className='italic text-center mt-12 mb-8'>
						Data obtained from&nbsp;
						<a className='text-cyan-600' href='https://rawg.io'>RAWG.io&apos;s API</a>.
					</p>
				)
			}

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

function getRelevantGameInfo(game: Game) {
	return {
		id: game.id,
		name: game.name,
		background_image: game.background_image || '/images/game_placeholder.png'
	}
}