'use client'

import { Menu } from 'lucide-react'
import { Logo } from '@/components/common/Logo'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function NavbarLinksResponsive() {

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/games', label: 'Games' }
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
					className="lg:hidden text-white"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<Menu size={32} />
				</button>
				<Link href='/' className="flex items-center gap-1.5">
					<Logo />
					<span className="text-2xl font-bold pt-1 sm:pt-0">GlitchLink</span>
				</Link>
			</div>
			<nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-full left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent z-50`}>
				<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-6 p-4 lg:p-0">
					{links.map(link => (
						<Link key={link.href} href={link.href} className="text-lg hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
					))}
				</div>
			</nav>
		</div>
	)
}