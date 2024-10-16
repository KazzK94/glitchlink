'use client'

import { registerSchema, type RegisterSchema } from '@/schemas/registerSchema'
import { getUser, getUserByUsername } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { CircleCheckIcon, CircleAlertIcon, CircleDashed } from 'lucide-react'


export function RegisterForm() {

	const router = useRouter()
	const [usernameAvailability, setUsernameAvailability] = useState<'available' | 'unavailable' | 'checking' | 'unknown'>('unknown')
	const [isLoading, setIsLoading] = useState<boolean>(false)

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
		setIsLoading(true)
		const existingUser = await getUser({
			where: {
				usernameLowercase: values.username.toLowerCase(),
				email: values.email
			}
		})

		if (existingUser) {
			if (existingUser.username.toLowerCase() === values.username.toLowerCase()) {
				form.setError('username', { type: 'manual', message: 'Username is already taken.' })
			} else {
				form.setError('email', { type: 'manual', message: 'Email is already taken.' })
			}
			setIsLoading(false)
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
				setIsLoading(false)
				return
			}
			const newUser = await response.json()
			alert(`User Created: ${newUser.username}. \nNow redirecting to login page...`)
			router.push('/login')
		} catch (error) {
			setIsLoading(false)
			console.error('Failed to register user:', error)
			alert('Unknown error. Check the console for more info. ')
		}
	}

	const debouncedCheckAvailability = useDebouncedCallback(({ username }: { username: string }) => {
		checkAvailability({ username })
	}, 3000)

	function onUsernameChange(username: string) {
		setUsernameAvailability('checking')
		form.clearErrors('username')
		debouncedCheckAvailability({ username })
	}

	async function checkAvailability({ username }: { username: string }) {
		setUsernameAvailability('checking')
		form.clearErrors('username')
		if (!username || username.length < 3) {
			setUsernameAvailability('unavailable')
			form.setError('username', { type: 'manual', message: 'Username must be at least 3 characters long.' })
			return
		}
		const isUsernameTaken = Boolean(await getUserByUsername({ username }))
		if (isUsernameTaken) {
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
							<div className="flex items-center gap-2">
								<FormControl>
									<Input {...field} onChangeCapture={(event) => onUsernameChange(event.currentTarget.value)} />
								</FormControl>
								<div>
									{usernameAvailability === 'available' && <CircleCheckIcon className="text-green-600" />}
									{usernameAvailability === 'unavailable' && <CircleAlertIcon className="text-red-600" />}
									{(usernameAvailability === 'unknown' || usernameAvailability === 'checking')
										&& <CircleDashed className={`
											text-gray-600 ${(usernameAvailability === 'checking') && 'animate-spin-slow'}
										`} />
									}
								</div>
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

				<Button type="submit" disabled={isLoading} variant='secondary' className='w-full'>Register</Button>
			</form>
		</Form>
	)
}
