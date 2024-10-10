'use client'

import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Search, X } from 'lucide-react'

interface GameSearchBarProps {
	className?: string
	onSearch: (search: string) => void
}

export function GameSearchBar({ className, onSearch }: GameSearchBarProps) {

	const [isEmpty, setIsEmpty] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)

	const debouncedSearch = useDebouncedCallback((value) => {
		onSearch(value)
	}, 800)

	function clearSearch() {
		if (inputRef.current) {
			inputRef.current.value = ''
			setIsEmpty(true)
		}
	}

	return (
		<div className='my-4 relative'>
			<input
				className={`w-full border border-gray-300 bg-slate-500/10 px-3 py-2 rounded-lg ${className}`}
				type='text'
				placeholder='Search for games...'
				name='search'
				autoComplete='off'
				ref={inputRef}
				onChange={(e) => debouncedSearch(e.target.value)}
			/>
			<div
				className="absolute right-3 top-1/2 transform -translate-y-1/2"
			>
				{!isEmpty ? (
					<button onClick={clearSearch} className='flex items-center'>
						<X className="h-5 w-5 text-gray-400" />
					</button>
				) : (
					<Search className="h-5 w-5 text-gray-400" />
				)}
			</div>
		</div>
	)
}
