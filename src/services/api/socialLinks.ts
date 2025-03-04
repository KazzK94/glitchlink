'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'
import { createNotification, undoNotification } from './api/notifications'

export async function sendSocialLinkRequest({ targetUserId }: { targetUserId: string }) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		// Status defaults to PENDING
		const result = await prisma.socialLink.create({
			data: {
				userAId: user.id,
				userBId: targetUserId
			}
		})
		await createNotification({
			generatedById: user.id,
			targetUserId,
			entityType: 'SOCIAL_LINK',
			entityId: result.id,
			actionType: 'SOCIAL_LINK_REQUEST'
		})
		return result
	} catch (error) {
		console.error('Failed to send social link request:', error)
		throw error
	}
}

export async function acceptSocialLinkRequest(socialLinkId: string) {
	const user = await getUserFromSession()
	if (!user) return null

	try {
		const result = await prisma.socialLink.update({
			where: { id: socialLinkId, userBId: user.id },
			data: { status: 'FRIENDS' }
		})
		await createNotification({
			generatedById: user.id,
			targetUserId: result.userAId,
			entityType: 'SOCIAL_LINK',
			entityId: result.id,
			actionType: 'SOCIAL_LINK_ACCEPTED'
		})
		return result
	} catch (error) {
		console.error('Failed to accept social link request:', error)
		throw error
	}
}

/** Get logged user's Social Links (either friends or pending requests) */
export async function getSelfSocialLinks() {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		const result = await prisma.socialLink.findMany({
			where: {
				OR: [
					{ userAId: user.id },
					{ userBId: user.id }
				]
			}
		})
		return result
	} catch (error) {
		console.error('Failed to get social links:', error)
		throw error
	}
}

/** Get logged user's friends list */
export async function getFriends(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if (!user) return []
		userId = user.id
	}
	try {
		const result = await prisma.user.findMany({
			where: {
				OR: [
					{
						userAInSocialLinks: {
							some: {
								userBId: userId,
								status: 'FRIENDS'
							}
						}
					},
					{
						userBInSocialLinks: {
							some: {
								userAId: userId,
								status: 'FRIENDS'
							}
						}
					}
				]
			}
		})
		return result || []
	} catch (error) {
		console.error('Failed to get friends:', error)
		throw error
	}
}

/** Delete SocialLink by id */
export async function deleteSocialLink(id: string) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		const result = await prisma.socialLink.delete({
			where: {
				id,
				// Make sure you're a part of the link:
				OR: [
					{ userAId: user.id },
					{ userBId: user.id }
				],
				// Only userA (the blocker) can delete a BLOCKED link:
				NOT: {
					AND: [
						{ userAId: { not: user.id } },
						{ status: 'BLOCKED' }
					]
				}
			}
		})
		undoNotification({
			entityType: 'SOCIAL_LINK',
			entityId: id,
			targetUserId: result.userBId
		})
		return result
	} catch (error) {
		console.error('Failed to delete social link:', error)
		throw error
	}
}
