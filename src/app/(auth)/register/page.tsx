import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createUser } from '@/actions/users'
import { redirect } from 'next/navigation'

export default function RegisterPage() {

	async function handleSubmitAction(formData: FormData) {
		'use server'
		if(formData.get('username') === '' || formData.get('password') === '' || formData.get('name') === '' || formData.get('email') === '') return
		if(formData.get('password') !== formData.get('confirmPassword')) return
		const newUser = await createUser(formData)
		if (newUser) {
			// Redirect to login page
			redirect('/login')
		}
	}

	return (
		<Container className='mt-4 max-w-96 flex flex-col gap-1'>
			<h1 className="text-2xl mb-2">Create an account</h1>
			<form className="flex flex-col gap-4" action={handleSubmitAction}>
				<label>
					<span className='block mb-1'>Username</span>
					<Input name='username' type="text" placeholder='Username' />
				</label>
				<label>
					<span className='block mb-1'>Password</span>
					<Input name='password' type="password" placeholder='Password' />
				</label>
				<label>
					<span className='block mb-1'>Confirm Password</span>
					<Input name='confirmPassword' type="password" placeholder='Confirm Password' />
				</label>
				<label>
					<span className='block mb-1'>Display Name</span>
					<Input name='name' type="text" placeholder='The name everyone will see as your name' />
				</label>
				<label>
					<span className='block mb-1'>Email</span>
					<Input name='email' type="email" placeholder='Email' />
				</label>
				<label>
					<span className='block mb-1'>Color</span>
					<Input name='color' type="color" defaultValue='#ffffff' />
				</label>
				<Button className='bg-blue-800 hover:bg-blue-800/80'>Register</Button>
			</form>
		</Container>
	)
}