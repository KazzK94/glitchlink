
import { NextRequest } from 'next/server'
import { markNotificationAsRead } from '@/services/notifications'

export async function PATCH(_request: NextRequest, { params }: { params: { notificationId: string } }) {
	const { notificationId } = params
	const result = await markNotificationAsRead(notificationId)
	return Response.json({ message: 'Notification read', result })
}
