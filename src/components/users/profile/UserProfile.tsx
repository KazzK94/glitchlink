
import { Container } from '../../common/Container'
import { EditIcon, LogOutIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import { LogoutButton } from '../../auth/LogoutButton'

import { getUserProfile } from '@/services/api/users'

import { BookUserIcon, Gamepad2Icon, MessageSquareIcon } from 'lucide-react'

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from '../Avatar'
import { ProfileVideoGames } from './ProfileVideogames'
import { ProfilePosts } from './ProfilePosts'
import { ProfileFriendsList } from './ProfileFriendsList'
import { UserContextOpener } from './UserContextOpener'
import { UserSocialLinkInteractions } from '../UserSocialLinkInteractions'

export async function UserProfile({ username }: { username?: string }) {

	const loggedUser = await getUserProfile()
	if (!username && !loggedUser) return <UserNotFound />
	const targetUser = await getUserProfile({ username: username || loggedUser!.username })
	if (!targetUser) return <UserNotFound />

	const isSelf = loggedUser?.id === targetUser.id
	const socialLink = isSelf ? null : loggedUser?.socialLinks.find(socialLink => {
		return socialLink.user.id === targetUser.id
	})
	const isFriend = socialLink && socialLink.status === 'FRIENDS'

	return (
		<Container className='mt-4 pb-4'>
			<div className='px-2 pt-2'>
				{/* Top Right Buttons */}
				{
					isSelf ? (
						<div className='float-right flex items-center gap-3'>
							<Link href='/profile/edit' className='flex items-center border-2 rounded-lg p-3 z-10 text-slate-300 border-slate-300'>
								<EditIcon size={20} />
							</Link>
							<LogoutButton formClassName='z-10' className='flex items-center border-2 rounded-lg p-3 z-10 text-red-400 border-red-400'>
								<LogOutIcon size={20} />
							</LogoutButton>
						</div>
					) : (
						<div className='float-right flex items-center gap-1'>
							{
								isFriend ? (
									<Link href={`/messages/${targetUser.username}`} className='flex items-center rounded-lg p-2.5 z-10 text-purple-300 border-purple-300/80 hover:text-purple-300 hover:border-purple-400'>
										<MailIcon className='size-7' />
									</Link>
								) : (
									<UserSocialLinkInteractions user={targetUser} socialLink={socialLink} />
								)
							}
							<UserContextOpener user={targetUser} />
						</div>
					)
				}

				{/* Heading Content */}
				<div className="flex gap-4 items-center ml-2">
					<div>
						<Avatar src={targetUser.avatar} className='size-16' />
					</div>
					<div>
						<h1 className='text-2xl md:text-3xl font-semibold text-blue-200'>
							{targetUser.name}
						</h1>
						<p className='text-sm opacity-80 mt-0 ml-1'>
							@{targetUser.username}
						</p>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<Tabs defaultValue='games' className='mt-5'>
				<TabsList className='p-1 h-12 grid grid-cols-3 gap-0.5 bg-white/5'>
					<TabsTrigger value='games' className='flex gap-1 items-center h-full'>
						<Gamepad2Icon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>Video Games</span>
					</TabsTrigger>
					<TabsTrigger value='posts' className='flex gap-1 items-center h-full'>
						<MessageSquareIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>Posts</span>
					</TabsTrigger>
					<TabsTrigger value='friends' className='flex gap-1 items-center h-full'>
						<BookUserIcon size={24} />
						<span className='hidden sm:inline md:text-base md:ml-1'>Friends</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='games'>
					<ProfileVideoGames videoGames={targetUser.videoGames} loggedUserVideoGames={loggedUser?.videoGames} isSelf={isSelf} />
				</TabsContent>
				<TabsContent value='posts'>
					<ProfilePosts posts={targetUser.posts} loggedUserId={targetUser.id} />
				</TabsContent>
				<TabsContent value='friends'>
					<ProfileFriendsList friends={targetUser.socialLinks.map(socialLink => socialLink.user)} loggedUserId={loggedUser?.id} />
				</TabsContent>
			</Tabs>
		</Container>
	)
}

function UserNotFound() {
	return <Container asSection className='mt-8 text-xl text-center italic opacity-80'>404: User not found</Container>
}