
import { UserProfile } from '@/components/users/profile/UserProfile'

export const dynamic = 'force-dynamic'

export default async function UserDetailPage({ params }: { params: { username: string } }) {
	return (
		<UserProfile username={params.username} />
	)
}