
export function Debugger({ children }: { children: React.ReactNode }) {
	return <div className='absolute bottom-2 right-2 bg-black/85 backdrop-blur-lg rounded z-50'>
		{children}
	</div>
}