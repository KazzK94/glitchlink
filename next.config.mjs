/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				// 'https://media.rawg.io'
				protocol: 'https',
				hostname: 'media.rawg.io',
				pathname: '**'
			},
			{
				// https://res.cloudinary.com
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '**'
			}
		],
	}
}

export default nextConfig
