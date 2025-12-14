import { memo, type FC } from 'react'
import type { DataSource } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { chatService } from '@/services/chat-service'
import { Button } from '@/shared/ui/button'
import { downloadFile } from '@/shared/lib/downloadFile'

interface SourceProps {
	dataSource: DataSource
}

export const Source: FC<SourceProps> = memo(({ dataSource }) => {
	const { text, source } = dataSource

	const docName = source.split('/').at(-1) ?? 'document.pdf'

	const { mutate: downloadDocument, isPending } = useMutation({
		mutationKey: ['downloadDocument'],
		mutationFn: () => chatService.getDocument({ docName }),
		onSuccess: ({ data }) => downloadFile({ data, docName }),
	})

	const handleDownloadDocument = () => {
		downloadDocument()
	}

	return (
		<li className="text-pretty">
			<span className="leading-6">{text}...</span>
			<Button
				onClick={handleDownloadDocument}
				disabled={isPending}
				variant="link"
				size="sm"
				className="block px-0"
			>
				Скачать источник: {docName}
			</Button>
		</li>
	)
})

Source.displayName = 'Source'
