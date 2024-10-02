
import { Container } from '@/components/Container'
import { UserButton } from './UserButton'
import NavbarLinksResponsive from './NavbarLinksResponsive'

export function TopNavbar() {

	return (
		<header className="sticky top-0 bg-gray-900 shadow-md shadow-black/20 z-50">
			<Container className='py-4 lg:px-2'>
				<div className="flex justify-between items-center">
					<NavbarLinksResponsive />
					<UserButton />
				</div>
			</Container>
		</header>
	)
}
