import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message } from '../types'

interface HistoryStore {
	history: Message[]
	addMessage: (message: Message) => void
	clearHistory: () => void
	deleteLastMessage: () => string
}

export const useChatHistoryStore = create<HistoryStore>()(
	persist(
		(set, get) => ({
			history: [],
			addMessage: (message) => {
				set({
					history: [...get().history, message],
				})
			},
			clearHistory: () => {
				set({ history: [] })
			},
			deleteLastMessage: () => {
				const history = [...get().history]

				const lastMessage = history.pop()?.message ?? ''

				set({
					history,
				})

				return lastMessage
			},
		}),
		{
			name: 'chat-storage',
		}
	)
)
