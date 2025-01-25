
import { UserProfile } from '@/components/users/UserProfile'

export default async function UserDetailPage({ params }: { params: { username: string } }) {

	return (
		<UserProfile username={params.username} />
	)
}