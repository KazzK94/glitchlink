'use client'

import { ModalOpener } from '@/components/common/Modal'
import { Button } from '../ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CopyPlusIcon } from 'lucide-react'

import { parseExternalGameData } from '@/services/api/videoGamesExternalApi'

export function AddGameToCollectionButton({ externalId, title, className }: { externalId: number, title: string, className?: string }) {

	// externalId is the ID of the game in the rawg.io API

	const [isGameAdded, setIsGameAdded] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async () => {
		if (isGameAdded) return

		try {
			setIsLoading(true)
			// Make a request to your API to add the game to the user's collection
			const gameData = await fetch('/api/external/videoGames/' + externalId).then(res => res.json())
			if (!gameData) { throw new Error('Error adding game to collection.') }

			const parsedGameData = parseExternalGameData(gameData)

			// make a request to  API to add the game to the user's collection
			await fetch('/api/users/videoGames', {
				method: 'POST',
				body: JSON.stringify(parsedGameData),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			setIsGameAdded(true)
			router.refresh()
			toast.success(`"${title}" has been added to your collection!`)
		} catch (error) {
			console.error(error)
			toast.error('Error adding game to collection. If this error persists please contact an administrator.')
		} finally {
			setIsLoading(false)
		}
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
			closeOnConfirm
			confirmText={isLoading ? 'Adding to collection...' : 'Add game to collection'}
			showCancelButton
			disableConfirmButton={isLoading}
			disableCancelButton={isLoading}
		>
			<Button
				variant='secondary'
				className={`w-full text-sm overflow-hidden invisible h-0 p-0 select-none
					group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-2
					transition-all duration-300 ease-in-out
					border-2 border-green-400 bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900
					${className}
				`}
			>
				<CopyPlusIcon className='size-5 -scale-x-100' />
			</Button>
		</ModalOpener>
	)
}
