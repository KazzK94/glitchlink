import prisma from '@/lib/db'

export default async function UsersDashboardPage() {

	const users = await prisma.user.findMany()

	return (
		<>
			<h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Users</h2>
			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 text-black">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis w-36 inline-block">
									{user.id}
								</td>
								<td className="px-4 py-4 whitespace-nowrap">{user.name}</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm italic">@{user.username}</td>
								<td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
								<td className="px-4 py-4 whitespace-nowrap flex items-center gap-1">
									<span className='inline-block rounded size-3 mt-0.5' style={{ backgroundColor: user.color }} />
									{user.color}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
