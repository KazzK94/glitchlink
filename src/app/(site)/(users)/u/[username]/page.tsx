
import { Container } from '@/components/common/Container'
import { UserProfile } from '@/components/users/UserProfile'
import { getUserByUsername } from '@/services/users'

export default async function UserDetailPage({ params }: { params: { username: string } }) {

	const user = await getUserByUsername({ username: params.username })

	// If no user: show error message "User Not Found"
	if (!user) return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: User not found</Container>

	return (
		<UserProfile user={user} />
	)
}