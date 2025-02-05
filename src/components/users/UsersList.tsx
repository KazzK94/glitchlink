
import { getActiveUsers } from '@/services/users'
import { UserSmallCard } from './UserCard'
import { SocialLinkDetailedStatus, UserPublicInfo } from '@/types'
import { getUserFromSession } from '@/services/auth'


interface UserWithSelfSocialLink extends UserPublicInfo {
	socialLink: {
		id: string,
		status: SocialLinkDetailedStatus
	}
}

interface UserListsProps {
	users?: UserWithSelfSocialLink[],
	className?: string
	cardClassName?: string
	hideSelf?: boolean
}

export async function UsersList({ users, className, cardClassName }: UserListsProps) {

	if (!users) {
		users = await getActiveUsers(12)
	}

	const loggedUser = await getUserFromSession()

	return (
		<ul className={className}>
			{users.map(foundUser => {
				// Check if user is already a friend
				return (
					<li key={foundUser.id}>
						<UserSmallCard user={foundUser}
							socialLink={foundUser.socialLink}
							className={cardClassName}
							isSelf={foundUser.id === loggedUser?.id}
						/>
					</li>
				)
			})}
		</ul>
	)
}
