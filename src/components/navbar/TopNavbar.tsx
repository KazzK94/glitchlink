
import { Container } from '@/components/common/Container'
import { UserMenu } from './UserMenu'
import NavbarLinksResponsive from './NavbarLinksResponsive'

export function TopNavbar() {
	return (
		<header className="h-16 bg-gray-900 shadow-md shadow-black/20 z-50">
			<Container className='py-3 lg:px-2'>
				<div className="flex justify-between items-center">
					<NavbarLinksResponsive />
					<UserMenu />
				</div>
			</Container>
		</header>
	)
}
