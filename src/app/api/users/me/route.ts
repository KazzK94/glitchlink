
// import { getUserById } from '@/services/users'
import { getServerSession } from 'next-auth'

export async function GET() {
	const session = await getServerSession()
	if (!session) {
		return Response.json({ ok: false })
	}

	// TODO: Retrieve user from database
	return Response.json({ ok: true, user: session.user })
}
