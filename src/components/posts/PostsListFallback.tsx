
import { Skeleton } from "@/components/ui/skeleton"

export function PostsListFallback() {
	return (
		<div className="space-y-4">
			<PostFallback />
			<PostFallback />
			<PostFallback />
		</div>
	)
}

export default function PostFallback() {
	return (
		<article className={`bg-gray-800 pt-4 pb-2 rounded-lg`}>
			{/* Post Author */}
			<div className='flex justify-between mb-4 px-4'>
				<div className="flex items-center">
					<Skeleton className='size-10 rounded-full mr-3' />
					<div className='space-y-1'>
						<Skeleton className='w-20 h-6' />
						<Skeleton className='w-12 h-4' />
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8'>
					<Skeleton className='w-2 h-6' />
				</button>
			</div>
			{/* Post Content */}
			<div className='w-full mb-5 px-4'>
				<Skeleton className='h-20' />
			</div>

			{/* Buttons */}
			<div className='px-4 sm:px-6 flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<Skeleton className='w-6 h-6' />
					<Skeleton className='w-6 h-6' />
					<Skeleton className='w-6 h-6' />
				</div>
				<div className='hidden sm:block'>
					<Skeleton className='w-12 h-3' />
				</div>
			</div>
		</article>
	)
}
