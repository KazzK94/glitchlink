
import { type NextRequest } from 'next/server'
import { getUserById } from '@/services/users'

// TODO: Restrict this to friends or public profiles only
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const userId = params.id
	const user = await getUserById({ id: userId })

	return Response.json(user)
}
