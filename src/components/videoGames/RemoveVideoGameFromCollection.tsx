'use client'

import { toast } from 'sonner'
import { Button } from '../ui/button'
import { removeVideoGameFromUser } from '@/services/videoGames'
import { useRouter } from 'next/navigation'

export function RemoveGameFromCollectionButton({ title, localId, className }: { title: string, localId: string, className?: string }) {

	const router = useRouter()

	const handleSubmit = async () => {
		if (confirm(`Remove game "${title}" (id: ${localId}) from collection?`)) {
			try {
				await removeVideoGameFromUser({ videoGameId: localId })
				toast.success('Game removed from collection')
				router.refresh()
			} catch (error) {
				console.error('Failed to remove game from collection:', error)
				toast.error('Failed to remove game from collection')
			}
		}
	}

	return (
		<Button
			onClick={handleSubmit}
			variant='secondary'
			className={`w-full text-sm overflow-hidden invisible h-0 p-0 select-none
					bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900
					group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-1
					transition-all duration-300 ease-in-out ${className}
				`}
		>
			Remove from collection
		</Button>
	)
}
