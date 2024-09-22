/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{
			//'media.rawg.io'
			// 'https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg'
			protocol: 'https',
			hostname: 'media.rawg.io',
			pathname: '**'
		}],
	}
};

export default nextConfig;
