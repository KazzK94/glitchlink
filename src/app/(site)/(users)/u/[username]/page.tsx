
import { Container } from '@/components/common/Container'
import { getUserByUsername } from '@/services/users'

export default async function UserDetailPage({ params }: { params: { username: string } }) {

	const user = await getUserByUsername({ username: params.username })

	// If no user: show error message "User Not Found"
	if (!user) return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: User not found</Container>

	return (
		<Container className='mt-4'>
			<h1 className='text-3xl font-semibold'>{user.name}</h1>
			<p className='italic opacity-80 text-base mt-0.5 ml-1'>@{user.username}</p>

			<h2 className='text-2xl mt-6'>{user.name}&apos;s Video Games</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3'>
				{
					user.videoGames.map((videogame, index) => (
						<div key={index} className='p-2 bg-slate-600/30 rounded'>
							<p className='text-center'>{videogame.title}</p>
						</div>
					))
				}
			</div>
		</Container>
	)
}