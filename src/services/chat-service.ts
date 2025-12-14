import { apiClient } from '@/shared/api'
import type {
	GetDocumentRequest,
	GetDocumentResponse,
	SendMessageRequest,
	SendMessageResponse,
} from './types'

class ChatService {
	private readonly BASE_URL = '/chat'

	async sendMessage(props: SendMessageRequest) {
		const response = await apiClient.post<SendMessageResponse>(
			`${this.BASE_URL}/q`,
			props
		)

		return response
	}

	async getDocument(props: GetDocumentRequest) {
		const response = await apiClient.post<GetDocumentResponse>(
			`${this.BASE_URL}/doc`,
			props,
			{
				responseType: 'blob',
			}
		)

		return response
	}
}

export const chatService = new ChatService()
