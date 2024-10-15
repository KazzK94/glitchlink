
import { Container } from '@/components/Container'
import { Notification } from '@/components/notifications/Notification'
import { getNotifications } from '@/services/notifications'

export default async function NotificationsPage() {

	const notifications = await getNotifications()

	return (
		<Container asSection className='mt-6'>
			<h1 className='text-3xl mb-4'>Notifications</h1>

			<div className='flex flex-col gap-2'>
				{
					notifications.map(notification => (
						<Notification key={notification.id} notification={notification} />
					))
				}
			</div>
		</Container>
	)
}