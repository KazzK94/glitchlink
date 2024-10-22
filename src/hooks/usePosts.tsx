'use client'

import { PostHashtag } from '@/components/posts/parseds/Hashtag'
import { PostMention } from '@/components/posts/parseds/Mention'
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
		  } else if (/^#\w+$/.test(word)) {
			return <PostHashtag key={index} hashtag={word} />
		  }
		  return word
		})
	  }

	return { parsePostContent }
}
