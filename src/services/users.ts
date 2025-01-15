'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { getUserFromSession } from './auth'

export async function createUser({ username, password, name, email }: Prisma.UserCreateInput) {

	const existingUser = await getUserByUsername({ username })
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

export async function attemptLogin(username: string, password: string) {
	// We do it manually to retrieve the password too (getUserByUsername doesn't fetch it)
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

export async function getUsers({ where }: { where?: Prisma.UserWhereInput | null } = {}) {
	return where
		? await prisma.user.findMany({ where, select: { id: true, username: true, name: true } })
		: await prisma.user.findMany({ select: { id: true, username: true, name: true } })
}

export async function getUser({ where }: { where: Prisma.UserWhereInput }) {
	return await prisma.user.findFirst({ where })
}

export async function getUserById({ id, isSelf = false }: { id: string, isSelf?: boolean }) {
	return await prisma.user.findUnique({
		where: { id },
		select: { id: true, username: true, name: true, videoGames: true, email: isSelf, createdAt: true, updatedAt: isSelf }
	})
}

export async function getUserByUsername({ username, isSelf = false }: { username: string, isSelf?: boolean }) {
	return await prisma.user.findFirst({
		where: {
			username: { equals: username, mode: 'insensitive' }
		},
		select: { id: true, username: true, name: true, email: isSelf, videoGames: { orderBy: { title: 'asc' } } }
	})
}

/** Get the {amount} most active users (not including self) */
export async function getActiveUsers(amount: number = 3) {
	const user = await getUserFromSession()

	return await prisma.user.findMany({
		where: { id: { not: user?.id } },
		take: amount,
		orderBy: { updatedAt: 'desc' },
		select: { id: true, username: true, name: true, avatar: true }
	})
}
