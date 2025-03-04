
import { Container } from '@/components/common/Container'
import { Notification } from '@/components/notifications/Notification'
import { getNotifications } from '@/services/api/notifications'

export default async function NotificationsPage() {

	const notifications = await getNotifications()

	return (
		<Container asSection className='mt-6'>
			<h1 className='text-3xl mb-4'>Notifications</h1>

			<div className='flex flex-col gap-2 mb-4'>
				{
					notifications.length === 0 ? (
						<p className='italic text-gray-400'>
							You don&apos;t have any notifications yet...
						</p>
					) : (
						notifications.map(notification => (
							<Notification key={notification.id} notification={notification} />
						))
					)
				}
			</div>
		</Container>
	)
}