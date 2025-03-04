
import { getUserFromSession } from '@/services/auth'

import { getUserProfile } from '@/services/api/users'

export async function GET() {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) {
		return Response.json({ ok: false }, { status: 403 })
	}

	const user = await getUserProfile({ userId: loggedUser.id })

	if (!user) {
		return Response.json({ ok: false }, { status: 403 })
	}

	return Response.json({ ok: true, user })
}
