'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export async function getUserFromSession() {
	// Get the session
	const session = await getServerSession(authOptions)
	if (!session) {
		throw new Error('You must be signed in to create a post')
	}
	const { user } = session
	return user
}