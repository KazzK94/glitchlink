
export function extractMentions(content: string): string[] {
	const MENTIONS_REGEX = /\B@(\w+)\b/g
	const mentions = []
	let match
	while ((match = MENTIONS_REGEX.exec(content)) !== null) {
		mentions.push(match[1])
	}
	return mentions
}
