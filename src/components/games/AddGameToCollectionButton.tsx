'use client'

import { ModalOpener } from '@/components/common/Modal'
import { Button } from '../ui/button'
import { useState } from 'react'

export function AddGameToCollectionButton({ externalId, title, className }: { externalId: number, title: string, className?: string }) {

	// externalId is the ID of the game in the rawg.io API

	const [isGameAdded, setIsGameAdded] = useState(false)

	const handleSubmit = async () => {
		if (isGameAdded) return

		// Here you could make a request to your API to add the game to the user's collection
		// For now, we're just showing an alert
		const gameData = await fetch('/api/external/games/' + externalId).then(res => res.json())

		if (!gameData) return alert('Error adding game to collection. If this error persists please contact an administrator.')

		const parsedGameData = parseGameData(gameData)

		// make a request to  API to add the game to the user's collection
		const insertedGame = await fetch('/api/users/games', {
			method: 'POST',
			body: JSON.stringify(parsedGameData),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())

		console.log({ insertedGame })

		setIsGameAdded(true)
	}

	return (
		<ModalOpener
			modalTitle={title}
			modalContent={
				(!isGameAdded)
					? `Do you want to add "${title}" to your collection?`
					: `"${title}" is now in your collection!`
			}
			onConfirm={handleSubmit}
			closeOnConfirm={isGameAdded}
			confirmText={isGameAdded ? 'Okay' : 'Add to collection'}
			showCancelButton={!isGameAdded}
		>
			<Button
				variant='secondary'
				className={`w-full text-sm overflow-hidden invisible h-0 p-0 select-none
					group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-1
					transition-all duration-300 ease-in-out ${className}
				`}
			>
				Add to my games
			</Button>
		</ModalOpener>
	)
}

function parseGameData(gameData: {
	id: number, 
	name: string,
	background_image: string,
	released: string,
	genres: { name: string }[],
	parent_platforms: { platform: { name: string } }[],
	description_raw: string,
	developers: { name: string }[]
}) {
	console.log({ gameData })
	return {
		externalId: gameData.id,
		title: gameData.name,
		image: gameData.background_image,
		genres: gameData.genres.map((genre: { name: string }) => genre.name),
		platforms: gameData.parent_platforms.map((platform: { platform: { name: string } }) => platform.platform.name),
		description: gameData.description_raw.split('\n\n')[0],
		developers: gameData.developers.map((developer: { name: string }) => developer.name)
	}
}
