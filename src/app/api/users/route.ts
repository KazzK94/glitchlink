
import { getUsers } from '@/services/users'

// TODO: DELETE THIS GET
export async function GET() {
	const users = await getUsers()
	return Response.json(users)
}
