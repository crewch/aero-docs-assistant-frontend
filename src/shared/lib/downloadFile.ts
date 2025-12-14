interface DownloadFileProps {
	data: Blob
	docName: string
}

type DownloadFile = (props: DownloadFileProps) => void

export const downloadFile: DownloadFile = ({ data, docName }) => {
	const url = URL.createObjectURL(data)
	const link = document.createElement('a')

	link.href = url
	link.download = docName
	link.style.display = 'none'

	document.body.appendChild(link)
	link.click()

	document.body.removeChild(link)

	setTimeout(() => URL.revokeObjectURL(url), 100)
}
