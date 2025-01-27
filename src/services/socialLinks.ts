'use server'

import prisma from '@/lib/db'
import { getUserFromSession } from './auth'

export async function sendSocialLinkRequest({ targetUserId }: { targetUserId: string }) {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		// Status defaults to PENDING
		return await prisma.socialLink.create({
			data: {
				userAId: user.id,
				userBId: targetUserId
			}
		})
	} catch (error) {
		console.error('Failed to send social link request:', error)
		throw error
	}
}

export async function acceptSocialLinkRequest(socialLinkId: string) {
	const user = await getUserFromSession()
	if (!user) return null

	try {
		return await prisma.socialLink.update({
			where: { id: socialLinkId, userBId: user.id },
			data: { status: 'FRIENDS' }
		})
	} catch (error) {
		console.error('Failed to accept social link request:', error)
		throw error
	}
}

/** Get self's Social Links */
export async function getSelfSocialLinks() {
	const user = await getUserFromSession()
	if (!user) return null
	try {
		return await prisma.socialLink.findMany({
			where: {
				OR: [
					{ userAId: user.id },
					{ userBId: user.id }
				]
			}
		})
	} catch (error) {
		console.error('Failed to get social links:', error)
		throw error
	}
}

/** Get self's friends list */
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
		return await prisma.socialLink.delete({
			where: {
				id,
				NOT: { status: 'BLOCKED' }, // Prevent deleting when it's a BLOCK (TODO: Check if logged user is blocker, then allow)
				// Can only delete links that you're a part of
				OR: [
					{ userAId: user.id },
					{ userBId: user.id }
				]
			}
		})
	} catch (error) {
		console.error('Failed to delete social link:', error)
		throw error
	}
}