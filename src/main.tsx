import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/shared/ui/theme-provider'
import { Toaster } from '@/shared/ui/sonner'
import { App } from './app'
import './index.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)

	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<App />
					<Toaster
						richColors
						closeButton
						position="top-right"
						duration={2000}
						swipeDirections={['right', 'left']}
					/>
				</ThemeProvider>
			</QueryClientProvider>
		</StrictMode>
	)
}
