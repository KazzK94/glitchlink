
import { acceptSocialLinkRequest, deleteSocialLink } from '@/services/socialLinks'
import { type NextRequest } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	const socialLinkId = params.id
	const body = await request.json()
	const { status } = body

	if(!status) {
		return Response.json({ message: 'Missing status in request body' }, { status: 400 })
	}

	if(status === 'FRIENDS') {
		const result = await acceptSocialLinkRequest(socialLinkId)
		return Response.json({ message: 'SocialLink acceptance executed', result })
	}

	return Response.json({ message: 'This status cant be set in the current version of GlitchLink.' }, { status: 501 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const socialLinkId = params.id
	const result = await deleteSocialLink(socialLinkId)
	return Response.json({ message: 'SocialLink deletion executed', result })
}
