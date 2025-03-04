
import { NextRequest } from 'next/server'
import { deleteNotification } from '@/services/api/notifications'

export async function DELETE(_request: NextRequest, { params }: { params: { notificationId: string } }) {
	const { notificationId } = params
	// The deleteNotification() function already checks if the user is the receiver of the post
	const result = await deleteNotification(notificationId)
	return Response.json({ message: 'Notification deleted successfully', result })
}
