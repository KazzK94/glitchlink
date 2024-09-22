'use client'

import { Container } from '@/components/Container'
import { GameCard } from '@/components/GameCard'
import { getGamesFromApi } from '@/services/gamesApi'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

interface Game {
	id: number
	name: string
	background_image: string
}

export function GamesGrid() {

	const [games, setGames] = useState<Game[]>([])
	const [page, setPage] = useState(1)

	useEffect(() => {
		async function fetchGames() {
			const games = await getGamesFromApi()
			setGames(games)
		}
		fetchGames()
	}, [])

	async function fetchMoreGames() {
		setPage((prevPage) => prevPage + 1)
		const newGames = await getGamesFromApi({ page: page + 1 })
		setGames((prev) => [...prev, ...newGames])
	}

	return (
		<Container asSection>
			<h1 className='text-3xl mt-4 mb-4'>Games</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly gap-6 md:gap-4'>
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

			{
				games.length !== 0 && (
					<Button className='text-lg flex mx-auto mt-5 p-5' variant='secondary' onClick={() => {
						fetchMoreGames()
					}}>See more games</Button>
				)
			}

			<p className='italic text-center mt-12 mb-8'>
				Data obtained from&nbsp;
				<a className='text-cyan-600' href='https://rawg.io'>RAWG.io&apos;s API</a>.
			</p>
		</Container>
	)
}