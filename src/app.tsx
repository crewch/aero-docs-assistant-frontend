import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Footer } from '@/components/footer'
import { Separator } from '@/shared/ui/separator'

export const App = () => {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<Separator />
			<Main />
			<Footer />
		</div>
	)
}
