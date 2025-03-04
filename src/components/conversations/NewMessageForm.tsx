
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SendIcon } from 'lucide-react'
import { useState } from 'react'

interface NewMessageFormProps {
	onSendMessage: (message: string) => void
}

export function NewMessageForm({ onSendMessage }: NewMessageFormProps) {

	const [messageInput, setMessageInput] = useState("")

	// Controlled input change
	const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageInput(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSendMessage(messageInput)
	}

	return (
		<form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
			<div className="flex">
				<Input
					type="text"
					placeholder="Type a message..."
					value={messageInput}
					autoFocus
					onChange={handleChangeMessageInput}
					className="flex-1 text-lg md:text-sm py-5 md:py-4 bg-gray-800 text-white border-gray-600 placeholder:text-white/60"
				/>
				<Button type="submit" className="ml-2 h-full border border-gray-400/80">
					<SendIcon className="size-5 md:size-4" />
				</Button>
			</div>
		</form>
	)
}