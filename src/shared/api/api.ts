import axios, { type CreateAxiosDefaults } from 'axios'
import { toast } from 'sonner'

const options: CreateAxiosDefaults = {
	baseURL: `${import.meta.env.VITE_BASE_API_URL}/api/v1`,
}

export const apiClient = axios.create(options)

apiClient.interceptors.response.use(
	(config) => config,
	async (error) => {
		toast.error('Упс! Что-то пошло не так')

		throw error
	}
)
