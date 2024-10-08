
import { attemptLogin } from '@/services/users'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

	const body = await request.json()
	const { username, password } = body

	const user = await attemptLogin(username, password)

	if (!user) {
		return Response.json({ message: 'Incorrect user or password.' }, { status: 403 })
	}

	return Response.json(user)

}
