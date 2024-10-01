
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { attemptLogin } from '@/services/users'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				try {
					// Attempt to login with provided credentials
					const user = await attemptLogin(credentials!.username, credentials!.password)
					// Return user (will be null if credentials are invalid)
					return user
				} catch (error) {
					// Return null if any error happens
					throw new Error('Invalid credentials')
				}
			}
		})
	],
	pages: {
		signIn: '/login'
	}
})

export { handler as GET, handler as POST }
