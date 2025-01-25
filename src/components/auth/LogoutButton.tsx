'use client'

import { signOut } from 'next-auth/react'

export function LogoutButton({ className, formClassName, children }: { className?: string, formClassName?: string, children?: React.ReactNode }) {

	const handleFormSubmit = async () => {
		await signOut()
	}

	return (
		<form action={handleFormSubmit} className={`w-fit ${formClassName}`}>
			<button type='submit' className={`text-inherit ${className}`}>
				{children}
			</button>
		</form>
	)
}