
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingMessagesContainer({ className }: { className?: string }) {
	return (
		<div className={`flex h-full bg-gray-900 text-white ${className}`}>
			{/* Conversation List */}
			<div
				className="w-full md:w-1/3 border-r border-gray-700 bg-gray-800/80 backdrop-blur-md h-[calc(100vh_-_64px)] absolute md:relative z-10 -left-full md:left-0"
			>
				<ScrollArea className='h-full'>
					{
						[1,2,3].map((_, i) => (
							<div key={i} className="flex items-center p-4 cursor-pointer">
								<div className='size-12 flex-grow-0 flex-shrink-0 bg-gray-400/20 rounded-full' />
								<div className="ml-4 flex flex-col gap-2">
									<Skeleton className='w-28 h-4 bg-white/10' />
									<Skeleton className='w-40 h-3 bg-white/10' />
								</div>
							</div>
						))
					}
				</ScrollArea>
			</div>

			{/* Conversation View */}
			<div className="flex-1 flex flex-col">
				{/* Conversation Header */}
				<div className="p-4 flex items-center justify-between border-b border-gray-700">
					<div className='flex items-center gap-4'>
						<Skeleton className='size-12 bg-gray-400/20 rounded-full' />
						<div className="flex flex-col gap-2">
							<Skeleton className='w-24 h-4 bg-white/10' />
							<Skeleton className='w-16 h-3 bg-white/10' />
						</div>
					</div>
				</div>

				{/* Messages */}
				<ScrollArea className="flex-1 px-4 bg-gray-800/40">
					<div className='flex flex-col-reverse gap-3 pb-3'>
					</div>
				</ScrollArea>

				{/* Message Input */}
				<div className="p-4 border-t border-gray-700">
					<div className="flex">
						<Skeleton className='flex-1 h-9 bg-gray-500/20' />
						<Skeleton className='ml-2 w-12 h-9 border border-gray-400/80 bg-black/50' />
					</div>
				</div>
			</div>
		</div>
	)
}
