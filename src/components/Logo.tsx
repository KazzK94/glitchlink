
export function Logo({ size = 40 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
			<rect width="200" height="200" fill="transparent" />
			<defs>
				<linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#00ffff" />
					<stop offset="100%" stopColor="#ff00ff" />
				</linearGradient>
			</defs>
			<g filter="url(#glitch)">
				<path d="M40 40 L100 40 L100 100 L60 100 L60 140 L140 140 L140 100 L100 100 L100 80 L160 80 L160 160 L40 160 Z"
					fill="url(#glowGradient)"
					stroke="#ffffff"
					strokeWidth="4" />
			</g>
		</svg>
	)
}