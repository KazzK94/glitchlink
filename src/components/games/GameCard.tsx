'use client'

import { Card, CardContent } from "@/components/ui/card"
import { AddGameToCollectionButton } from './AddGameToCollectionButton'

interface GameCardProps {
	externalId: number
	title: string
	imageUrl: string
	isOwned?: boolean
	userIsLogged: boolean
}

export function GameCard({ externalId, title, imageUrl, isOwned = false, userIsLogged }: GameCardProps) {

	const croppedImageUrl = imageUrl.replace('media/', 'media/crop/600/400/')

	return (
		<Card
			className="relative overflow-hidden group h-[260px] md:h-[320px] transition-all duration-200 ease-in-out transform hover:scale-105"
		>
			<img
				src={croppedImageUrl}
				alt={title}
				className="transition-opacity h-full min-w-full object-cover duration-300 ease-in-out group-hover:opacity-90"
			/>
			<CardContent className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
				{/* TODO: Make it be maximum 2 lines (add ellipsis on overflow instead of 3rd line) */}
				{/* Can be tested searching for "Devil May Cry" */}
				<h2 className="text-2xl font-bold text-white text-pretty text-center mb-1 select-none">{title}</h2>

				{
					userIsLogged && !isOwned && <AddGameToCollectionButton externalId={externalId} title={title} />
				}

			</CardContent>
		</Card>
	)
}
