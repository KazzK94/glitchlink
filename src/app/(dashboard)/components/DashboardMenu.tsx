'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BarChart3, Menu, Users, X } from "lucide-react"
import { usePathname } from 'next/navigation'

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
					<Menu className="h-6 w-6" />
				</Button>
			</header>

			{/* Sidebar */}
			<div className={`lg:bg-gray-600/10 shadow-md lg:w-64 lg:flex lg:flex-col ${isSidebarOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
				<div className="p-4 flex justify-between items-center lg:justify-start opacity-0 lg:opacity-100">
					<h1 className="text-2xl font-bold">GlitchLink Admin</h1>
					<Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
						<X className="h-6 w-6" />
					</Button>
				</div>
				<nav className="mt-2 flex flex-col gap-0.5 bg-gray-900 lg:bg-transparent pb-2 fixed top-16 w-full lg:static px-2">
					<DashboardMenuLink
						href="/admin"
						isActive={pathname === '/admin'}
					>
						<BarChart3 className="mr-2 size-5" />
						Dashboard
					</DashboardMenuLink>
					<DashboardMenuLink
						href="/admin/users"
						isActive={pathname === '/admin/users'}
					>
						<Users className="mr-2 size-5" />
						Users
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

