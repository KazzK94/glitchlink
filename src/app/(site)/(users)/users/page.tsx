import { Container } from '@/components/common/Container'
import { UsersList } from '@/components/users/UsersList'

export default async function UsersPage() {
	return (
		<Container asSection>
			<h1 className='mt-6 mb-5 text-3xl'>Find other gamers</h1>
			<UsersList
				className='text-xl text-neutral-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
				cardClassName='bg-gray-700/10 hover:bg-gray-700/15 shadow-sm shadow-gray-400 hover:shadow-gray-200 p-3'
			/>
		</Container>
	)
}
