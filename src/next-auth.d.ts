// types/next-auth.d.ts
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: User
	}

	interface User {
		id: string
		name: string
		username: string
		email: string
		avatar: string | null | undefined
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string
		name: string
		username: string
		email: string
		avatar: string | null | undefined
	}
}