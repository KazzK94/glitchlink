'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function createUser({ username, password, name, email, color }: Prisma.UserCreateInput) {
	return await prisma.user.create({
		data: {
			email,
			name,
			username,
			password,
			color
		}
	})
}

export async function getUsers({ where }: { where: Prisma.UserWhereInput | null } = { where: null }) {
	return where
		? await prisma.user.findMany({ where })
		: await prisma.user.findMany()
}

export async function getOneUser({ where }: { where: Prisma.UserWhereInput }) {
	return await prisma.user.findFirst({ where })
}

export async function getUserById(id: string) {
	return await prisma.user.findUnique({
		where: { id }
	})
}

export async function getUserByUsername(username: string) {
	return await prisma.user.findFirst({
		where: {
			username: {
				equals: username,
				mode: 'insensitive'
			}
		}
	})
}