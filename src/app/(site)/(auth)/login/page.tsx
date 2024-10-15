
import { LoginForm } from '@/components/auth/LoginForm'
import { Container } from '@/components/common/Container'
import Link from 'next/link'
import { Suspense } from 'react'

export default function LoginPage() {
	return (
		<Container asSection className='mt-6 max-w-96 flex flex-col gap-1'>
			<h1 className="text-2xl mb-2 text-center">Login</h1>
			<Suspense fallback={<div>Loading login form...</div>} >
				<LoginForm />
			</Suspense>
			<Link href='/register' className="text-cyan-400 mt-4 text-center w-fit mx-auto">
				Don&apos;t have an account yet? Register here!
			</Link>
		</Container>
	)
}