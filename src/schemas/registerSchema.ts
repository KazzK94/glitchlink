
import z from 'zod'

const invalidUsernames = ["admin", "administrator", "mod", "moderator", "login", "register", "games"]

export const registerSchema = z.object({
	username: z.string()
		.min(3, { message: "Username must be at least 3 characters long." })
		// Regex: username can only contain letters, numbers and underscores.
		.regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers and underscores." }),
	password: z.string().min(4, { message: "Password must contain at least 4 characters." }),
	confirmPassword: z.string(),
	name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
	email: z.string().email({ message: "Invalid email." })
}).superRefine((data, ctx) => {
	// Prevent users from being all spaces or too short by abusing spaces
	if(data.username.trim().length !== data.username.length) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Username cannot start or end with spaces.",
			path: ["username"]
		})
	}
	// Force first character to be a letter
	if (data.username.length > 0 && !data.username[0].match(/[a-zA-Z]/)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Username must start with a letter.",
			path: ["username"]
		})
	}
	// Prevent usernames that lead to impersonation or conflicts with routes
	if (invalidUsernames.includes(data.username.toLowerCase())) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Invalid username.",
			path: ["username"]
		})
	}
	if (data.password !== data.confirmPassword) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Passwords do not match.",
			path: ["confirmPassword"]
		})
	}
	return null
}).transform(data => ({
	...data,
	username: data.username.trim(),
	name: data.name.trim(),
	email: data.email.trim()
}))

export type RegisterSchema = z.infer<typeof registerSchema>