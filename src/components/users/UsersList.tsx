
import { getActiveUsers } from '@/services/users'
import { UserCard } from './UserCard'
import { getSelfSocialLinks } from '@/services/socialLinks'
import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'

export async function UsersList({ users, className, cardClassName, loggedUserId }: { users?: UserPublicInfo[], className?: string, cardClassName?: string, loggedUserId?: string, hideSelf?: boolean }) {

	if (!users) {
		users = await getActiveUsers(12)
	}
	const socialLinksList = await getSelfSocialLinks()

	return (
		<ul className={className}>
			{users.map(foundUser => {
				// Check if user is already a friend
				const socialLink = socialLinksList?.find(link => link.userAId === foundUser.id || link.userBId === foundUser.id)
				const socialLinkStatus = parseSocialLink({ socialLink, targetId: foundUser.id })

				return (
					<li key={foundUser.id}>
						<UserCard user={foundUser}
							socialLinkId={socialLink?.id}
							socialLinkStatus={socialLinkStatus}
							className={cardClassName}
							isSelf={foundUser.id === loggedUserId}
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