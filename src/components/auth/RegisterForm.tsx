'use client'

import { registerSchema, type RegisterSchema } from '@/schemas/registerSchema'
import { getUser, getUserByUsername } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


export function RegisterForm() {

	const [usernameAvailability, setUsernameAvailability] = useState<'available' | 'unavailable' | 'unknown'>('unknown')
	const router = useRouter()

	// 1. Define your form.
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
			name: "",
			email: "",
			color: "#ffffff"
		},
	})

	// 2. Define a submit handler.
	async function onSubmit(values: RegisterSchema) {
		const existingUser = await getUser({
			where: {
				usernameLowercase: values.username.toLowerCase(),
				email: values.email
			}
		})

		if(existingUser) {
			if (existingUser.username.toLowerCase() === values.username.toLowerCase()) {
				form.setError('username', { type: 'manual', message: 'Username is already taken.' })
			} else {
				form.setError('email', { type: 'manual', message: 'Email is already taken.' })
			}
			return
		}

		// ✅ At this point, the values will be type-safe and validated.
		try {
			const response = await fetch('/api/users/register', {
				method: 'POST',
				body: JSON.stringify(values)
			})
			if (!response.ok) {
				const { message } = await response.json()
				alert('Error trying to register: ' + message)
				return
			}
			const newUser = await response.json()
			alert('User Created: ' + JSON.stringify(newUser))
			alert('Redirecting to login page...')
			router.push('/login')
		} catch (error) {
			console.error('Failed to register user:', error)
		}
	}

	function onUsernameChange() {
		if (usernameAvailability === 'unknown') return
		setUsernameAvailability('unknown')
		form.clearErrors('username')
	}

	async function checkAvailability({ username }: { username: string }) {
		setUsernameAvailability('unknown')
		form.clearErrors('username')
		if (!username || username.length < 3) {
			form.setError('username', { type: 'manual', message: 'Username must be at least 3 characters long.' })
			return
		}
		const usernameTaken = Boolean(await getUserByUsername(username))
		if (usernameTaken) {
			setUsernameAvailability('unavailable')
			form.setError('username', { type: 'manual', message: 'Username is already taken.' })
			return false
		}
		setUsernameAvailability('available')
		return true
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-96 mx-auto space-y-4">
				{/** USERNAME */}
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<div className="flex gap-1 md:gap-2">
								<FormControl>
									<Input {...field} onChangeCapture={onUsernameChange} />
								</FormControl>
								<Button
									type="button" variant="secondary"
									className={cn("shrink-0 border",
										{ "bg-green-300 hover:bg-green-400 border-green-600": usernameAvailability === 'available' },
										{ "bg-red-300 hover:bg-red-400 border-red-600": usernameAvailability === 'unavailable' }
									)}
									onClick={() => checkAvailability({ username: field.value })}>
									Check Availability
								</Button>
							</div>
							<FormDescription>
								Your username must be unique, and at least 3 characters long.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/** PASSWORD */}
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
							<FormDescription>
								Create a strong password. It should contain at least 4 characters.
							</FormDescription>
						</FormItem>
					)}
				/>
				{/** CONFIRM PASSWORD */}
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input {...field} type="password" />
							</FormControl>
							<FormDescription>
								Type your password again.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/** NAME */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
							<FormDescription>
								Your display name. It must be at least 3 characters long.
							</FormDescription>
						</FormItem>
					)}
				/>
				{/** EMAIL */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
							<FormDescription>
								Your email will be used if you forget your password.
							</FormDescription>
						</FormItem>
					)}
				/>
				{/** COLOR */}
				<FormField
					control={form.control}
					name="color"
					render={({ field }) => (
						<FormItem className='hidden'>
							<FormLabel>Profile Color (click on it to change it)</FormLabel>
							<FormControl>
								<Input {...field} type='color' className='px-0.5 py-0' />
							</FormControl>
							<FormMessage />
							<FormDescription>
								This will be the color for your name in posts and messages.
							</FormDescription>
						</FormItem>
					)}
				/>

				<Button type="submit" variant='secondary' className='w-full'>Register</Button>
			</form>
		</Form>
	)
}
