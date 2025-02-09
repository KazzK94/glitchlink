
import { Container } from '@/components/common/Container'
import { UserMenu } from './UserMenu'
import NavbarLinksResponsive from './NavbarLinksResponsive'

export function TopNavbar({ loggedUserId }: { loggedUserId?: string }) {
	return (
		<header className="h-16 bg-gray-900 shadow-md shadow-black/20 z-50">
			<Container className='py-3 lg:px-2'>
				<div className="flex justify-between items-center">
					<NavbarLinksResponsive loggedUserId={loggedUserId} />
					<UserMenu loggedUserId={loggedUserId} />
				</div>
			</Container>
		</header>
	)
}
