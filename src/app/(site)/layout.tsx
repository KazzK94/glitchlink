
import type { Metadata } from "next"
import "../globals.css"

import { Providers } from '@/components/layout/Providers'
import { TopNavbar } from '@/components/layout/navbar/TopNavbar'

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
			<body className='bg-gray-900 text-white'>
				<Providers>
					<TopNavbar />
					{children}

					<SessionValidator session={session} />
				</Providers>
			</body>
		</html>
	)
}
