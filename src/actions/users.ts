'use server'

import { createUser as createUserOnDb } from '@/services/users'

export async function createUser(formData: FormData) {
	const newUser = createUserOnDb({
		username: formData.get('username') as string,
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		color: formData.get('color') as string
	})

	return newUser
}