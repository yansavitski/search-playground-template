'use client'

interface ChatHeaderProps {
  title?: string
}

export default function ChatHeader({ title = "Elastic Playground" }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
    </div>
  )
}
