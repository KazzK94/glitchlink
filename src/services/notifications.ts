'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'

export async function createNotification({ type, userId, message, targetUrl }: { type: string, userId: string, message: string, targetUrl: string }) {
	try {

		const existingNotification = await prisma.notification.findFirst({
			where: { type, userId, message, targetUrl }
		})

		if(existingNotification) return existingNotification

		return await prisma.notification.create({
			data: {
				type,
				message,
				targetUrl,
				user: {
					connect: { id: userId }
				}
			}
		})
	} catch (error) {
		console.error('Failed to create the notification:', error)
		throw error
	}
}

export async function getNotifications(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if(!user) return []
		userId = user.id
	}

	return await prisma.notification.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' }
	})
}

export async function getNewNotifications(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if(!user) return []
		userId = user.id
	}

	return await prisma.notification.findMany({
		where: { userId, read: false },
		orderBy: { createdAt: 'desc' }
	})
}

export async function markNotificationAsRead(notificationId: string) {
	const user = await getUserFromSession()
	if(!user) return null

	return await prisma.notification.update({
		where: { id: notificationId, userId: user.id },
		data: { read: true }
	})
}