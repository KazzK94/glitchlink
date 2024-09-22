'use client'

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from './ui/button'

interface GameCardProps {
	title: string
	imageUrl: string
}

export function GameCard({ title, imageUrl }: GameCardProps) {
	return (
		<Card
			className="relative overflow-hidden group h-[400px] transition-all duration-300 ease-in-out transform hover:scale-105"
		>
			<Image
				src={imageUrl.replace('media/', 'media/crop/600/400/')}
				alt={title}
				fill
				sizes='600px'
				className="transition-opacity object-cover duration-300 ease-in-out group-hover:opacity-80"
			/>
			<CardContent className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
				<h2 className="text-2xl font-bold text-white text-pretty text-center mb-2">{title}</h2>
				<Button
					variant='secondary'
					className={`w-full text-sm overflow-hidden transition-all duration-300 ease-in-out 
						max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 -mb-5 group-hover:mb-0 group-hover:mt-1`}
					onClick={() => alert(`Game "${title}" added (nah, not really, TBI)`)}
				>
					Add to my games
				</Button>
			</CardContent>
		</Card>
	)
}