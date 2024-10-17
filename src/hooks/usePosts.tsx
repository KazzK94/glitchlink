'use client'

export function usePosts() {
	const parsePostContent = (text: string) => {
		const words = text.split(/(\s+)/)
		return words.map((word, index) => {
			if (/^@\w+$/.test(word)) {
				return <span key={index} className="text-blue-500">{word}</span>
			} else if (/^#\w+$/.test(word)) {
				return <span key={index} className="text-gray-500">{word}</span>
			}
			return word
		})
	}

	return { parsePostContent }
}
