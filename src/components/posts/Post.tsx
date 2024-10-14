'use client'

import type { User, Post } from '@prisma/client'
import { MessageSquareIcon, Share2Icon, ThumbsUpIcon, EllipsisVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PostComment } from './PostComment'

interface PostProps {
	post: Post & {
		author: User
	}
	loggedUserId: string
}

export function Post({ post, loggedUserId }: PostProps) {

	// TODO: Delete this as soon as the backend is ready
	const comments = [
		getMockComment(),
		getMockComment(),
		getMockComment()
	]

	// TODO: 
	// Logged User ID will be used:
	// 		1) to check if the user is the author (can update/delete the post) or not (can report the post)
	//   	2) to see if the user has already liked the post

	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => {
		setShowComments(!showComments)
	}

	const conditionalClassName = post.authorId === loggedUserId ? 'border border-blue-800/30' : ''

	return (
		<article key={post.id} className={`bg-gray-800 pt-4 pb-2 rounded-lg ${conditionalClassName}`}>
			<div className='flex mb-4 px-3'>
				<div className="flex items-center flex-grow">
					<div className="size-10 bg-gray-700 rounded-full mr-3"></div>
					<div>
						<h3 className="font-semibold">{post.author.name}</h3>
						<p className="text-sm text-gray-400 italic">@{post.author.username}</p>
					</div>
				</div>
				<button className='flex justify-end items-center pb-2 min-w-8'>
					<EllipsisVerticalIcon size={24} />
				</button>
			</div>
			<p className="mb-5 px-4">{post.content}</p>

			<div className='px-4 sm:px-6 flex justify-evenly sm:justify-between items-center'>
				<div className="flex gap-x-4 flex-grow justify-evenly">
					<Button variant="ghost"><ThumbsUpIcon size={20} /></Button>
					{/* TODO: Replace (in next line) comments.length with post.comments.length */}
					<ToggleCommentsButton onClick={toggleComments} commentsCount={comments.length} />
					<Button variant="ghost"><Share2Icon size={20} /></Button>
				</div>
				<div className='hidden sm:block'>
					<p className="text-sm text-muted opacity-60 italic">{post.createdAt.toLocaleString()}</p>
				</div>
			</div>

			{showComments && (
				<>
					<div className='mx-1 px-1 mt-2 pt-2 border-t border-gray-600 flex flex-col gap-2'>
						{
							// TODO: Replace this with the actual comments in the post
							comments.map((comment, index) => (
								<PostComment key={index} comment={comment} />
							))
						}
					</div>
				</>
			)}
		</article>
	)
}

function ToggleCommentsButton({ onClick, commentsCount }: { onClick: () => void, commentsCount: number }) {
	return (
		<Button variant="ghost" onClick={onClick} className='flex items-center gap-1.5'>
			<MessageSquareIcon size={20} />
			{(commentsCount > 0) && <span>{commentsCount}</span>}
		</Button>
	)
}


// TODO: Delete this as soon as the backend is ready
function getMockComment() {
	const comments = [
		{
			content: 'I love this game!! It is so much fun to play and the graphics are amazing! I can\'t wait to see what the developers come up with for the next part!',
			author: {
				name: 'The Greatest Gamer',
				username: 'gamergod192'
			}
		},
		{
			content: 'well if you ask me this game is a total waste of time lol better go play fortnite lmao',
			author: {
				name: 'Ray of Death',
				username: 'killitwithfire777'
			}
		},
		{
			content: 'This game is so much fun!',
			author: {
				name: 'Pixel Queen',
				username: 'pixelqueen99'
			}
		},
		{
			content: 'I love the graphics in this game, but it was kind of disappointing that there were no chickens :( man do I love chickens 🐔🍗',
			author: {
				name: 'Leroy Jenkins',
				username: 'leroyyyyyyyy'
			}
		},
		{
			content: 'I have to agree with you, this game is amazing!',
			author: {
				name: 'The Greatest Gamer',
				username: 'gamergod192'
			}
		}
	]
	const randomIndex = Math.floor(Math.random() * comments.length)
	return comments[randomIndex]
}