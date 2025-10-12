'use client'

import { useState, useEffect, useRef } from 'react'

interface FloatingSearchProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function FloatingSearch({ onSearch, placeholder = "Cari resepi..." }: FloatingSearchProps) {
    const [query, setQuery] = useState('')
    const [isSticky, setIsSticky] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchHeight, setSearchHeight] = useState(0)
    const [isMac, setIsMac] = useState(false)

    useEffect(() => {
        // Detect if user is on Mac
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
        
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const shouldStick = rect.top <= 16 // 16px = top-4 in Tailwind
                setIsSticky(shouldStick)
            }
        }

        // Get the height of the search bar for placeholder
        if (containerRef.current) {
            setSearchHeight(containerRef.current.offsetHeight)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial position
        
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Keyboard shortcut handler for Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value) // Real-time search
    }

    return (
        <>
            <div 
                ref={containerRef}
                className="w-full max-w-md mx-auto px-4"
                style={{ height: isSticky ? `${searchHeight}px` : 'auto' }}
            >
                <div 
                    className={`z-50 w-full ${
                        isSticky 
                            ? 'fixed top-4 left-1/2 -translate-x-1/2 max-w-md px-4' 
                            : 'relative'
                    }`}
                >
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="relative shadow-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="block w-full pl-10 pr-20 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                                    <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>
                                    <span>K</span>
                                </kbd>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

