
import { getUsers } from '@/services/api/users'

// TODO: DELETE THIS GET
export async function GET() {
	const users = await getUsers()
	return Response.json(users)
}
