'use server'

import prisma from '@/lib/db'
import { Prisma, SocialLinkStatus } from '@prisma/client'
import bcrypt from 'bcrypt'
import { getUserFromSession } from './auth'
import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'

/** Attempts to create a user in the DB, or throws an error in case it cannot create it */
export async function createUser({ username, password, name, email }: Prisma.UserCreateInput) {
	const existingUser = await getUser({ where: { username: { equals: username, mode: 'insensitive' } } })
	if (existingUser) throw new Error('Username is already taken.')
	const hashedPassword = await bcrypt.hash(password, 10)
	try {
		return await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
				name,
				email
			}
		})
	} catch (error) {
		console.error('Failed to create user:', error)
		throw error
	}
}

/** Attempts to Log In, or returns null in case the login is incorrect */
export async function attemptLogin(username: string, password: string) {
	// We do the findFirst manually to retrieve the password too
	const user = await prisma.user.findFirst({
		where: { username: { equals: username, mode: 'insensitive' } }
	})
	if (!user) return null
	if (!bcrypt.compareSync(password, user.password)) return null

	return {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		avatar: user.avatar
	}
}

export async function updateUser({ data }: { data: Prisma.UserUpdateInput }) {
	const user = await getUserFromSession()
	if (!user) throw new Error('No user logged.')

	return await prisma.user.update({
		where: { id: user.id },
		data
	})

}

export async function changePassword({ username, password, newPassword }: { username: string, password: string, newPassword: string }) {
	const user = await attemptLogin(username, password)
	if (!user) throw new Error('Incorrect username or password.')

	const hashedPassword = await bcrypt.hash(newPassword, 10)
	return await prisma.user.update({
		where: { id: user.id },
		data: { password: hashedPassword }
	})
}

/** 
 * Get the basic information of a user (id, name, username and avatar) 
 * @returns UserPublicInfo (id, name, username, avatar) | null
 * */
export async function getUser({ username, where }: { username: string, where?: Prisma.UserWhereInput } | { username?: string, where: Prisma.UserWhereInput }) {
	if (!username && !where) return null
	if (!where) where = {}
	if (username) where.username = { equals: username, mode: 'insensitive' }
	return await prisma.user.findFirst({
		where,
		select: { id: true, username: true, name: true, avatar: true }
	})
}

/** Get a list of users (basic information only) matching the {where} conditions. */
export async function getUsers({ where }: { where?: Prisma.UserWhereInput | null } = {}) {
	return where
		? await prisma.user.findMany({ where, select: { id: true, username: true, name: true, avatar: true } })
		: await prisma.user.findMany({ select: { id: true, username: true, name: true, avatar: true } })
}

/** Get the Profile information of a user (basic information + posts, games, friends...) */
export async function getUserProfile({ userId, username }: { userId?: string, username?: string } = {}) {

	const loggedUser = await getUserFromSession()
	if (!userId && !username) {
		if (!loggedUser) return null
		userId = loggedUser.id
	}

	const isSelf = loggedUser?.id === userId
	const key = userId ? 'id' : 'username'

	const whereOptions = {
		[key]: userId || username
	} as { id: string } | { username: string }

	const foundUser = await prisma.user.findUnique({
		where: whereOptions,
		select: {
			id: true, username: true, name: true, avatar: true, email: isSelf,
			videoGames: { orderBy: { title: 'asc' } },
			posts: {
				include: {
					author: true, likedBy: true,
					comments: {
						include: { author: true },
						orderBy: { createdAt: 'asc' }
					}
				},
				orderBy: { createdAt: 'desc' }
			},
			userAInSocialLinks: {
				// Where it's the logged user (regardless of status) or any user, only show FRIENDS
				where: { OR: [{ status: 'FRIENDS' }, { userAId: loggedUser?.id }, { userBId: loggedUser?.id }] },
				select: {
					id: true, status: true,
					userA: { select: { id: true, username: true, name: true, avatar: true } },
					userB: { select: { id: true, username: true, name: true, avatar: true } }
				}
			},
			userBInSocialLinks: {
				// Where it's the logged user (regardless of status) or any user, only show FRIENDS
				where: { OR: [{ status: 'FRIENDS' }, { userAId: loggedUser?.id }, { userBId: loggedUser?.id }] },
				select: {
					id: true, status: true,
					userA: { select: { id: true, username: true, name: true, avatar: true } },
					userB: { select: { id: true, username: true, name: true, avatar: true } }
				}
			}
		}
	})

	if (!foundUser) throw new Error('User not found.')

	const socialLinks = [
		...foundUser.userAInSocialLinks.map(data => {
			return parseSocialLink({ data, targetUserId: foundUser?.id })
			/* const { userA, userB } = data
			const loggedUserLetter: 'A' | 'B' = userA.id === loggedUser?.id ? 'A' : 'B'
			return {
				user: (loggedUserLetter === 'A' ? userB : userA),
				id: data.id,
				status: parseSocialLinkStatus(data.status, loggedUserLetter)
			} */
		}),
		...foundUser.userBInSocialLinks.map(data => {
			return parseSocialLink({ data, targetUserId: foundUser?.id })
			/* const { userA, userB } = data
			const loggedUserLetter: 'A' | 'B' = userA.id === loggedUser?.id ? 'A' : 'B'
			return {
				user: (loggedUserLetter === 'A' ? userB : userA),
				id: data.id,
				status: parseSocialLinkStatus(data.status, loggedUserLetter)
			} */
		})
	]

	return {
		...foundUser,
		socialLinks
	}
}

/** Get the `amount` most active users (not including self) */
export async function getActiveUsers(amount: number = 3) {
	const loggedUser = await getUserFromSession()
	const users = await prisma.user.findMany({
		where: { id: { not: loggedUser?.id } },
		take: amount,
		orderBy: { updatedAt: 'desc' },
		select: {
			id: true, username: true, name: true, avatar: true,
			userAInSocialLinks: {
				where: { userBId: loggedUser?.id },
				select: {
					id: true, status: true, userB: { select: { id: true, username: true, name: true, avatar: true } }
				}
			},
			userBInSocialLinks: {
				where: { userAId: loggedUser?.id },
				select: {
					id: true, status: true, userA: { select: { id: true, username: true, name: true, avatar: true } }
				}
			}
		}
	})


	return users.map(user => {
		const socialLinks = [
			...user.userAInSocialLinks.map(data => ({ user, id: data.id, status: parseSocialLinkStatus(data.status, 'B') })),
			...user.userBInSocialLinks.map(data => ({ user, id: data.id, status: parseSocialLinkStatus(data.status, 'A') }))
		]
		return {
			...user,
			socialLink: socialLinks[0]
		}
	})
}


// Helpers:

function parseSocialLink({ data, targetUserId }: { data: { id: string, status: SocialLinkStatus, userA: UserPublicInfo, userB: UserPublicInfo }, targetUserId?: string }) {
	const { userA, userB } = data
	const loggedUserLetter: 'A' | 'B' = userA.id === targetUserId ? 'A' : 'B'
	return {
		user: (loggedUserLetter === 'A' ? userB : userA),
		id: data.id,
		status: parseSocialLinkStatus(data.status, loggedUserLetter)
	}
}

/** Parse the SocialLinkStatus of a social link to SocialLinkDetailedStatus */
function parseSocialLinkStatus(status: SocialLinkStatus, loggedUserLetter: 'A' | 'B'): SocialLinkDetailedStatus {
	return status === 'PENDING'
		? loggedUserLetter === 'A' ? 'SENT_PENDING' : 'RECEIVED_PENDING'
		: status
}