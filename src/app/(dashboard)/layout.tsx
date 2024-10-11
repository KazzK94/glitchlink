

import "../globals.css"

import { Providers } from '@/components/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'
import DashboardMenu from './components/DashboardMenu'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

	const session = await getServerSession(authOptions)
	// TODO: Check admin permissions (tho it could be done in middleware for better performance and code organization)
	console.log({ user: session?.user })

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.png" sizes="any" />
			</head>
			<body className='bg-gray-900 text-white'>
				<Providers>
					<div className="flex flex-col h-screen lg:flex-row">
						<DashboardMenu />
						<div className="flex-1 p-4 lg:p-8 overflow-auto">
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
