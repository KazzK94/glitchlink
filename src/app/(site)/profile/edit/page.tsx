
import { getUserProfile } from '@/services/users'

import { Container } from '@/components/common/Container'
import { Avatar } from '@/components/users/Avatar'
import { UpdateBasicInfoForm } from '@/components/users/profile/forms/UpdateBasicInfo'
import { ChangePasswordForm } from '@/components/users/profile/forms/ChangePassword'

export default async function EditProfilePage() {
	const user = await getUserProfile()

	if (!user) return <p className='text-red-500 text-lg'>ERROR: Cannot load logged user data. Please make sure you logged in correctly.</p>

	return (
		<Container className='py-4 px-6'>
			<h1 className='text-3xl mb-4'>Edit Profile</h1>
			<div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div>
					<UpdateBasicInfoForm user={user} />
				</div>
				<div>
					<ChangePasswordForm user={user} />
				</div>
				<div>
					<form className='bg-slate-800 px-4 py-3 rounded-lg'>
						<h2 className='text-xl border-b border-gray-400 pl-1 pb-0.5 mb-4'>Profile Picture</h2>
						<div className='flex flex-col items-center gap-4'>
							<Avatar src={user?.avatar} className='max-w-[min(10rem,80%)]' editable />
							<p className='italic text-sm opacity-80 text-center'>Click on the picture to change it!</p>
						</div>
					</form>
				</div>
			</div>
		</Container>
	)
}
