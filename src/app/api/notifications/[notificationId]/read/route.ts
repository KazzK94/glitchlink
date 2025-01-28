
import { markNotificationAsRead } from '@/services/notifications'
import { NextRequest } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { notificationId: string } }) {
	const { notificationId } = params
	const result = await markNotificationAsRead(notificationId)
	return Response.json({ message: 'Notification read', result })
}
