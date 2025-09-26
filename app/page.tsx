'use client'

import { useState, useRef, useEffect } from 'react'
import { Message, PublicConfig, ChatRequest, ChatResponse } from '@/types/chat'
import ChatHeader from '@/components/ChatHeader'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingConfig, setIsLoadingConfig] = useState(true)
  const [publicConfig, setPublicConfig] = useState<PublicConfig>({ name: 'Elastic Playground', citations: false })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load public configuration on component mount
  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const response = await fetch('/api/config')
        if (response.ok) {
          const config = await response.json()
          setPublicConfig(config)
        }
      } catch (error) {
        console.warn('Failed to load public configuration, using defaults:', error)
      } finally {
        setIsLoadingConfig(false)
      }
    }

    loadConfiguration()
  }, [])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const request: ChatRequest = {
        message: content
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ChatResponse = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your message. Please check your configuration and try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingConfig) {
    return (
      <div className="h-screen flex flex-col">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Loading Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Setting up your Elastic Playground...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader title={publicConfig.name} />
      
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to {publicConfig.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Start a conversation to search through your knowledge base and get AI-powered answers.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4 bg-white dark:bg-gray-900">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Assistant
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Searching and thinking...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isLoading}
      />
    </div>
  )
}
