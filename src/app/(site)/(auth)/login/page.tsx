
import { LoginForm } from '@/components/auth/LoginForm'
import { Container } from '@/components/common/Container'

import { getUserFromSession } from '@/services/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
	const loggedUser = await getUserFromSession()
	if(loggedUser) {
		redirect('/')
	}

	return (
		<Container asSection className='py-8 pb-6'>
			<LoginForm />
		</Container>
	)
}