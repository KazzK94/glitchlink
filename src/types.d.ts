import type { Comment, Post, User } from '@prisma/client'

export interface Game {
	id: number
	name: string
	background_image: string
}

export interface UserPublicInfo {
	id: string
	username: string
	name: string
	color: string
}

export interface CompleteComment extends Comment {
	author: User
}

export interface CompletePost extends Post {
	author: User
	comments: CompleteComment[]
	likedBy: User[]
}