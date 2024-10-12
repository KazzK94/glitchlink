
import { type NextRequest } from 'next/server'
import { getUserByUsername } from '@/services/users'

// TODO: Restrict this to friends or public profiles only
export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
	const username = params.username
	const user = await getUserByUsername({ username })

	return Response.json(user)
}
