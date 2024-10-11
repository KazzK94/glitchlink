import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/db'
import { GamepadIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
	return (
		<DashboardData /> // All logic is in DashboardMenu.tsx Component (will be moved to page files in the future)F
	)
}

async function DashboardData() {

	const usersCount = await prisma.user.count()
	const videoGamesCount = await prisma.videoGame.count()

	return (
		<>
			<h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Dashboard</h2>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<Link href="/admin/users">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Users</CardTitle>
							<UsersIcon className="size-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{usersCount}</div>
						</CardContent>
					</Link>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Video Games added</CardTitle>
						<GamepadIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{videoGamesCount}</div>
					</CardContent>
				</Card>
			</div>
		</>
	)
}
