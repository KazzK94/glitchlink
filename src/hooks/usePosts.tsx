'use client'

import Link from 'next/link'

export function usePosts() {
	const parsePostContent = (text: string) => {
		const words = text.split(/(\s+)/)
		return words.map((word, index) => {
			if (/^@\w+$/.test(word)) {
				return <Link href={`/u/${word.substring(1, word.length)}`} key={index} className="text-blue-500 hover:underline">{word}</Link>
			} else if (/^#\w+$/.test(word)) {
				return <Link href='#' key={index} className="text-gray-400 hover:underline">{word}</Link>
			}
			return word
		})
	}

	return { parsePostContent }
}
