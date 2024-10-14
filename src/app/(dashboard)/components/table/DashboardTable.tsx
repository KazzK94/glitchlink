
export function DashboardTable({ children }: { children: React.ReactNode }) {
	return (
		<div className='rounded-lg overflow-x-auto'>
			<table className="w-full">
				{children}
			</table>
		</div>
	)
}

export function DashboardTableHeaders({ children }: { children: React.ReactNode }) {
	return (
		<thead className="bg-gray-50">
			<tr>
				{children}
			</tr>
		</thead>
	)
}

export function DashboardTableHeader({ children }: { children: React.ReactNode }) {
	return (
		<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			{children}
		</th>
	)
}

export function DashboardTableBody({ children }: { children: React.ReactNode }) {
	return (
		<tbody className="bg-white divide-y divide-gray-200 text-black">
			{children}
		</tbody>
	)
}

export function DashboardTableRow({ children }: { children: React.ReactNode }) {
	return (
		<tr>
			{children}
		</tr>
	)
}

export function DashboardTableCell({ children, className }: { children: React.ReactNode, className?: string }) {
	return (
		<td className={`px-4 py-4 whitespace-nowrap ${className}`}>
			{children}
		</td>
	)
}

