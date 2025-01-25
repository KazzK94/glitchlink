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
import Link from 'next/link'


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
			email: ""
		}
	})

	// 2. Define a submit handler.
	async function onSubmit(values: RegisterSchema) {
		setIsLoading(true)
		const existingUser = await getUser({
			where: {
				username: values.username,
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
	}, 850)

	function onUsernameChange(username: string) {
		setUsernameAvailability('checking')
		form.clearErrors('username')
		debouncedCheckAvailability({ username })
	}

	function onPasswordChange(password: string) {
		const confirmPassword = form.getValues('confirmPassword')
		if (confirmPassword && password !== confirmPassword) {
			form.setError('confirmPassword', { type: 'manual', message: 'Passwords do not match.' })
		} else {
			form.clearErrors('confirmPassword')
		}
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md md:max-w-3xl mx-auto bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-400">

				<div className='mb-4 border-b border-gray-600/50 pb-4'>
					<h1 className="text-3xl font-bold text-center text-white">Create an account</h1>
					<p className="mt-1 text-base text-center text-gray-200">It will be brief, we promise!</p>
				</div>

				<div className='space-y-3 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-x-12'>
					<div className='space-y-3'>
						{/** USERNAME */}
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className='px-1 break-inside-avoid-column'>
									<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Username</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<Input
												className="block w-full rounded-sm bg-black/15 border-gray-500 focus:ring-blue-500 focus:border-blue-500"
												onChangeCapture={(event) => onUsernameChange(event.currentTarget.value)}
												{...field}
											/>
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
									<FormMessage />
									<FormDescription>
										Your username must be at least 3 characters long.
									</FormDescription>
								</FormItem>
							)}
						/>
						{/** PASSWORD */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className='px-1 break-inside-avoid-column'>
									<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Password</FormLabel>
									<FormControl>
										<Input 
										className="block w-full rounded-sm bg-black/15 border-gray-500 focus:ring-blue-500 focus:border-blue-500" 
										onChangeCapture={(event) => onPasswordChange(event.currentTarget.value)}
										type="password"
										{...field} 
										 />
									</FormControl>
									<FormMessage />
									<FormDescription>
										A password must contain at least 4 characters.
									</FormDescription>
								</FormItem>
							)}
						/>
						{/** CONFIRM PASSWORD */}
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className='px-1 break-inside-avoid-column'>
									<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Confirm Password</FormLabel>
									<FormControl>
										<Input className="block w-full rounded-sm bg-black/15 border-gray-500 focus:ring-blue-500 focus:border-blue-500"  {...field} type="password" />
									</FormControl>
									<FormMessage />
									<FormDescription>
										Confirm your password (both must match).
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-3'>
						{/** NAME */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className='px-1 break-inside-avoid-column'>
									<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Name</FormLabel>
									<FormControl>
										<Input className="block w-full rounded-sm bg-black/15 border-gray-500 focus:ring-blue-500 focus:border-blue-500" {...field} />
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
								<FormItem className='px-1 break-inside-avoid-column'>
									<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Email</FormLabel>
									<FormControl>
										<Input className="block w-full rounded-sm bg-black/15 border-gray-500 focus:ring-blue-500 focus:border-blue-500" {...field} />
									</FormControl>
									<FormMessage />
									<FormDescription>
										Your email will be used if you forget your password.
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				</div>
				<Button type="submit" disabled={isLoading} className='mt-6 px-4 py-5 w-full rounded-lg text-base font-semibold text-black bg-gradient-to-r from-cyan-50 to-purple-50 hover:from-cyan-100 hover:to-purple-50'>
					Register
				</Button>

				<p className='mt-5 mx-auto md:text-sm font-semibold text-pretty flex flex-col md:flex-row gap-x-1.5 justify-center items-center'>
					<span>
						Already have an account?
					</span>
					<Link href='/login' className="text-cyan-400 hover:text-cyan-500">
						Log in here!
					</Link>
				</p>
			</form>
		</Form>
	)
}
