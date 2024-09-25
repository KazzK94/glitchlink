
import z from 'zod'
import bcryptjs from 'bcryptjs'

export const registerSchema = z.object({
	username: z.string()
		.min(3, { message: "Username must be at least 3 characters long." })
		// Regex: username can only contain letters, numbers and underscores.
		.regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers and underscores." }),
	password: z.string().min(4, { message: "Password must contain at least 4 characters." }),
	confirmPassword: z.string(),
	name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
	email: z.string().email({ message: "Invalid email." }),
	color: z.string()
		// Regex: color must be a valid hex color (#09f or #0492f7).
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: "Invalid color." })
}).superRefine((data, ctx) => {
	if (data.password !== data.confirmPassword) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Passwords do not match.",
			path: ["confirmPassword"]
		})
	}
	return null
}).transform(data => {
	const hashedPassword = bcryptjs.hashSync(data.password, 10)
	return {
		...data,
		password: hashedPassword
	}
})

export type RegisterSchema = z.infer<typeof registerSchema>