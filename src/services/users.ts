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

export async function getUsers({ where }: { where: Prisma.UserWhereInput | null } = { where: null }) {
	return where
		? await prisma.user.findMany({ where, select: { id: true, username: true, name: true, email: true, color: true } })
		: await prisma.user.findMany({ select: { id: true, username: true, name: true, email: true, color: true } })
}

export async function getUser({ where }: { where: Prisma.UserWhereInput }) {
	return await prisma.user.findFirst({ where, select: { id: true, username: true, name: true, email: true, color: true } })
}

export async function getUserById(id: string) {
	return await prisma.user.findUnique({
		where: { id },
		select: { id: true, username: true, name: true, email: true, color: true }
	})
}

export async function getUserByUsername(username: string) {
	return await prisma.user.findUnique({
		where: { usernameLowercase: username.toLowerCase() },
		select: { id: true, username: true, name: true, email: true, color: true }
	})
}
