'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from '../auth'
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

export async function deleteNotification(notificationId: string) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		return await prisma.notification.delete({
			where: { id: notificationId, targetUserId: user.id }
		})
	} catch (error) {
		console.error('Failed to delete the notification:', error)
		throw error
	}
}

export async function undoNotification(where: { targetUserId: string, entityType: NotificationEntityType, entityId: string }) {
	if (!where.targetUserId || !where.entityType || !where.entityId) return null
	const user = await getUserFromSession()
	if (!user) return null
	// (We use deleteMany due to Notification format in Prisma, but we intend to delete only one notification)
	// TODO: Consider if we should find the notification first, then delete it with the ID
	return await prisma.notification.deleteMany({
		where: { generatedById: user.id, ...where }
	})
}