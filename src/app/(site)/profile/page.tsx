
import { Profile } from '@/components/profile/Profile'
import { Suspense } from 'react'

// NextJS force dynamic (TODO: Check this, it's not working... it's being cached)
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
	return (
		<Suspense>
			<Profile />
		</Suspense>
	)
}