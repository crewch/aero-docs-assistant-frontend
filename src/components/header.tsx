import { useIsMutating } from '@tanstack/react-query'
import { MessageCirclePlus } from 'lucide-react'
import { useChatHistoryStore } from '@/shared/hooks/use-chat-history-store'
import { Button } from '@/shared/ui/button'
import { ModeToggle } from '@/shared/ui/mode-toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { toast } from 'sonner'

export const Header = () => {
	const { clearHistory, history } = useChatHistoryStore()

	const isFetchingSendMessage = useIsMutating({
		mutationKey: ['sendMessage'],
	})

	const handleClearHistory = () => {
		clearHistory()

		toast.info('Создан новый чат')
	}

	const isDisabledButton = !history.length || !!isFetchingSendMessage

	return (
		<header className="h-16 min-h-16 flex items-center justify-between px-20">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={handleClearHistory}
						disabled={isDisabledButton}
						variant={'outline'}
						size={'icon-lg'}
					>
						<MessageCirclePlus />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Создать новый чат</p>
				</TooltipContent>
			</Tooltip>
			<h1 className="text-2xl font-bold">Aero Nexus</h1>
			<ModeToggle />
		</header>
	)
}
