
export function DashboardTable({ children }: { children: React.ReactNode }) {
	return (
		<div className='rounded-md overflow-x-auto'>
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
		<tbody className="bg-gray-100/90 divide-y divide-gray-400 text-black">
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

