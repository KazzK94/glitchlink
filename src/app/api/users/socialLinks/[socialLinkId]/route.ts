
import { acceptSocialLinkRequest, deleteSocialLink } from '@/services/api/socialLinks'
import { type NextRequest } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { socialLinkId: string } }) {
	const { socialLinkId } = params
	const body = await request.json()
	const { status } = body

	if (!status) {
		return Response.json({ message: 'Missing status in request body' }, { status: 400 })
	}

	if (status === 'FRIENDS') {
		const result = await acceptSocialLinkRequest(socialLinkId)
		return Response.json({ message: 'SocialLink acceptance executed', result })
	}

	return Response.json({ message: 'This status cant be set in the current version of GlitchLink.' }, { status: 501 })
}

export async function DELETE(_request: NextRequest, { params }: { params: { socialLinkId: string } }) {
	const socialLinkId = params.socialLinkId
	const result = await deleteSocialLink(socialLinkId)
	return Response.json({ message: 'SocialLink deletion executed', result })
}
