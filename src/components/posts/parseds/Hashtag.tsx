
import Link from 'next/link'

export function PostHashtag({ hashtag }: { hashtag: string }) {
	return (
		<Link href={`#`} className="font-semibold text-gray-300 hover:text-gray-400 hover:underline">
			{hashtag}
		</Link>
	)
}