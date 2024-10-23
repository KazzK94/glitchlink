
import { createUser } from '@/services/users'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

	const body = await request.json()
	const { username, password, name, email } = body

	try {
		const user = await createUser({ username, password, name, email })
		return Response.json({
			id: user.id,
			username: user.username,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt
		})
	} catch (error) {
		Response.json({ message: 'Error creating user.', error }, { status: 400 })
	}
}
