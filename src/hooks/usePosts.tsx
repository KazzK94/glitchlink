'use client'

import { PostHashtag } from '@/components/posts/parseds/Hashtag'
import { PostMention } from '@/components/posts/parseds/Mention'
import Link from 'next/link'
import { Fragment } from 'react'

export function usePosts() {
	const parsePostContent = (text: string) => {
		const words = text.split(/(\s+)/)
		return words.map((word, index) => {
			// Match mentions: start with @, followed by letter, then letters/numbers/underscores, followed by any characters
			const mentionMatch = word.match(/^@([a-zA-Z]\w+)(.*)$/)
			if (mentionMatch) {
				return (
					<Fragment key={index}>
						<PostMention username={mentionMatch[1]} />
						{mentionMatch[2]}
					</Fragment>
				)
			}
			const hashtagMatch = word.match(/^#(\w+)(.*)$/)
			if (hashtagMatch) {
				return <PostHashtag key={index} hashtag={word} />
			}
			const urlMatch = word.match(/(https?:\/\/[^\s]+)/)
			if (urlMatch) {
				return (
					<Link key={index} href={urlMatch[1]} className='text-blue-500 italic hover:underline'>
						{urlMatch[1]}
					</Link>
				)
			}
			return word
		})
	}

	return { parsePostContent }
}
