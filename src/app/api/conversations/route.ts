
import { getConversations} from '@/services/api/conversations'

export async function GET() {
	const posts = await getConversations()
	return Response.json(posts)
}
