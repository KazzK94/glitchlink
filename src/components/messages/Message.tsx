
export function Message({ message, loggedUser, className }: { message: { id: string, authorId: string, content: string, createdAt: Date }, loggedUser: { id: string }, className?: string }) {
	const { id, authorId, content, createdAt } = message

	return <div key={id} className={`text-sm md:text-base ${authorId === loggedUser.id ? "text-right" : ""} ${className}`}>
		<div
			className={`inline-block max-w-[85%] p-2 px-3 rounded-lg ${authorId === loggedUser.id ? "bg-blue-600" : "bg-gray-700"}`}
		>
			{content}
		</div>
		<p className="text-xs italic opacity-40 mt-0.5 mx-1.5">{new Date(createdAt).toLocaleDateString()}</p>
	</div>
}