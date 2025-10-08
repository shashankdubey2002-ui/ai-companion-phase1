'use client'
import { useState, useEffect } from 'react'
import { formatTime } from '@/lib/utils'

interface HeaderProps {
  title?: string
  showStatusBar?: boolean
  className?: string
}

export default function Header({ title, showStatusBar = true, className = '' }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className={`w-full ${className}`}>
      {showStatusBar && (
        <div className="flex justify-between items-center px-4 py-2 bg-black text-white text-sm font-medium">
          <span>{formatTime(currentTime)}</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
      )}
      {title && (
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      )}
    </header>
  )
}
