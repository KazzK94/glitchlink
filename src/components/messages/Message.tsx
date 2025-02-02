
export function Message({ message, loggedUser }: { message: { id: string, authorId: string, content: string, createdAt: Date }, loggedUser: { id: string } }) {
	const { id, authorId, content, createdAt } = message
	return <div key={id} className={`mb-3 first:mt-4 text-sm md:text-base ${authorId === loggedUser.id ? "text-right" : ""}`}>
		<div
			className={`inline-block max-w-[85%] p-2 px-3 rounded-lg ${authorId === loggedUser.id ? "bg-blue-600" : "bg-gray-700"}`}
		>
			{content}
		</div>
		<div className="text-xs text-gray-400 mt-1">{createdAt.toLocaleDateString()}</div>
	</div>
}