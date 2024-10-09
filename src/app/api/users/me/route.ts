
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

export async function GET() {
	const session = await getServerSession(authOptions)
	if (!session) {
		return Response.json({ ok: false })
	}

	// TODO (NEXT): Retrieve user from database
	return Response.json({ ok: true, user: session.user })
}
