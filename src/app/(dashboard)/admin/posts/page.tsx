import prisma from '@/lib/db'
import { PostDeleteButton } from '../../components/PostDeleteButton'
import { DashboardTable, DashboardTableBody, DashboardTableCell, DashboardTableHeader, DashboardTableHeaders, DashboardTableRow } from '../../components/table/DashboardTable'

export default async function UsersDashboardPage() {

	const posts = await prisma.post.findMany({
		include: { author: true }
	})

	return (
		<>
			<h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Posts</h2>
			<DashboardTable>
				<DashboardTableHeaders>
					<DashboardTableHeader>ID</DashboardTableHeader>
					<DashboardTableHeader>Author</DashboardTableHeader>
					<DashboardTableHeader>Content</DashboardTableHeader>
					<DashboardTableHeader>DELETE POST</DashboardTableHeader>
				</DashboardTableHeaders>
				<DashboardTableBody>
					{posts.map((post) => (
						<DashboardTableRow key={post.id}>
							<DashboardTableCell>
								{post.id.substring(0, 16)}...
							</DashboardTableCell>
							<DashboardTableCell className=" italic">@{post.author.username}</DashboardTableCell>
							<DashboardTableCell>
								{post.content.substring(0, 100)}...
							</DashboardTableCell>
							<DashboardTableCell className=" flex justify-center">
								<PostDeleteButton postId={post.id} />
							</DashboardTableCell>
						</DashboardTableRow>
					))}
				</DashboardTableBody>
			</DashboardTable>
		</>
	)
}
