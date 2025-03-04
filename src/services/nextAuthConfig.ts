
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { attemptLogin } from '@/services/api/users'

export const authOptions = {
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
					if (!user) throw new Error('Incorrect username or password.')

					// TODO: create a Session instance in the DB

					// Return user object if login is successful
					return user // <-- TODO: return the session id along with the user
				} catch (error) {
					// Return null if any error happens
					console.error(error)
					throw new Error('Incorrect username or password.')
				}
			}
		})
	],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, user }) {
			// when user logs in, the user object is passed to the jwt callback
			// (the next times, user will be undefined but token will be updated)
			if (user) {
				token = {
					...token,
					...user
				}
			}
			return token
		},
		async session({ session, token }) {
			// Return default session if no user is logged in
			if (!session.user) return session

			if (token) {
				session.user = {
					...session.user,
					id: token.id,
					name: token.name,
					username: token.username,
					email: token.email,
					avatar: token.avatar
				}
			}
			return session
		}
	}
} as NextAuthOptions
