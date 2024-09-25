import { Container } from '@/components/Container'
import { getUserById } from '@/services/users'

export default async function UserDetailPage({ params }: { params: { id: string } }) {

	const user = await getUserById(params.id)

	if (!user) return <p>User Not Found</p>

	return (
		<Container className='mt-4'>
			<h1 className='text-2xl mb-2'>User Detail</h1>
			<div className='p-2 bg-slate-600/30 rounded'>
				{
					user === null
						? <span>User not found</span>
						: Object.entries(user).map(([key, value]) => (
							<p key={key} className='space-x-4'>
								<span>{key}:</span>
								<span>{JSON.stringify(value)}</span>
							</p>
						))
				}
			</div>
		</Container>
	)
}