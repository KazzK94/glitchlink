'use client'

import { ModalOpener } from '@/components/common/Modal'
import { Button } from '../ui/button'
import { getGameByIdFromExternalApi } from '@/services/gamesExternalApi'
import { useState } from 'react'

export function AddGameToCollectionButton({ id, title, className }: { id: number, title: string, className?: string }) {

	// id is the ID of the game in the rawg.io API

	const [isGameAdded, setIsGameAdded] = useState(false)

	const handleSubmit = async () => {
		// Here you could make a request to your API to add the game to the user's collection
		// For now, we're just showing an alert
		const gameData = await getGameByIdFromExternalApi(id)

		if (!gameData) return alert('Error adding game to collection. If this error persists please contact an administrator.')

		const parsedGameData = {
			externalId: gameData.id,
			name: gameData.name,
			image: gameData.background_image,
			releaseDate: gameData.released,
			genres: gameData.genres.map((genre: { name: string }) => genre.name),
			platforms: gameData.platforms.map((platform: { platform: { name: string } }) => platform.platform.name),
			summary: gameData.description_raw.split('\n\n')[0],
			developers: gameData.developers.map((developer: { name: string }) => developer.name)
		}

		console.log(parsedGameData)
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
