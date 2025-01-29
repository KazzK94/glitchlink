'use client'

import { basicInfoSchema, type BasicInfoSchema } from '@/schemas/userSchema'
import { getUser, updateUser } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import { Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { CircleCheckIcon, CircleAlertIcon, CircleDashed } from 'lucide-react'
import { toast } from 'sonner'

interface UserBasicInfo {
	name: string
	username: string
	email: string
}

export function UpdateBasicInfoForm({ user }: { user: UserBasicInfo }) {

	const [usernameAvailability, setUsernameAvailability] = useState<'available' | 'unavailable' | 'checking' | 'unknown'>('unknown')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// 1. Define your form.
	const form = useForm<BasicInfoSchema>({
		resolver: zodResolver(basicInfoSchema),
		defaultValues: user
	})

	// 2. Define a submit handler.
	async function onSubmit(values: BasicInfoSchema) {
		setIsLoading(true)

		const where = {
			username: '',
			email: ''
		}
		if (values.username !== user.username) where.username = values.username
		if (values.email !== user.email) where.email = values.email

		const existingUser = (where.username || where.email) ? await getUser({ where }) : null

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
			await updateUser({ data: values })
			toast.success('User updated correctly!')
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.error('Failed to update user:', error)
			toast.error('Unknown error. Check the console for more info and contact an administrator. ')
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

	async function checkAvailability({ username }: { username: string }) {
		setUsernameAvailability('checking')
		form.clearErrors('username')
		if (!username || username.length < 3) {
			setUsernameAvailability('unavailable')
			form.setError('username', { type: 'manual', message: 'Username must be at least 3 characters long.' })
			return
		}
		const isUsernameTaken = username !== user.username && Boolean(await getUser({ username }))
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="bg-slate-800 px-4 py-3 rounded-lg">
				<h2 className='text-xl border-b border-gray-400 pl-1 pb-0.5 mb-2.5'>Basic Information</h2>

				<div className='flex flex-col gap-0.5 mt-2'>
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
											className="mt-1 block w-full rounded-sm bg-black/40 border-0"
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
									Your username must have at least 3 characters.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>

				<div className='flex flex-col gap-0.5 mt-2'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='px-1 break-inside-avoid-column'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Name</FormLabel>
								<FormControl>
									<Input className="mt-1 block w-full rounded-sm bg-black/40 border-0" {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>
									Your name must have at least 3 characters.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col gap-0.5 mt-2'>
					{/** EMAIL */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className='px-1 break-inside-avoid-column'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Email</FormLabel>
								<FormControl>
									<Input className="mt-1 block w-full rounded-sm bg-black/40 border-0" {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>
									Your email will be used if you forget your password.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>

				<div className='px-1'>
					<Button type="submit" disabled={isLoading} className='mt-4 px-4 py-5 w-full rounded-lg text-base font-semibold text-black bg-gradient-to-r from-cyan-50 to-purple-50 hover:from-cyan-100 hover:to-purple-50'>
						{isLoading ? 'Updating...' : 'Update'}
					</Button>
				</div>

			</form>
		</Form>
	)
}
