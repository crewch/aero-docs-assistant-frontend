import { useEffect, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { useChatHistoryStore } from '@/shared/hooks/use-chat-history-store'
import { Skeleton } from '@/shared/ui/skeleton'
import { Message } from './message'

export const Main = () => {
	const { history } = useChatHistoryStore()

	const isFetchingSendMessage = useIsMutating({
		mutationKey: ['sendMessage'],
	})

	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (history.length) {
			bottomRef.current?.scrollIntoView({
				block: 'end',
				behavior: 'smooth',
			})
		}
	}, [history.length])

	const isEmptyChat = !history.length

	return (
		<main className="h-full overflow-y-auto flex flex-col gap-5 items-center grow pt-4">
			{isEmptyChat && (
				<p className="text-4xl font-semibold my-auto">
					Чем я могу помочь вам сегодня?
				</p>
			)}
			{history.map((message, id) => (
				<Message key={id} message={message} />
			))}
			{!!isFetchingSendMessage && (
				<div className="h-28 w-2/5">
					<Skeleton className="h-28" />
				</div>
			)}
			<div ref={bottomRef} className="h-1 w-2/5 pb-9" />
		</main>
	)
}
