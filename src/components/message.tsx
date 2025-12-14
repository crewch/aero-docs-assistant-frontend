import { type FC, lazy, memo, Suspense, useState } from 'react'
import { Bot, User, Copy, Check } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import type { Message as MessageType } from '@/shared/types'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { senderMap } from '@/shared/constants/sender-map'
import { Sources } from './sources'

const Markdown = lazy(() => import('react-markdown'))

interface MessageProps {
	message: MessageType
}

export const Message: FC<MessageProps> = memo((props) => {
	const { sender, message } = props.message

	const [copied, setCopied] = useState(false)
	const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>()

	const handleCopyText = () => {
		navigator.clipboard.writeText(message)
		setCopied(true)

		clearTimeout(timerId)

		const id = setTimeout(() => setCopied(false), 1000)

		setTimerId(id)
	}

	return (
		<Alert className="w-2/5">
			{sender === 'user' ? (
				<User className="h-4 w-4" />
			) : (
				<Bot className="h-4 w-4" />
			)}
			<AlertTitle className="font-bold">{senderMap[sender]}</AlertTitle>
			<AlertDescription className="leading-6">
				<Suspense fallback={<Skeleton className="w-full h-5" />}>
					<Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
				</Suspense>
				<Tooltip delayDuration={0} open={copied}>
					<TooltipTrigger asChild>
						<Button
							onClick={handleCopyText}
							variant="ghost"
							size="icon"
							className="h-6 w-6"
						>
							{copied ? <Check /> : <Copy />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Скопировано!</p>
					</TooltipContent>
				</Tooltip>
				{sender === 'bot' && (
					<Sources dataSources={props.message.onTextBased} />
				)}
			</AlertDescription>
		</Alert>
	)
})

Message.displayName = 'Message'
