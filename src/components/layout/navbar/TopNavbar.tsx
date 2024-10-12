
import { Container } from '@/components/Container'
import { UserMenu } from './UserMenu'
import NavbarLinksResponsive from './NavbarLinksResponsive'

export function TopNavbar() {
	return (
		<header className="sticky top-0 bg-gray-900 shadow-md shadow-black/20 z-50">
			<Container className='py-3 lg:px-2'>
				<div className="flex justify-between items-center px-1 sm:px-2">
					<NavbarLinksResponsive />
					<UserMenu />
				</div>
			</Container>
		</header>
	)
}
