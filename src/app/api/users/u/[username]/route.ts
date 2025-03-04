
import { type NextRequest } from 'next/server'
import { getUser } from '@/services/api/users'

// TODO: Restrict this to friends or public profiles only
export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
	const username = params.username
	const user = await getUser({ username })

	return Response.json(user)
}
