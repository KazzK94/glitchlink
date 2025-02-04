
import { Container } from '@/components/common/Container'
import { RegisterForm } from '@/components/auth/RegisterForm'

import { getUserFromSession } from '@/services/auth'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
	const loggedUser = await getUserFromSession()
	if(loggedUser) {
		redirect('/')
	}

	return (
		<Container asSection className='py-8 pb-6'>
			<RegisterForm />
		</Container>
	)
}
