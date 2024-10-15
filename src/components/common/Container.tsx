
interface ContainerProps {
	children: React.ReactNode
	id?: string
	className?: string
	asSection?: boolean
}

export function Container({ children, id, className, asSection }: ContainerProps) {
	return asSection 
		? <section id={id} className={`max-w-[1080px] mx-auto px-4 ${className}`}>{children}</section> 
		: <div id={id} className={`max-w-[1080px] mx-auto px-4 ${className}`}>{children}</div>
}
