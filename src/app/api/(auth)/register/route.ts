
import { createUser, getUserByUsername } from '@/services/users'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

	const body = await request.json()
	const { username, password, name, email, color } = body

	// 1. Check if the username is already taken.
	const existingUser = await getUserByUsername(username)
	if (existingUser) {
		return Response.json({ message: 'Username is already taken.' }, { status: 400 })
	}

	// 2. Create the user.
	const user = await createUser({ username, password, name, email, color })

	return Response.json({
		user: {
			id: user.id,
			username: user.username,
			name: user.name,
			email: user.email,
			color: user.color,
			createdAt: user.createdAt
		}
	})

}
