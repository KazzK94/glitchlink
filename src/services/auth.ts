'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

const ADMIN_ID = process.env.ADMIN_ID

export async function getUserFromSession() {
	// Get the session
	const session = await getServerSession(authOptions)
	if (!session) {
		return null
	}
	const { user } = session
	return user
}

export async function isLoggedUserAdmin() {
	const user = await getUserFromSession()
	if (!user) return false
	return user.id === ADMIN_ID
}