'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export async function getUserFromSession() {
	// Get the session
	const session = await getServerSession(authOptions)
	if (!session) {
		return null
	}
	const { user } = session
	return user
}