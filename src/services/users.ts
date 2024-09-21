'use server'

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

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

export async function getUsers() {
	return await prisma.user.findMany()
}

export async function getUser(id: string) {
	return await prisma.user.findUnique({
		where: { id }
	})
}