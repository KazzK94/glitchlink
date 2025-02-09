'use client'

import { Card, CardContent } from "@/components/ui/card"
import { AddGameToCollectionButton } from './AddVideoGameToCollectionButton'
import { RemoveGameFromCollectionButton } from './RemoveVideoGameFromCollection'
import { Button } from '../ui/button'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'

interface VideoGameCardProps {
	localId?: string
	externalId: number
	title: string
	imageUrl: string
	isOwned?: boolean
	userIsLogged: boolean
	className?: string
}

export function VideoGameCard({ localId, externalId, title, imageUrl, isOwned = false, userIsLogged, className }: VideoGameCardProps) {

	const croppedImageUrl = imageUrl.replace('media/', 'media/crop/600/400/')

	const detailUrl = localId ? `/games/${localId}` : `/games/e/${externalId}`

	return (
		<Card
			className={`relative overflow-hidden group h-[260px] md:h-[320px] transition-all duration-200 ease-in-out transform hover:scale-105 ${className}`}
		>
			<img
				src={croppedImageUrl}
				alt={title}
				className="transition h-full min-w-full object-cover duration-300 ease-in-out group-hover:opacity-95 group-hover:saturate-150 bg-gradient-to-br from-black via-slate-700 to-black"
			/>
			<CardContent className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
				<h2 className="text-xl font-bold text-white text-pretty text-center mb-1 select-none">{title}</h2>
				<div className='grid grid-cols-3 justify-center gap-2'>
					{
						userIsLogged && !isOwned && <AddGameToCollectionButton externalId={externalId} title={title} className='col-span-2' />
					}
					{
						userIsLogged && isOwned && localId && <RemoveGameFromCollectionButton localId={localId} title={title} className='col-span-2' />
					}
					<Button asChild variant='secondary' className='w-full text-sm overflow-hidden invisible h-0 p-0 select-none
					group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-1
					transition-all duration-300 ease-in-out bg-black hover:bg-slate-900 border border-white/80 text-white'>
						<Link href={detailUrl}>
							<EyeIcon className='size-6' />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
