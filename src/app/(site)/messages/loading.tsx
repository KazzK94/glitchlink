
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingMessagesContainer() {
	return (
		<div className="flex-1 flex flex-col h-full">
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
	)
}
