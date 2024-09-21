'use client'

import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Menu, User } from 'lucide-react'
import { Logo } from './Logo'
import { Container } from './Container'
import Link from 'next/link'

export function TopNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className="sticky top-0 bg-gray-900 shadow-md shadow-black/20 z-50">
			<Container className='py-4 lg:px-2'>
				<div className="flex justify-between items-center">
					<div className='flex items-center gap-12'>
						<div className="flex items-center gap-4">
							<button
								className="lg:hidden text-white"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<Menu size={32} />
							</button>
							<Link href='/' className="flex items-center space-x-2">
								<Logo />
								<span className="text-2xl font-bold">GlitchLink</span>
							</Link>
						</div>
						<nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-full left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent z-50`}>
							<ul className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-6 p-4 lg:p-0">
								<li><Link href="/" className="text-lg hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
								<li><Link href="/games" className="text-lg hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Games</Link></li>
								<li><Link href="/users" className="text-lg hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Users</Link></li>
							</ul>
						</nav>
					</div>
					<div className="flex items-center">
						<Link href="/login">
							<Button variant="ghost" size="icon" className="rounded-full">
								<User className="h-6 w-6" />
								<span className="sr-only">User account</span>
							</Button>
						</Link>
					</div>
				</div>
			</Container>
		</header>
	)
}