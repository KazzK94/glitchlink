'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'

interface GameCardProps {
	title: string
	imageUrl: string
}

export function GameCard({ title, imageUrl }: GameCardProps) {

	const croppedImageUrl = imageUrl.replace('media/', 'media/crop/600/400/')

	return (
		<Card
			className="relative overflow-hidden group h-[260px] md:h-[320px] transition-all duration-300 ease-in-out transform hover:scale-105"
		>
			<img
				src={croppedImageUrl}
				alt={title}
				className="transition-opacity h-full object-cover duration-300 ease-in-out group-hover:opacity-90"
			/>
			<CardContent className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
				<h2 className="text-2xl font-bold text-white text-pretty text-center mb-1">{title}</h2>
				<Button
					variant='secondary'
					className={`w-full text-sm overflow-hidden invisible h-0 p-0
						transition-all duration-300 ease-in-out 
						group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-1`}
					onClick={() => alert(`Game "${title}" added (nah, not really, TBI)`)}
				>
					Add to my games
				</Button>
			</CardContent>
		</Card>
	)
}
