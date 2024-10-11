'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function SessionValidator({ session }: { session: Session | null }) {
	useEffect(() => {
		async function validateSession() {
			if (!session) return
			if (!session.user) {
				return await signOut()
			}
			// Check if user still exists in the DB
			const res = await fetch('/api/users/me')
			if(!res.ok) {
				return await signOut()
			}
		}
		validateSession()
	}, [session])

	return null
}