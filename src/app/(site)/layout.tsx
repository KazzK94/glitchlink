
import type { Metadata } from "next"
import "../globals.css"

import { Providers } from '@/components/common/Providers'
import { TopNavbar } from '@/components/navbar/TopNavbar'

import { Toaster } from 'sonner'

import { getServerSession } from 'next-auth'
import { SessionValidator } from '@/components/auth/SessionValidator'
import { authOptions } from '@/services/nextAuthConfig'

export const metadata: Metadata = {
	title: "GlitchLink - The Social Network for Gamers",
	description: "Find gamers to play with, share your gaming moments, and more!",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.png" sizes="any" />
			</head>
			<body className='bg-gray-900 text-white h-full'>
				<Providers>
					<div className='grid grid-rows-[auto_1fr] h-full'>
						<TopNavbar loggedUserId={session?.user?.id} />
						<main className='overflow-y-scroll [scrollbar-color:rgb(65_120_160)_rgb(40_55_80)]'>
							{children}
						</main>
					</div>
					<SessionValidator session={session} />
				</Providers>
				<Toaster position='bottom-right' richColors closeButton pauseWhenPageIsHidden />
			</body>
		</html>
	)
}
