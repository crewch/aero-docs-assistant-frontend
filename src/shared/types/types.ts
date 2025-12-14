export type User = 'user'

export type Bot = 'bot'

export type Author = User | Bot

export interface DataSource {
	text: string
	source: string
}

export type Message =
	| {
			sender: User
			message: string
	  }
	| {
			sender: Bot
			message: string
			onTextBased: DataSource[]
	  }
