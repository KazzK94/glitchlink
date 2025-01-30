'use client'

import { Card, CardContent } from "@/components/ui/card"
import { AddGameToCollectionButton } from './AddVideoGameToCollectionButton'
import { RemoveGameFromCollectionButton } from './RemoveVideoGameFromCollection'

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
				{
					userIsLogged && !isOwned && <AddGameToCollectionButton externalId={externalId} title={title} />
				}
				{
					userIsLogged && isOwned && localId && <RemoveGameFromCollectionButton localId={localId} title={title} />
				}

			</CardContent>
		</Card>
	)
}
