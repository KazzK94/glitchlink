import prisma from '@/lib/db'
import { DashboardTable, DashboardTableBody, DashboardTableCell, DashboardTableHeader, DashboardTableHeaders, DashboardTableRow } from '../../components/table/DashboardTable'

export default async function UsersDashboardPage() {

	const users = await prisma.user.findMany()

	return (
		<>
			<h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Users</h2>
			<DashboardTable>
				<DashboardTableHeaders>
					<DashboardTableHeader>ID</DashboardTableHeader>
					<DashboardTableHeader>Name</DashboardTableHeader>
					<DashboardTableHeader>Username</DashboardTableHeader>
					<DashboardTableHeader>Email</DashboardTableHeader>
				</DashboardTableHeaders>
				<DashboardTableBody>
					{users.map((user) => (
						<DashboardTableRow key={user.id}>
							<DashboardTableCell>
								{user.id.substring(0, 16)}...
							</DashboardTableCell>
							<DashboardTableCell>{user.name}</DashboardTableCell>
							<DashboardTableCell className="italic">@{user.username}</DashboardTableCell>
							<DashboardTableCell>{user.email}</DashboardTableCell>
						</DashboardTableRow>
					))}
				</DashboardTableBody>
			</DashboardTable>
		</>
	)
}
