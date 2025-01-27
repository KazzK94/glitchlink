

import { getSelfSocialLinks, sendSocialLinkRequest } from '@/services/socialLinks'
import { type NextRequest } from 'next/server'

export async function GET() {
	const socialLinks = await getSelfSocialLinks()
	return Response.json(socialLinks)
}

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { targetId } = body
	// TODO: review previous code, see if we can use params instead of body without [targetId] interfering with SocialLink [id]

	const result = await sendSocialLinkRequest({ targetUserId: targetId })
	return Response.json({ result })
}
