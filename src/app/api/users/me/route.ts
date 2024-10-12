
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

import { getUserById } from '@/services/users'

export async function GET() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user || !session.user.id) {
		return Response.json({ ok: false }, { status: 403 })
	}

	const user = await getUserById({ id: session.user.id, isSelf: true })

	if (!user) {
		return Response.json({ ok: false }, { status: 403 })
	}

	return Response.json({ ok: true, user })
}
