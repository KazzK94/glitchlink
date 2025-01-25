import { Container } from '@/components/common/Container'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {

	return (
		<Container asSection className='py-8 pb-6'>
			<RegisterForm />
		</Container>
	)
}
