'use client'

import { GameCard } from '@/components/games/GameCard'
import { Button } from '@/components/ui/button'

import { type Game } from '@/types'

import { useEffect, useState } from 'react'



export function GamesList() {

	const [games, setGames] = useState<Game[]>([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)

	// On initial render:
	useEffect(() => {
		async function fetchGames() {
			// TODO: Add try-catch block
			const response = await fetch('/api/games')
			const { games: newGames } = await response.json()
			setGames(newGames)
		}
		fetchGames()
		setLoading(false)
	}, [])

	// On consequent queries, execute this:
	async function fetchMoreGames() {
		setLoading(true)
		// TODO: Add try-catch block
		// Get the next page of games
		const response = await fetch('/api/games?page=' + (page + 1))
		const { games: newGames } = await response.json()
		setPage((prevPage) => prevPage + 1)
		setGames((prev) => [...prev, ...newGames])
		setLoading(false)
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly mb-8 gap-4'>
				{
					games.map(game => (
						<GameCard
							key={game.id}
							title={game.name}
							imageUrl={game.background_image}
						/>
					))
				}
			</div>

			{loading && <p className='text-xl text-center mt-4'>Loading {games.length !== 0 && 'more'} games...</p>}

			{
				!loading && games.length !== 0 && (
					<>
						<Button className='text-lg flex mx-auto mt-5 p-5' variant='secondary' onClick={() => {
							fetchMoreGames()
						}}>
							See more games
						</Button>
					</>
				)
			}

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