'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { signIn } from 'next-auth/react'

import { loginSchema, type LoginSchema } from '@/schemas/loginSchema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function LoginForm() {

	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const searchParams = useSearchParams()

	// Extract the callbackUrl from the query parameters
	const callbackUrl = searchParams.get('callbackUrl') || '/'

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
		setError(null)
		try {
			// Sign In with NextAuth
			const response = await signIn('credentials', {
				redirect: false,
				username: values.username,
				password: values.password
			})
			if (!response?.ok) {
				setError('Incorrect username or password')
				return
			}
			// Redirect on successful login
			router.push(callbackUrl)
		} catch (error) {
			console.error({ mal: true, error })
			setError('An unknown error occurred. Please try again later.')
		}
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
						</FormItem>
					)}
				/>

				{error && <p className='bg-red-600/90 text-white rounded p-2'>{error}</p>}

				<Button type="submit" variant='secondary' className='w-full'>Log in</Button>
			</form>
		</Form>
	)
}
