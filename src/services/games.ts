'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function createOrGetVideoGame({ externalId, title, description, image, genres, developers, platforms }: Prisma.VideoGameCreateInput) {
	try {
		return await prisma.videoGame.upsert({
			where: {
				externalId: externalId,
			},
			update: {},
			create: {
				externalId,
				title,
				description,
				image,
				genres,
				developers,
				platforms
			}
		})
	} catch (error) {
		console.error('Failed to create game:', error)
		throw error
	}
}

export async function getVideoGame({ where }: { where: Prisma.VideoGameWhereInput }) {
	return await prisma.videoGame.findFirst({ where: where || {} })
}

export async function getVideoGameById(id: string) {
	return await prisma.videoGame.findUnique({
		where: { id }
	})
}
