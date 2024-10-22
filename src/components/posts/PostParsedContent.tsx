
import { usePosts } from '@/hooks/usePosts'

/** Returns the Post's content formatted, embedding the mentions and hashtags as links and creating <br>s for new lines */
export function PostParsedContent({ content }: { content: string }) {
	const { parsePostContent } = usePosts()
	return (
		<div className='mb-5 px-4'>
			{content.trim().split('\n').map((line, index) => (
				<div key={index}>
					{parsePostContent(line)}
					<br />
				</div>
			))}
		</div>
	)
}
