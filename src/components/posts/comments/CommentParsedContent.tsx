
import { usePosts } from '@/hooks/usePosts'

/** Returns the Comment's content formatted, embedding the mentions and hashtags as links and creating <br>s for new lines */
export function CommentParsedContent({ content }: { content: string }) {
	const { parsePostContent } = usePosts()
	return (
		<div className='text-sm mt-3 pr-5 md:pr-8'>
			{content.trim().split('\n').map((line, index) => (
				<div key={index}>
					{parsePostContent(line)}
					<br />
				</div>
			))}
		</div>
	)
}
