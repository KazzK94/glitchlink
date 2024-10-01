'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export function LogoutButton({ className }: { className?: string }) {

	const handleFormSubmit = async () => {
		console.log('Logout (on server)')
		await signOut()
	}

	return (
		<form action={handleFormSubmit} className={`w-fit ${className}`}>
			<Button type='submit'  variant='outline' className='block text-black mt-4 w-100'>
				Log Out
			</Button>
		</form>
	)
}