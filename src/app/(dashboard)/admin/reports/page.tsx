
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getReports } from '@/services/api/reports'
import Link from 'next/link'

export default async function ReportsPage() {

	const reports = await getReports()

	if (!reports || reports.length === 0) {
		return <p className='h-full grid justify-center items-center pb-12 text-4xl text-slate-500'>No reports filed yet</p>
	}

	return (
		<>
			<h1 className='text-3xl mb-4'>Filed reports</h1>
			<div className='flex flex-col gap-2'>
				{
					reports.map(report => (
						<Link href={`/admin/reports/${report.id}`} key={report.id} >
							<Card key={report.id} className='bg-gray-300 hover:bg-gray-200'>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pointer-events-none">
									<CardTitle className="text-sm font-medium">
										Reported by @{report.generatedBy.username} · <span className='italic opacity-50'>{report.updatedAt.toLocaleDateString()}</span>
									</CardTitle>
								</CardHeader>
								<CardContent className='pointer-events-none'>
									<p>
										<strong>Entity:</strong>&nbsp;
										<span>{report.entityType}</span>
									</p>
									<p>
										<strong>Entity ID:</strong>&nbsp;
										<span className='text-blue-800'>{report.entityId}</span>
									</p>
									<p>
										<strong>Reason:</strong>&nbsp;
										<span className='text-red-700'>{report.reason}</span>
									</p>
								</CardContent>
							</Card>
						</Link>
					))
				}
			</div>
		</>
	)
}
