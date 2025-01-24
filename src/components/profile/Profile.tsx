
import { redirect } from 'next/navigation'
import { getUserProfile } from '@/services/users'
import { getUserFromSession } from '@/services/auth'
import { BookUserIcon, Gamepad2Icon, MessageSquareIcon } from 'lucide-react'

// Components
import { Container } from '@/components/common/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyFriendsList } from './MyFriendsList'
import { MyVideoGames } from './MyVideogames'
import { MyPosts } from './MyPosts'
import { ProfileHeading } from './ProfileHeading'

// NextJS force dynamic (TODO: Check this, it's not working... it's being cached)
export const dynamic = 'force-dynamic'

export async function Profile({ userId }: { userId?: string }) {

	const loggedUser = await getUserFromSession()
	if (!loggedUser) {
		redirect('/login')
	}
	const user = await getUserProfile(userId || loggedUser?.id)
	if (!user) {
		redirect('/login')
	}

	return (
		<Container asSection className='mt-4 relative'>
			<ProfileHeading user={user} />

			<Tabs defaultValue='games' className='mt-6'>
				<TabsList className='p-1 h-12 grid grid-cols-3 gap-0.5 bg-white/5'>
					<TabsTrigger value='games' className='flex gap-1 items-center h-full'>
						<Gamepad2Icon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>My Video Games</span>
					</TabsTrigger>
					<TabsTrigger value='posts' className='flex gap-1 items-center h-full'>
						<MessageSquareIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>My Posts</span>
					</TabsTrigger>
					<TabsTrigger value='friends' className='flex gap-1 items-center h-full'>
						<BookUserIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>Friends List</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='games'>
					<MyVideoGames videoGames={user.videoGames} />
				</TabsContent>
				<TabsContent value='posts'>
					<MyPosts loggedUserId={user.id} posts={user.posts} />
				</TabsContent>
				<TabsContent value='friends'>
					<MyFriendsList friends={user.socialLinks} />
				</TabsContent>
			</Tabs>
		</Container>
	)
}
