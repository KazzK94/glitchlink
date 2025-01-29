
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCommentById, getPostById } from '@/services/posts'
import { getReportById } from '@/services/reports'
import { User } from '@prisma/client'
import Link from 'next/link'


export default async function ReportDetailPage({ params }: { params: { reportId: string } }) {

	const report = await getReportById({ id: params.reportId })

	if (!report) {
		return <p className='h-full grid justify-center items-center pb-12 text-4xl text-red-500'>Error 404: Report not found</p>
	}

	return (
		<>
			<h1 className='text-3xl mb-4'>Report Detail</h1>
			{report.entityType === 'POST' && <PostReportDetailCard report={report} />}
			{report.entityType === 'COMMENT' && <CommentReportDetailCard report={report} />}
		</>
	)
}


interface PostReportDetailCardProps {
	report: {
		id: string
		generatedBy: User
		createdAt: Date
		updatedAt: Date
		entityId: string
		reason: string
	}
}

async function PostReportDetailCard({ report }: PostReportDetailCardProps) {

	const post = await getPostById(report.entityId)

	if (!post) {
		return <p className='h-full grid justify-center items-center pb-12 text-4xl text-red-500'>Error 404: Post not found</p>
	}

	return (
		<Card key={report.id} className='bg-gray-200'>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					<ReportedBy username={report.generatedBy.username} createdAt={report.createdAt} />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='mt-1 px-1'>
					<h3 className='font-bold text-lg'>Post Content</h3>
					<span className='text-purple-900'>{post.content}</span>
				</div>
				<div className='mt-4 px-1'>
					<h3 className='font-bold text-lg'>Report Reason</h3>
					<span className='text-red-700'>{report.reason}</span>
				</div>
				<div className='mt-4 px-1'>
					<h3 className='font-bold text-lg'>Post Data</h3>
					<div className='px-2'>
						<p>
							<strong className='font-semibold'>Author:</strong>&nbsp;
							<Link href={`/u/${post.author.username}`} className='text-blue-700 hover:opacity-80'>
								<span>{post.author.name}</span>&nbsp;
								<span className='italic opacity-80'>(@{post.author.username})</span>
							</Link>
						</p>
						<p>
							<strong className='font-semibold'>Total Comments:</strong>&nbsp;
							<span>{post.comments.length}</span>
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}


interface CommentReportDetailCardProps {
	report: {
		id: string
		generatedBy: User
		createdAt: Date
		updatedAt: Date
		entityId: string
		reason: string
	}
}

async function CommentReportDetailCard({ report }: CommentReportDetailCardProps) {

	const comment = await getCommentById(report.entityId)

	if (!comment) {
		return <p className='h-full grid justify-center items-center pb-12 text-4xl text-red-500'>Error 404: Post not found</p>
	}

	return (
		<Card key={report.id} className='bg-gray-200'>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					<ReportedBy username={report.generatedBy.username} createdAt={report.createdAt} />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='mt-1 px-1'>
					<h3 className='font-bold text-lg'>Comment Content</h3>
					<span className='text-purple-900'>{comment.content}</span>
				</div>
				<div className='mt-3 px-1'>
					<h3 className='font-bold text-lg'>Report Reason</h3>
					<span className='text-red-700'>{report.reason}</span>
				</div>
				<div className='mt-3 px-1'>
					<h3 className='font-bold text-lg'>Comment Data</h3>
					<div className='px-2'>
						<p>
							<strong className='font-semibold'>Author:</strong>&nbsp;
							<Link href={`/u/${comment.author.username}`} className='text-blue-700 hover:underline hover:opacity-90'>
								<span>{comment.author.name}</span>&nbsp;
								<span className='italic opacity-80'>(@{comment.author.username})</span>
							</Link>
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function ReportedBy({ username, createdAt }: { username: string, createdAt: Date }) {
	return (
		<>
			Reported by <Link href={`/u/${username}`} className='text-blue-800 hover:underline'>@{username}</Link> · <span className='italic opacity-50'>{createdAt.toLocaleDateString()}</span>
		</>
	)
}