
import "../globals.css"

import { Providers } from '@/components/layout/Providers'
import DashboardMenu from './components/DashboardMenu'
import { getUserFromSession } from '@/services/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

	const user = await getUserFromSession()
	// TODO: Check admin permissions (tho it could be done in middleware for better performance and code organization)
	if(user?.username.toLowerCase() !== 'kazk9') {
		redirect('/login')
	}

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
