
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'
import prisma from '@/lib/db'

export async function GET() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user || !session.user.id) {
		return Response.json({ ok: false }, { status: 403 })
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
		select: {
			id: true,
			username: true,
			email: true,
			color: true,
			createdAt: true,
			updatedAt: true
		}
	})

	if (!user) {
		return Response.json({ ok: false }, { status: 403 })
	}

	return Response.json({ ok: true, user })
}
