import type {
	Comment, Post, User, Notification, VideoGame, Conversation, Message
} from '@prisma/client'

export interface ExternalVideoGame {
	id: number
	name: string
	background_image: string
}

export interface UserPublicInfo {
	id: string
	username: string
	name: string,
	videogames?: VideoGame[]
	posts?: Post[]
	avatar: string | null | undefined
}

export interface CompleteComment extends Comment {
	author: User
}

export interface CompletePost extends Post {
	author: User
	comments: CompleteComment[]
	likedBy: User[]
}

export type SocialLinkDetailedStatus = 'NONE' | 'SENT_PENDING' | 'RECEIVED_PENDING' | 'FRIENDS' | 'BLOCKED'

export interface CompleteNotification extends Notification {
	generatedBy: UserPublicInfo
}

interface ConversationWithUsersAndMessages extends Conversation {
	messages: Message[]
	userA: UserPublicInfo,
	userB: UserPublicInfo
}