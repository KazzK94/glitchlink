'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

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

export async function getVideoGameById(id: string) {
	return await prisma.videoGame.findUnique({
		where: { id }
	})
}

export async function getOwnedVideoGames(userId: string = '') {
	if (!userId) {
		// Get the session
		const session = await getServerSession(authOptions)
		if (!session) {
			throw new Error('You must be signed in to create a post')
		}
		const { user } = session
		userId = user.id
	}

	// Find user and get its video games
	return await prisma.user.findUnique({
		where: { id: userId },
		select: { videoGames: true }
	})
}

export async function getVideoGamesByUser(userId: string) {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: { videoGames: true }
	})
}

export async function addVideoGameToUser({ videoGameId, userId }: { videoGameId: string, userId: string }) {
	return await prisma.user.update({
		where: { id: userId },
		data: {
			videoGames: {
				connect: { id: videoGameId }
			}
		}
	})
}

