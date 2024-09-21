
export function GameCard({ name, background_image }: { name: string, background_image: string }) {
	return (
		<article className='bg-slate-600/20 rounded border border-gray-400/50'>
			<h2 className='text-lg font-bold py-1 px-3'>{name}</h2>
			<img className='h-fit rounded-b object-cover' src={background_image} alt={name} />
		</article>
	)
}