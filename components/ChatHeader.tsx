'use client'

import { Settings } from 'lucide-react'

interface ChatHeaderProps {
  onSettingsClick: () => void
}

export default function ChatHeader({ onSettingsClick }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Elastic Playground
      </h1>
      <button
        onClick={onSettingsClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  )
}
