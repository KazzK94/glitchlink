'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function SessionValidator({ session }: { session: Session }) {

	useEffect(() => {
		async function validateSession() {
			if (!session?.user) {
				await signOut()
			}
			// TODO: Check if user still exists in the DB
		}
		validateSession()
	}, [session])

	return null
}