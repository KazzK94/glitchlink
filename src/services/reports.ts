'use server'

import prisma from '@/lib/db'
import { getUserFromSession, isLoggedUserAdmin } from './auth'
import { ReportEntityType } from '@prisma/client'

interface ReportCreationData {
	reason: string
	entityType: ReportEntityType
	entityId: string
}

export async function createReport({ reason, entityType, entityId }: ReportCreationData) {
	const loggedUser = await getUserFromSession()
	if (!loggedUser || !loggedUser.id) return null

	try {
		return await prisma.report.create({
			data: {
				generatedById: loggedUser.id,
				reason,
				entityType,
				entityId
			}
		})
	} catch (error) {
		console.error('Failed to create the report:', error)
		throw error
	}
}


export async function getReports() {

	if (!isLoggedUserAdmin()) return null

	return await prisma.report.findMany({
		include: {
			generatedBy: true
		},
		orderBy: { createdAt: 'desc' }
	})
}

export async function getReportById({ id }: { id: string }) {
	return await prisma.report.findUnique({
		where: { id },
		include: {
			generatedBy: true
		}
	})
}