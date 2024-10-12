
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/nextAuthConfig'

import { Home } from '@/components/home/Home'
import { Landing } from '@/components/home/Landing'

export default async function HomePage() {

	const session = await getServerSession(authOptions)
	const userIsLogged = Boolean(session?.user)

	return (
		<div className="min-h-screen">
			<main>
				{
					userIsLogged
						? <Home />
						: <Landing />
				}
			</main>
		</div>
	)
}