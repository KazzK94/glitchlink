import type { Metadata } from "next"
import "./globals.css"
import { TopNavbar } from '@/components/common/TopNavbar'

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
			<head>
				<link rel="icon" href="/icon.png" sizes="any" />
			</head>
			<body className='bg-gray-900 text-white'>
				<TopNavbar />
				{children}
			</body>
		</html>
	)
}
