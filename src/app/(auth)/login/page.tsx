
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginPage() {
	return (
		<Container className='mt-4 max-w-96 flex flex-col gap-1'>
			<h1 className="text-2xl mb-2">Login</h1>
			<form className="flex flex-col gap-4">
				<label>
					<span className='block mb-1'>Username</span>
					<Input type="text" placeholder='Username' />
				</label>
				<label>
					<span className='block mb-1'>Password</span>
					<Input type="password" placeholder='Password' />
				</label>
				<Button className='bg-blue-700 hover:bg-blue-700/75'>Login</Button>
			</form>
			<p className='text-xl text-red-400'>DISCLAIMER: Login is not implemented yet.</p>

			<Link href='/register' className="text-cyan-400 pt-3 text-center">
				Don&apos;t have an account yet? Register here!
			</Link>
		</Container>
	)
}