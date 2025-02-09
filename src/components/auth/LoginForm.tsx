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
import Link from 'next/link'

export function LoginForm() {

	const router = useRouter()
	const searchParams = useSearchParams()
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Extract the callbackUrl from the query parameters
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	// 1. Define your form.
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	})

	// 2. Define a submit handler.
	async function onSubmit(values: LoginSchema) {
		setError(null)
		setIsLoading(true)
		try {
			// Sign In with NextAuth
			const response = await signIn('credentials', {
				redirect: false,
				username: values.username,
				password: values.password
			})
			if (!response?.ok) {
				setError('Incorrect username or password')
				setIsLoading(false)
				return
			}
			// Redirect on successful login
			router.push(callbackUrl)
			// And refresh, so all Server Components get updated with the new session
			router.refresh() // <-- This is important for stuff like user icon (in the navbar)
		} catch (error) {
			console.error({ mal: true, error })
			setError('An unknown error occurred. Please try again later.')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-md mx-auto bg-gray-800/70 p-8 rounded-xl shadow-lg ">

				<div className='mb-3'>
					<h1 className="text-3xl font-bold text-center text-white">Welcome Back</h1>
					<p className="mt-1 text-base text-center text-gray-200">Log in to continue</p>
				</div>

				<div>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Username</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="mt-1 block w-full rounded-sm bg-black/40 border-0"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className='mt-2.5'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										className="mt-1 block w-full rounded-sm bg-black/40 border-0"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				{error && <p className='mt-3 bg-red-100 text-red-700 text-sm p-3 rounded-lg'>{error}</p>}

				<Button
					type="submit"
					disabled={isLoading}
					variant='secondary'
					className='mt-4 px-4 py-5 w-full rounded-lg text-base font-semibold text-black bg-gradient-to-r from-cyan-50 to-purple-50 hover:from-cyan-100 hover:to-purple-100'>
					{isLoading ? "Logging in..." : "Log in"}
				</Button>

				<p className='mt-5 mx-auto md:text-sm font-semibold text-pretty flex flex-col md:flex-row gap-x-1.5 justify-center items-center'>
					<span>
						You don&apos;t have an account yet?
					</span>
					<Link href='/register' className="text-cyan-400 hover:text-cyan-500">
						Register here!
					</Link>
				</p>
			</form>
		</Form>
	)
}
