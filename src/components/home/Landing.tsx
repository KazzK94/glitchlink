
import { Container } from '@/components/common/Container'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function Landing() {

	return (
		<>
			<Container className="py-20 md:py-28 text-center px-4" asSection>
				<h1 className="text-4xl lg:text-5xl font-bold mb-6">Connect with Gamers Worldwide</h1>
				<p className="text-lg lg:text-xl text-pretty max-w-4xl mx-auto mb-8 md:mb-12">
					Welcome to GlitchLink, the ultimate social network for gamers.
					Encounter fellow gamers, share your passion with posts and level up your gaming experience!
				</p>
				<Link href="/register">
					<Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-6 rounded-full text-xl font-semibold hover:from-cyan-600 hover:to-purple-600 active:contrast-150 transition-all">
						Join GlitchLink now!
					</Button>
				</Link>
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
				<h2 className="text-4xl font-bold mb-8 text-center">Why GlitchLink?</h2>
				<p className="text-xl text-center text-pretty max-w-4xl mx-auto">
					In GlitchLink we are working to create a safe space for gamers to connect, share, and grow together.
					Whether you&apos;re a casual player or a pro, GlitchLink was made for you.
				</p>
			</Container>

			<div className="bg-gray-800">
				<Container id="contact" className="py-20" asSection>
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold mb-8 text-center">Give us Feedback!</h2>
						<p className='text-xl text-center text-pretty'>
							If you have any suggestion or criticism about GlitchLink, please feel free to contact us on
							<span>
								&nbsp;
								<a className='text-blue-300' href="mailto:glitchlink.social@gmail.com">glitchlink.social@gmail.com</a>
								&nbsp;
							</span>
							and we will try to reply as soon as possible.
						</p>
					</div>
				</Container>
			</div>
		</>
	)
}

