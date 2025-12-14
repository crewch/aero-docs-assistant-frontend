import type { DataSource } from '@/shared/types'

export interface SendMessageRequest {
	request: string
}

export interface SendMessageResponse {
	request: string
	response: string
	onTextBased: DataSource[]
}

export interface GetDocumentRequest {
	docName: string
}

export type GetDocumentResponse = Blob
