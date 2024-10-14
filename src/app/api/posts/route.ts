
import { createPost, getPosts } from '@/services/posts'
import { NextRequest } from 'next/server'

export async function GET() {
	const posts = await getPosts()
	return Response.json(posts)
}

export async function POST(request: NextRequest) {
	const body = await request.json()
	const post = await createPost(body)
	return Response.json(post)
}
