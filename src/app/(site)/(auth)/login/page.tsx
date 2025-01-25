
import { LoginForm } from '@/components/auth/LoginForm'
import { Container } from '@/components/common/Container'

export default function LoginPage() {
	return (
		<Container asSection className='py-8 pb-6'>
			<LoginForm />
		</Container>
	)
}