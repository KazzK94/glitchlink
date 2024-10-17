'use client'

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
				<Link href={`/u/${mentionMatch[1]}`} className="text-blue-500 hover:underline">@{mentionMatch[1]}</Link>
				{mentionMatch[2]}
			  </Fragment>
			)
		  } else if (/^#\w+$/.test(word)) {
			return <Link href='#' key={index} className="text-gray-400 hover:underline">{word}</Link>
		  }
		  return word
		})
	  }

	return { parsePostContent }
}
