import type { Metadata } from "next"
import "./globals.css"
import { TopNavbar } from '@/components/TopNavbar'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
	title: "GlitchLink - The Social Network for Gamers",
	description: "Find gamers to play with, share your gaming moments, and more!",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className='bg-gray-900 text-white'>
				<TopNavbar />
				{children}
			</body>
		</html>
	)
}
