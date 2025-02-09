'use client'

import { Logo } from '@/components/common/Logo'
import { MenuIcon, HomeIcon, Gamepad2Icon, UserSearchIcon, MessageSquareIcon } from 'lucide-react'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function NavbarLinksResponsive({ loggedUserId }: { loggedUserId?: string }) {

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)

	const links = [
		{ href: '/', label: 'Home', icon: <HomeIcon size={20} />, public: true },
		{ href: '/games', label: 'Games', icon: <Gamepad2Icon size={20} />, public: true },
		{ href: '/users', label: 'Find Gamers', icon: <UserSearchIcon size={20} />, public: false },
		{ href: '/messages', label: 'Conversations', icon: <MessageSquareIcon size={20} />, public: false }
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
				<Link href='/' className="flex items-center gap-1.5 hover:text-violet-100 hover:scale-105 transition">
					<Logo />
					<span className="text-2xl font-bold pt-0.5 sm:pt-0">GlitchLink</span>
				</Link>
			</div>
			<nav className={`flex lg:static w-full absolute top-16 ${isMenuOpen ? 'left-0' : '-left-[100vw] opacity-30'} transition-all duration-200 bg-gray-800 lg:bg-transparent z-50 shadow-sm shadow-white/40 md:shadow-none md:opacity-100`}>
				<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-6 p-4 lg:p-0">
					{links.map(link => {
						if (!link.public && !loggedUserId) return null
						return (
							<Link key={link.href} href={link.href} className="text-lg flex items-center gap-2 hover:text-blue-400/90 transition-colors" onClick={() => setIsMenuOpen(false)}>
								<span>{link.icon}</span>
								{link.label}
							</Link>
						)
					})}
				</div>
			</nav>
		</div>
	)
}