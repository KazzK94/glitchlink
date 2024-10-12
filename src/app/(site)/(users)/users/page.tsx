import { Container } from '@/components/Container'
import { UsersList } from '@/components/users/UsersList'

export default async function UsersPage() {
	return (
		<Container asSection>
			<h1 className='mt-6 mb-5 text-3xl'>Find other gamers</h1>
			<UsersList />
		</Container>
	)
}
