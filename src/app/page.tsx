
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {

	return (
		<div className="min-h-screen">
			<main>
				<Container className="py-20 md:py-28 text-center px-4" asSection>
					<h1 className="text-4xl lg:text-5xl font-bold mb-6">Connect with Gamers Worldwide</h1>
					<p className="text-lg lg:text-xl mb-8 md:mb-12">Join GlitchLink, the ultimate social network for gamers. Find your squad, share your achievements, and level up your gaming experience!</p>
					<Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-6 rounded-full text-xl font-semibold hover:from-cyan-600 hover:to-purple-600 active:contrast-150 transition-all">
						Join the Community
					</Button>
				</Container>

				<div className='bg-gray-800'>
					<Container id="features" className="py-20" asSection>
						<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
							<div className="text-center">
								<h3 className="text-2xl font-semibold mb-4">Find Your Squad</h3>
								<p>Connect with gamers who share your interests and play style.</p>
							</div>
							<div className="text-center">
								<h3 className="text-2xl font-semibold mb-4">Share Achievements</h3>
								<p>Showcase your gaming milestones and celebrate with the community.</p>
							</div>
							<div className="text-center">
								<h3 className="text-2xl font-semibold mb-4">Organize Events</h3>
								<p>Create and join gaming events, tournaments, and watch parties.</p>
							</div>
						</div>
					</Container>
				</div>

				<Container id="about" className="container mx-auto py-20 px-4" asSection>
					<h2 className="text-4xl font-bold mb-8 text-center">About GlitchLink</h2>
					<p className="text-xl text-center text-pretty max-w-3xl mx-auto">
						GlitchLink is more than just a social network - it&apos;s a vibrant community of passionate gamers.
						We are dedicated to creating a space where gamers can connect, share, and grow together.
						Whether you&apos;re a casual player or a pro, GlitchLink is your home.
					</p>
				</Container>

				<div className="bg-gray-800">
					<Container id="contact" className="py-20" asSection>
						<div className="container mx-auto px-4">
							<h2 className="text-4xl font-bold mb-8 text-center">Stay Connected</h2>
							<form className="max-w-md mx-auto">
								<Input type="email" placeholder="Enter your email" className="mb-4 w-full" />
								<Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded-md text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all">
									Subscribe to Updates
								</Button>
							</form>
						</div>
					</Container>
				</div>
			</main>

			<Footer />
		</div>
	)
}