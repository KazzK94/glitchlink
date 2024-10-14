'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

export async function createUser({ username, password, name, email, color }: Omit<Prisma.UserCreateInput, 'usernameLowercase'>) {
	const usernameLowercase = username.toLowerCase()
	const hashedPassword = await bcrypt.hash(password, 10)
	try {
		return await prisma.user.create({
			data: {
				username,
				usernameLowercase,
				password: hashedPassword,
				name,
				email,
				color
			}
		})
	} catch (error) {
		console.error('Failed to create user:', error)
		throw error
	}
}

export async function getUsers({ where }: { where?: Prisma.UserWhereInput | null } = {}) {
	return where
		? await prisma.user.findMany({ where, select: { id: true, username: true, name: true, color: true } })
		: await prisma.user.findMany({ select: { id: true, username: true, name: true, color: true } })
}

export async function getUser({ where }: { where: Prisma.UserWhereInput }) {
	return await prisma.user.findFirst({ where })
}

export async function getUserById({ id, isSelf = false }: { id: string, isSelf?: boolean }) {
	return await prisma.user.findUnique({
		where: { id },
		select: { id: true, username: true, name: true, color: true, videoGames: true, email: isSelf, createdAt: true, updatedAt: isSelf }
	})
}

export async function getUserByUsername({ username, isSelf = false }: { username: string, isSelf?: boolean }) {
	return await prisma.user.findUnique({
		where: { usernameLowercase: username.toLowerCase() },
		select: { id: true, username: true, name: true, color: true, videoGames: true, email: isSelf }
	})
}

export async function attemptLogin(username: string, password: string) {
	const user = await prisma.user.findUnique({ where: { usernameLowercase: username.toLowerCase() } })
	if (!user) return null
	if (!bcrypt.compareSync(password, user.password)) return null
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		color: user.color
	}
}
