
const DEFAULT_AVATAR_URL = '/images/avatar-placeholder.webp'

export function getAvatarUrl(avatarUrl?: string | null): string {
	return avatarUrl || DEFAULT_AVATAR_URL
}