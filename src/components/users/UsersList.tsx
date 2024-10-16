
import { getActiveUsers } from '@/services/users'
import { UserCard } from './UserCard'
import { getSocialLinks } from '@/services/socialLinks'
import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'

export async function UsersList({ users }: { users?: UserPublicInfo[] }) {

	if (!users) {
		users = await getActiveUsers(12)
	}
	const socialLinksList = await getSocialLinks()

	return (
		<ul className='text-xl text-neutral-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
			{users.map(foundUser => {
				// Check if user is already a friend
				const socialLink = socialLinksList?.find(link => link.userAId === foundUser.id || link.userBId === foundUser.id)
				const socialLinkStatus = parseSocialLink({ socialLink, targetId: foundUser.id })
				return (
					<li key={foundUser.id}>
						<UserCard user={foundUser}
							socialLinkId={socialLink?.id}
							socialLinkStatus={socialLinkStatus}
							className='bg-gray-700/10 hover:bg-gray-700/15 shadow-sm shadow-gray-400 hover:shadow-gray-200 p-3'
						/>
					</li>
				)
			})}
		</ul>
	)
}

function parseSocialLink({ socialLink, targetId }: { socialLink: ({ userAId: string, userBId: string, status: 'FRIENDS' | 'PENDING' | 'BLOCKED' }) | undefined, targetId: string }): SocialLinkDetailedStatus | undefined {
	if (!socialLink) return
	if (socialLink.status !== 'PENDING') return socialLink.status
	return socialLink.userAId === targetId // If userAId is targetId, logged user is userB
		? 'RECEIVED_PENDING' // This is when the logged user received the request
		: 'SENT_PENDING' // This is when the logged user sent the request
}