
import z from 'zod'

export const loginSchema = z.object({
	username: z.string({ message: "Please insert your username." }).min(3, { message: "Invalid username." }),
	password: z.string({ message: "Please insert your password." }).min(4, { message: "Invalid password." })
}).transform((data) => ({
	// Trim the username and password
	username: data.username.trim(),
	password: data.password
}))

export type LoginSchema = z.infer<typeof loginSchema>