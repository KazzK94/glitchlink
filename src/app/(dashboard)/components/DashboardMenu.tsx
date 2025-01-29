'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon, BarChart3Icon, UsersIcon, MessageSquareIcon } from "lucide-react"
import { usePathname } from 'next/navigation'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function DashboardMenu() {

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

	const pathname = usePathname()

	return (
		<>
			{/* Mobile Header */}
			<header className="h-16 border-b p-4 flex justify-between items-center lg:hidden">
				<h1 className="text-2xl font-bold">GlitchLink Admin</h1>
				<Button variant="ghost" size="icon" onClick={toggleSidebar}>
					<MenuIcon className="h-6 w-6" />
				</Button>
			</header>

			{/* Sidebar */}
			<div className={`lg:bg-gray-600/10 shadow-md lg:w-64 lg:flex lg:flex-col ${isSidebarOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
				<div className="px-4 py-4 flex justify-between items-center lg:justify-start opacity-0 lg:opacity-100">
					<h1 className="text-2xl font-bold">GlitchLink Admin</h1>
					<Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
						<XIcon className="h-6 w-6" />
					</Button>
				</div>
				<nav className="mt-2  md:mt-0.5 pb-2 flex flex-col gap-0.5 bg-gray-900 lg:bg-transparent fixed top-16 w-full lg:static px-2">
					<DashboardMenuLink
						href="/admin"
						isActive={pathname === '/admin'}
					>
						<BarChart3Icon className="mr-2 size-5" />
						Dashboard
					</DashboardMenuLink>
					<DashboardMenuLink
						href="/admin/users"
						isActive={pathname === '/admin/users'}
					>
						<UsersIcon className="mr-2 size-5" />
						Users
					</DashboardMenuLink>
					<DashboardMenuLink
						href="/admin/posts"
						isActive={pathname === '/admin/posts'}
					>
						<MessageSquareIcon className="mr-2 size-5" />
						Posts
					</DashboardMenuLink>
					<DashboardMenuLink
						href="/admin/reports"
						isActive={pathname === '/admin/reports'}
					>
						<ExclamationTriangleIcon className="mr-2 size-5" />
						Reports
					</DashboardMenuLink>
				</nav>
			</div>
		</>
	)
}

function DashboardMenuLink({ href, isActive, children, className }: { href: string, isActive: boolean, children: React.ReactNode, className?: string }) {
	return (
		<Link
			href={href}
			className={`
				flex items-center p-2 rounded text-lg lg:text-base
				${isActive ? 'bg-gray-100 hover:bg-gray-100 text-black' : 'bg-transparent hover:bg-gray-100/90 hover:text-black'} ${className}`}
		>
			{children}
		</Link>
	)
}

