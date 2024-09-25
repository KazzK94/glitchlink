import { Container } from '@/components/Container'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {

	return (
		<Container asSection className='mt-6 mb-8 max-w-96 flex flex-col gap-1'>
			<p className='text-lg text-red-400 text-center my-4'>DISCLAIMER: Do NOT create an account with real data. This website is only published for testing purposes, so there are not too many security measures yet. Also, you CANNOT DELETE an account yet. That said, feel free to create a mock user if you want.</p>
			<h1 className="text-2xl mb-2 text-center">Create an account</h1>
			<RegisterForm />
			<Link href='/login' className="text-cyan-400 mt-4 text-center w-fit mx-auto">
				You already own an account? Log in here!
			</Link>
		</Container>
	)
}
