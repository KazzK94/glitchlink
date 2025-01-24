
import { Profile } from '@/components/profile/Profile'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
	return (
		<Suspense>
			<Profile />
		</Suspense>
	)
}