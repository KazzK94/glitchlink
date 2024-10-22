import Link from 'next/link'

export function PostMention({username}: {username: string}) {
	return (
		<Link href={`/u/${username}`} className="text-blue-400 hover:text-blue-500">@{username}</Link>
	)
}