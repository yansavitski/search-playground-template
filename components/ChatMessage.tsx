'use client'

import { Message } from '@/types/chat'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
          : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
