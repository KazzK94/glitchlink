
import Link from 'next/link'

export function PostHashtag({ hashtag }: { hashtag: string }) {
	const hashtagWord = hashtag[0] === '#' ? hashtag.replace('#', '') : hashtag
	return (
		<Link href={`/posts?hashtag=${hashtagWord}`} className="font-semibold text-gray-300 hover:text-gray-400 hover:underline">
			{hashtag}
		</Link>
	)
}