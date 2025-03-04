
import { getUserFromSession } from '@/services/auth'
import { updateUser } from '@/services/api/users'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

type ValidResponse = {
	secure_url: string
}

export async function PATCH(request: Request) {
	const user = await getUserFromSession()
	if (!user || !user.id) {
		return Response.json({ ok: false, message: 'No user logged in' }, { status: 403 })
	}

	const formData = await request.formData()
	const avatar = formData.get('avatar') as File

	if (!avatar) {
		return Response.json({ ok: false, message: 'No avatar provided' }, { status: 400 })
	}
	try {

		const result = await new Promise(async (resolve, reject) => {
			const arrayBuffer = await avatar.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			cloudinary.uploader.upload_stream(
				{ folder: 'glitchlink-avatars', public_id: user.id, upload_preset: 'glitchlink' },
				(error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				}).end(buffer)
		})

		const { secure_url } = result as ValidResponse

		if (!secure_url) {
			return Response.json({ ok: false, message: 'Failed to upload avatar' }, { status: 500 })
		}

		await updateUser({
			data: {
				avatar: secure_url
			}
		})

		return Response.json({ ok: true, user, avatarUrl: secure_url })
	} catch (error) {
		console.error('Failed to upload avatar:', error)
		if((error as Error).message.toLowerCase().includes('file size too large')) {
			return Response.json({ ok: false, message: 'Avatar size too large, please upload a smaller file.' }, { status: 400 })
		}
		return Response.json({ ok: false, message: 'Failed to upload avatar' }, { status: 500 })

	}
}
