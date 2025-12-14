import { memo, type FC } from 'react'
import type { DataSource } from '@/shared/types'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/accordion'
import { Source } from './source'

interface SourcesProps {
	dataSources: DataSource[]
}

export const Sources: FC<SourcesProps> = memo(({ dataSources }) => {
	if (!dataSources.length) {
		return null
	}

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Источники</AccordionTrigger>
				<AccordionContent>
					<ol className="flex flex-col gap-3 list-inside list-decimal">
						{dataSources.map((dataSource, index) => (
							<Source key={index} dataSource={dataSource} />
						))}
					</ol>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
})

Sources.displayName = 'Sources'
