'use server'

import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

import { getUserFromSession } from './auth'

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

export async function addVideoGameToCollection({ videoGameId }: { videoGameId: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	return await prisma.user.update({
		where: { id: user.id },
		data: {
			videoGames: {
				connect: { id: videoGameId }
			}
		}
	})
}

export async function removeVideoGameFromUser({ videoGameId }: { videoGameId: string }) {
	const user = await getUserFromSession()
	if (!user) return null

	return await prisma.user.update({
		where: { id: user.id },
		data: {
			videoGames: {
				disconnect: { id: videoGameId }
			}
		}
	})
}

export async function getVideoGameById(id: string, includePlayers: boolean = false) {
	return await prisma.videoGame.findUnique({
		where: { id },
		select: {
			id: true, title: true, description: true, image: true, genres: true, developers: true, platforms: true,
			users: includePlayers ? {
				select: {
					id: true, username: true, name: true, avatar: true
				}
			} : false
		}
	})
}

export async function getVideoGameByExternalId(externalId: number, includePlayers: boolean = false) {
	return await prisma.videoGame.findUnique({
		where: { externalId: externalId },
		select: {
			id: true, title: true, description: true, image: true, genres: true, developers: true, platforms: true,
			users: includePlayers ? {
				select: {
					id: true, username: true, name: true, avatar: true
				}
			} : false
		}
	})
}
export async function getOwnedVideoGames(userId: string = '') {
	if (!userId) {
		const user = await getUserFromSession()
		if (!user || !user.id) {
			throw new Error('You must provide a user ID to get their videogames, or be logged in to get yours.')
		}
		userId = user.id
	}

	// Find user and get its video games
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			videoGames: {
				orderBy: { title: 'asc' }
			}
		}
	})
}

export async function getVideoGamesByUser(userId: string) {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: { videoGames: true }
	})
}

export async function getPopularVideoGames(amount: number = 3) {
	return await prisma.videoGame.findMany({
		orderBy: {
			users: {
				_count: 'desc',
			},
		},
		take: amount
	})
}