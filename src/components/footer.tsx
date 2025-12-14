import { useState, type ChangeEvent } from 'react'
import { Loader, Send } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { chatService } from '@/services/chat-service'
import { useChatHistoryStore } from '@/shared/hooks/use-chat-history-store'

export const Footer = () => {
	const [text, setText] = useState('')

	const addMessage = useChatHistoryStore((state) => state.addMessage)
	const deleteLastMessage = useChatHistoryStore(
		(state) => state.deleteLastMessage
	)

	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (message: string) =>
			chatService.sendMessage({ request: message }),
		onSuccess: ({ data }) => {
			addMessage({
				sender: 'bot',
				message: data.response,
				onTextBased: data.onTextBased,
			})
		},
		onError: () => {
			const lastMessage = deleteLastMessage()

			setText(lastMessage)
		},
	})

	const sendText = () => {
		sendMessage(text)
		addMessage({
			sender: 'user',
			message: text,
		})
		setText('')
	}

	const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}

	const isDisable = !text || isPending

	return (
		<footer className="h-16 min-h-16 flex justify-center items-start">
			<div className="w-2/5 flex gap-2 pt-1">
				<Textarea
					value={text}
					onChange={handleChangeText}
					onKeyDown={(e) => {
						if (e.ctrlKey && e.key === 'Enter' && !isDisable) {
							sendText()
						}
					}}
					disabled={isPending}
					placeholder="Сообщение"
					className="resize-none min-h-10 h-10 overflow-hidden"
				/>
				<Button
					onClick={sendText}
					disabled={isDisable}
					variant="outline"
					size="icon-lg"
				>
					{isPending ? <Loader className="animate-spin" /> : <Send />}
				</Button>
			</div>
		</footer>
	)
}
