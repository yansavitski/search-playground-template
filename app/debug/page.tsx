'use client'

import { useEffect, useState } from 'react'
import { ChatConfig, ElasticConnection, LLMConfig } from '@/types/chat'

export default function DebugPage() {
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/config')
        if (response.ok) {
          const data = await response.json()
          setConfig(data)
        } else {
          setError(`API Error: ${response.status}`)
        }
      } catch (err) {
        setError(`Fetch Error: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Configuration Debug</h1>
          <div>Loading configuration...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-red-600">Configuration Debug - Error</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Configuration Debug</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Chat Configuration</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(config?.config, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Elasticsearch Connection</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(config?.elasticConnection, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">LLM Configuration</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(config?.llmConfig, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
            <div className="space-y-2 text-sm">
              <div>PLAYGROUND_CONFIG: {config?.hasPlaygroundConfig ? '✅ Present' : '❌ Missing'}</div>
              <div>ELASTIC_CLOUD_ID: {config?.hasElasticCloudId ? '✅ Present' : '❌ Missing'}</div>
              <div>ELASTIC_API_KEY: {config?.hasElasticApiKey ? '✅ Present' : '❌ Missing'}</div>
              <div>LLM_PROVIDER: {config?.hasLlmProvider ? '✅ Present' : '❌ Missing'}</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <h3 className="font-semibold text-blue-800">Testing Instructions:</h3>
            <ol className="list-decimal list-inside mt-2 text-blue-700 space-y-1">
              <li>Set environment variables in your deployment</li>
              <li>Check this page to verify configuration is loaded correctly</li>
              <li>Go back to <a href="/" className="underline">main page</a> to test the chat</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
