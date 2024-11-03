'use client'

import { Logo } from '@/components/common/Logo'
import { MenuIcon, HomeIcon, Gamepad2Icon, UserSearch } from 'lucide-react'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function NavbarLinksResponsive() {

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)

	const links = [
		{ href: '/', label: 'Home', icon: <HomeIcon size={20} /> },
		{ href: '/games', label: 'Games', icon: <Gamepad2Icon size={20} /> },
		{ href: '/users', label: 'Find Gamers', icon: <UserSearch size={20} /> },
	]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [rootRef])

	return (
		<div ref={rootRef} className='flex items-center gap-12'>
			<div className="flex items-center gap-3">
				<button
					aria-label='Toggle main menu'
					className="lg:hidden text-white"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<MenuIcon size={32} />
				</button>
				<Link href='/' className="flex items-center gap-1.5">
					<Logo />
					<span className="text-2xl font-bold pt-0.5 sm:pt-0">GlitchLink</span>
				</Link>
			</div>
			<nav className={`flex lg:static w-full absolute top-16 ${isMenuOpen ? 'left-0' : '-left-[100vw] opacity-30'} transition-all duration-500 bg-gray-800 lg:bg-transparent z-50 shadow-sm shadow-white/40 md:shadow-none md:opacity-100`}>
				<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-6 p-4 lg:p-0">
					{links.map(link => (
						<Link key={link.href} href={link.href} className="text-lg flex items-center gap-2 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
							<span>{link.icon}</span>
							{link.label}
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}