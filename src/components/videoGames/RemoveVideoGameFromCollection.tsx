'use client'

import { toast } from 'sonner'
import { Button } from '../ui/button'
import { removeVideoGameFromUser } from '@/services/videoGames'
import { useRouter } from 'next/navigation'
import { TrashIcon } from 'lucide-react'

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
					group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-2
					transition-all duration-300 ease-in-out 
					border-2 border-red-500 bg-red-300 hover:bg-red-400 text-red-900 hover:text-red-950 ${className}
				`}
		>
			<TrashIcon className='size-5' />
		</Button>
	)
}
