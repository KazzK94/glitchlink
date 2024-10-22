import { Container } from '@/components/common/Container'

export function Footer() {
	return (
		<footer className="bg-gray-900 py-6 border-y border-t-gray-600 border-b-gray-800 mt-8">
			<Container className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
				<a href="#tos">Terms and Conditions</a>
				<a href="#contact">Contact Us</a>
			</Container>
		</footer>
	)
}