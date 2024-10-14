
import { Button } from '../ui/button'

export function CreatePostForm() {
	return (
		<div className="bg-gray-800 px-6 py-5 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">What&apos;s on your mind?</h2>
			<textarea
				className="w-full min-h-20 max-h-[50vh] bg-gray-700 text-white rounded-md p-3 mb-3"
				rows={3}
				placeholder="Share your thoughts..."
			></textarea>
			<div className='flex w-full justify-end'>
				<Button className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-purple-600">
					Create post
				</Button>
			</div>
		</div>
	)
}
