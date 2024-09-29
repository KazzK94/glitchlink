'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginSchema, type LoginSchema } from '@/schemas/loginSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
	// 1. Define your form.
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		}
	})

	// 2. Define a submit handler.
	async function onSubmit(values: LoginSchema) {
		form.clearErrors() // Clear previous errors before submitting.
		// ✅ This will be type-safe and validated.
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(values)
		})
		if (response.status === 403) {
			form.setError('username', { message: 'Incorrect user or password' })
			form.setError('password', { message: 'Incorrect user or password' })
			return
		}
		const { user } = await response.json()
		alert(`Welcome back, ${user.name}!`)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-96 mx-auto space-y-3">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} autoComplete='off' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input {...field} type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant='secondary' className='w-full'>Log in</Button>
			</form>
		</Form>
	)
}
