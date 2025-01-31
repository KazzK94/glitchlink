
export function Message({ id, sender, content, timestamp }: { id: number, sender: string, content: string, timestamp: string }) {
	return <div key={id} className={`mb-3 first:mt-4 text-sm md:text-base ${sender === "You" ? "text-right" : ""}`}>
		<div
			className={`inline-block max-w-[85%] p-2 px-3 rounded-lg ${sender === "You" ? "bg-blue-600" : "bg-gray-700"}`}
		>
			{content}
		</div>
		<div className="text-xs text-gray-400 mt-1">{timestamp}</div>
	</div>
}