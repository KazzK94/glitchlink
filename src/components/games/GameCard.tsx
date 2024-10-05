'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface GameCardProps {
	title: string
	imageUrl: string
}

export function GameCard({ title, imageUrl }: GameCardProps) {

	const croppedImageUrl = imageUrl.replace('media/', 'media/crop/600/400/')

	// TODO: Figure out a better way to check if user is logged in (we're running useSession() on every card...)
	const session = useSession()
	const userIsLogged = !!(session?.data)

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
				<h2 className="text-2xl font-bold text-white text-pretty text-center mb-1">{title}</h2>

				{
					userIsLogged && <ButtonAddGameToCollection title={title} />
				}

			</CardContent>
		</Card>
	)
}

function ButtonAddGameToCollection({ title }: { title: string }) {
	return (
		<Button
			variant='secondary'
			className={`w-full text-sm overflow-hidden invisible h-0 p-0
						transition-all duration-300 ease-in-out 
						group-hover:h-9 group-hover:visible group-hover:p-2 group-hover:mt-1`}
			onClick={() => alert(`Game "${title}" added (nah, not really, TBI)`)}
		>
			Add to my games
		</Button>
	)
}