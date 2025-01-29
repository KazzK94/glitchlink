import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/db'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { GamepadIcon, MessageSquareIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {

	const usersCount = await prisma.user.count()
	const videoGamesCount = await prisma.videoGame.count()
	const postsCount = await prisma.post.count()
	const reportsCount = await prisma.report.count()

	return (
		<>
			<h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Dashboard</h2>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className='bg-gray-200 hover:opacity-95'>
					<Link href="/admin/users">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-base font-medium">Users</CardTitle>
							<UsersIcon className="size-5 text-muted-foreground text-green-800" />
						</CardHeader>
						<CardContent>
							<div className="pl-1 text-3xl font-bold">{usersCount}</div>
						</CardContent>
					</Link>
				</Card>
				<Card className='bg-gray-200 hover:opacity-95'>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-base font-medium">Video Games added</CardTitle>
						<GamepadIcon className="size-5 text-muted-foreground text-purple-800" />
					</CardHeader>
					<CardContent>
						<div className="pl-1 text-3xl font-bold">{videoGamesCount}</div>
					</CardContent>
				</Card>
				<Card className='bg-gray-200 hover:opacity-95'>
					<Link href="/admin/posts">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-base font-medium">Posts</CardTitle>
							<MessageSquareIcon className="size-5 text-muted-foreground text-blue-900" />
						</CardHeader>
						<CardContent>
							<div className="pl-1 text-3xl font-bold">{postsCount}</div>
						</CardContent>
					</Link>
				</Card>
				<Card className='bg-gray-200 hover:opacity-95'>
					<Link href="/admin/reports">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-base font-medium">Reports</CardTitle>
							<ExclamationTriangleIcon className="size-5 text-muted-foreground text-red-800" />
						</CardHeader>
						<CardContent>
							<div className="pl-1 text-3xl font-bold">{reportsCount}</div>
						</CardContent>
					</Link>
				</Card>
			</div>
		</>
	)
}
