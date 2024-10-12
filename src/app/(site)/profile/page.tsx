
import { Container } from '@/components/Container'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// AUTH
import { type User } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/services/nextAuthConfig'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { BookUserIcon, EditIcon, Gamepad2Icon, LogOutIcon, MessageSquareIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getVideoGamesByUser } from '@/services/games'
import { VideoGame } from '@prisma/client'
import { GameCard } from '@/components/games/GameCard'
import prisma from '@/lib/db'

// NextJS force dynamic
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {

	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		redirect('/login')
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id
		}
	})

	if(!user) {
		redirect('/login')
	}


	return (
		<Container asSection className='mt-4 relative'>
			<ProfileHeading user={user} />

			<Tabs defaultValue='games' className='mt-6'>
				<TabsList className='p-1 h-12 grid grid-cols-3 gap-0.5 bg-white/5'>
					<TabsTrigger value='games' className='flex gap-1 items-center h-full'>
						<Gamepad2Icon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>My Video Games</span>
					</TabsTrigger>
					<TabsTrigger value='posts' className='flex gap-1 items-center h-full'>
						<MessageSquareIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>My Posts</span>
					</TabsTrigger>
					<TabsTrigger value='friends' className='flex gap-1 items-center h-full'>
						<BookUserIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>Friends List</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='games'>
					<MyVideoGames />
				</TabsContent>
				<TabsContent value='posts'>
					<MyPosts />
				</TabsContent>
				<TabsContent value='friends'>
					<FriendsList />
				</TabsContent>
			</Tabs>


		</Container>
	)
}

function ProfileHeading({ user }: { user: User }) {
	return (
		<div>

			{/* Buttons */}
			<div className='float-right flex items-center gap-3'>
				<Link href='#' className='flex items-center gap-2 border-2 rounded-lg p-3 text-slate-300 border-slate-300'>
					<EditIcon size={20} />
				</Link>
				<LogoutButton className='flex items-center gap-2 border-2 rounded-lg p-3 text-red-400 border-red-400'>
					<LogOutIcon size={20} />
				</LogoutButton>
			</div>

			{/* Content */}
			<h1 className='text-3xl font-bold' style={{ color: user.color }}>
				{user?.name}
			</h1>
			<h2 className='italic opacity-80 text-base mt-0.5 ml-1'>
				@{user?.username}
			</h2>
		</div>
	)
}

async function MyVideoGames() {
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		redirect('/login')
	}

	const { user } = session

	const { videoGames } = await getVideoGamesByUser(user.id) || { videoGames: [] }

	return (
		<div className='px-3 py-1'>
			{
				videoGames.length === 0 && <p>No games added yet...</p>
			}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-evenly mb-8 gap-4'>
				{
					videoGames.map((game: VideoGame) => (
						<GameCard
							key={game.id}
							externalId={game.externalId}
							title={game.title}
							imageUrl={game.image}
							userIsLogged={true}
							isOwned
						/>
					))
				}
			</div>
			<Link href='/games' className='inline-block mb-4 ml-2'>
				<Button className='text-lg bg-green-700/90 hover:bg-green-600/80' >
					Find{videoGames.length > 0 ? ' more ' : ' '}games
				</Button>
			</Link>
		</div >
	)
}

function MyPosts() {
	return (
		<div className='px-3 py-1'>
			<p>No posts created yet...</p>
		</div>
	)
}

function FriendsList() {
	return (
		<div className='px-3 py-1'>
			<p>YOU HAVE NO FRIENDS YET, LOL!!</p>
			<p>But don&apos;t worry, you can still make some!</p>
			<Link href='/users' className='text-lg p-3 text-amber-200 hover:text-amber-400 mt-4 border border-slate-400 rounded block w-fit'>
				Find new friends now!
			</Link>
		</div>
	)
}