
export default function LoadingPage() {
	return <div className='h-full pb-20 grid justify-center items-center gap-4'>
		<div className='animate-pulse flex flex-col items-center gap-4'>
			<svg
				className="block h-[var(--uib-size)] w-[var(--uib-size)] transform-origin-center overflow-visible"
				x="0px"
				y="0px"
				viewBox="0 0 37 37"
				height="37"
				width="37"
				preserveAspectRatio="xMidYMid meet"
			>
				<path
					className="track stroke-[5] fill-none stroke-current opacity-[var(--uib-bg-opacity)]"
					pathLength="100"
					d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"></path>
				<path
					className="car stroke-[5] fill-none stroke-current stroke-dasharray-[15_85] stroke-dashoffset-0 rounded-[100%]"
					pathLength="100"
					d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"></path>
			</svg>

			<h1 className='text-3xl pl-2'>Loading...</h1>
		</div>
	</div>
}
