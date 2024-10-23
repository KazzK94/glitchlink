'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'
import { NotificationActionType, NotificationEntityType } from '@prisma/client'

export async function createNotification(
	{ generatedById, targetUserId, entityType, entityId, actionType }
		: { generatedById: string, targetUserId: string, entityType: NotificationEntityType, entityId: string, actionType: NotificationActionType }) {
	try {
		return await prisma.notification.create({
			data: {
				generatedById,
				targetUserId,
				entityType,
				entityId,
				actionType
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
		if (!user) return []
		userId = user.id
	}

	return await prisma.notification.findMany({
		where: { targetUserId: userId },
		include: { generatedBy: true },
		orderBy: { createdAt: 'desc' }
	})
}

export async function getNewNotifications(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if (!user) return []
		userId = user.id
	}

	return await prisma.notification.findMany({
		where: { targetUserId: userId, read: false },
		include: { generatedBy: true },
		orderBy: { createdAt: 'desc' }
	})
}

export async function markNotificationAsRead(notificationId: string) {
	const user = await getUserFromSession()
	if (!user) return null

	return await prisma.notification.update({
		where: { id: notificationId, targetUserId: user.id },
		data: { read: true }
	})
}