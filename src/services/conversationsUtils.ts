
import { ConversationWithUsersAndMessages, UserPublicInfo } from '@/types'
import { Message } from '@prisma/client'

const TEMP_MESSAGE_PREFIX = 'TEMP_MESSAGE_ID'
export const CONVERSATION_NO_ID = 'NEW_CONVERSATION_ID'
export const NO_CONVERSATION_FOUND_INDEX = -2

/** Create a temporary empty conversation with a NO ID id, so the UI can work even if the conversation does not exist yet */
export function createTempConversation(userA: UserPublicInfo, userB: UserPublicInfo): ConversationWithUsersAndMessages {
	return {
		id: CONVERSATION_NO_ID,
		userA,
		userAId: userA.id,
		userB,
		userBId: userB.id,
		createdAt: new Date(),
		lastMessageAt: new Date(),
		messages: []
	}
}

export function isTempConversation({ conversationId }: { conversationId: string }): boolean {
	return conversationId === CONVERSATION_NO_ID
}

/** Create a Temporary Message (for optimistic UI only) given the author id and message contents, and return it */
export function createTempMessage({ authorId, content, conversationId }: { authorId: string, content: string, conversationId?: string }): Message {
	return {
		id: `${TEMP_MESSAGE_PREFIX}${Date.now()}`, // Temporary ID
		conversationId: conversationId || CONVERSATION_NO_ID,
		authorId,
		content,
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

/** Determine if a Message is a Temporary Message (one created for optimistic UI only) */
export function isTempMessage({ message }: { message: { id: string } }): boolean {
	return message.id.startsWith(TEMP_MESSAGE_PREFIX)
}
