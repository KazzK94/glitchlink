
import { type NextRequest } from 'next/server'
import { getUser } from '@/services/users'

// TODO: Restrict this to friends or public profiles only
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	const { userId } = params
	const user = await getUser({ where: { id: userId } })

	return Response.json(user)
}
