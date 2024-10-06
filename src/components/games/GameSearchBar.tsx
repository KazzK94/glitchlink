'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface GameSearchBarProps {
	className?: string
	onSearch: (search: string) => void
}


export default function GameSearchBar({ className, onSearch }: GameSearchBarProps) {

	function handleSubmit(formData: FormData) {
		const newSearch = formData.get('search') as string
		onSearch(newSearch)
	}

	return (
		<form action={handleSubmit} className={`flex gap-1 w-full mt-6 mb-6 justify-center ${className}`}>
			<Input
				className='text-lg md:text-base border border-gray-300 bg-slate-500/10 p-3 rounded-lg'
				type='text'
				placeholder='Search for games...'
				name='search'
				autoComplete='off'
			/>
			<Button
				type='submit'
				className='ml-2 text-lg md:text-base'
				variant='secondary'
			>
				Search
			</Button>
		</form>
	)
}