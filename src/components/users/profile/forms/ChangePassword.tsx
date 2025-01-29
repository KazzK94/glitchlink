'use client'

import { passwordChangeSchema, type PasswordChangeSchema } from '@/schemas/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { changePassword } from '@/services/users'


export function ChangePasswordForm({ user }: { user: { username: string } }) {

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<PasswordChangeSchema>({
		resolver: zodResolver(passwordChangeSchema),
		defaultValues: {
			password: "",
			newPassword: "",
			confirmNewPassword: ""
		}
	})

	async function onSubmit(values: PasswordChangeSchema) {
		setIsLoading(true)

		// ✅ At this point, the values will be type-safe and validated.
		try {
			await changePassword({ username: user.username, password: values.password, newPassword: values.newPassword })
			toast.success('Password changed!')
			setIsLoading(false)
			return
		} catch (error) {
			setIsLoading(false)
			form.setError('password', { type: 'manual', message: 'Incorrect password.' })
			toast.error('Failed to change password. Make sure you introduced your current password correctly.')
			console.error('Failed to change password:', error)
		}
	}

	function onNewPasswordChange(password: string) {
		const confirmPassword = form.getValues('confirmNewPassword')
		if (confirmPassword && password !== confirmPassword) {
			form.setError('confirmNewPassword', { type: 'manual', message: 'Passwords do not match.' })
		} else {
			form.clearErrors('confirmNewPassword')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='bg-slate-800 px-4 py-3 rounded-lg'>
				<h2 className='text-xl border-b border-gray-400 pl-1 pb-0.5 mb-2.5'>Password</h2>

				<div className='flex flex-col gap-0.5 mt-2'>
					{/** PASSWORD */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className='px-1 break-inside-avoid-column'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Password</FormLabel>
								<FormControl>
									<Input
										className="mt-1 block w-full rounded-sm bg-black/40 border-0"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>
									Introduce your current password.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col gap-0.5 mt-2'>

					{/** NEW PASSWORD */}
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem className='px-1 break-inside-avoid-column'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">New Password</FormLabel>
								<FormControl>
									<Input
										className="mt-1 block w-full rounded-sm bg-black/40 border-0"
										onChangeCapture={(event) => onNewPasswordChange(event.currentTarget.value)}
										{...field}
										type="password"
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>
									Introduce the new password.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col gap-0.5 mt-2'>
					{/** CONFIRM PASSWORD */}
					<FormField
						control={form.control}
						name="confirmNewPassword"
						render={({ field }) => (
							<FormItem className='px-1 break-inside-avoid-column'>
								<FormLabel className="ml-0.5 text-base font-medium text-gray-200">Confirm New Password</FormLabel>
								<FormControl>
									<Input className="mt-1 block w-full rounded-sm bg-black/40 border-0"  {...field} type="password" />
								</FormControl>
								<FormMessage />
								<FormDescription>
									Confirm your new password.
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>

				<div className='px-2.5'>
					<Button type="submit" disabled={isLoading} className='mt-6 px-4 py-5 w-full rounded-lg text-base font-semibold text-black bg-gradient-to-r from-cyan-50 to-purple-50 hover:from-cyan-100 hover:to-purple-50'>
						Change Password
					</Button>
				</div>

			</form>
		</Form>
	)
}
