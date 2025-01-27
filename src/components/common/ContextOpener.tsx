'use client'

import { cn } from '@/lib/utils'
import { EllipsisVerticalIcon } from 'lucide-react'

import { useState, useEffect, useRef } from 'react'

export function ContextOpener({ children }: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false)
    const containerDivRef = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        // Open context menu
        setIsOpen(!isOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (containerDivRef.current && !containerDivRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={containerDivRef} className='relative'>
            <button onClick={handleClick} className='p-2 rounded' aria-label='Open context menu'>
                <EllipsisVerticalIcon className={cn('size-6', isOpen ? 'opacity-60' : '')} />
            </button>
            <div className={cn('z-20 absolute right-2 bg-gray-700/10 backdrop-blur-3xl border-2 border-gray-400 rounded shadow-md shadow-gray-800 whitespace-nowrap overflow-hidden', isOpen ? '' : 'hidden')}>
                {children}
            </div>
        </div>
    )
}

export function ContextOption({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick: () => void }) {
	return (
		<button onClick={onClick} className={cn('px-3.5 py-1.5 first:pt-2 last:pb-2 hover:bg-gray-800/60 flex items-center gap-2 w-full', className)}>
			{children}
		</button>
	)
}