'use client'

import { useState } from 'react'
import { createElasticPlaygroundDeployUrl } from '@/lib/deploy'
import { ChatConfig, ElasticConnection, LLMConfig } from '@/types/chat'

export default function TestDeployPage() {
  const [deployUrl, setDeployUrl] = useState<string>('')
  
  const testConfig: ChatConfig = {
    name: "Test Customer Support RAG",
    indices: ["support-docs", "faq"],
    queryFields: {
      default: ["title^2", "content", "tags"],
      semantic: ["ml.embeddings"]
    },
    elasticsearchQueryJSON: '{"bool":{"must":[{"multi_match":{"query":"__USER_QUERY__","fields":["title^2","content"]}}]}}',
    userElasticsearchQueryJSON: null,
    prompt: "You are a helpful customer support assistant. Answer based on the retrieved context.",
    citations: true,
    context: {
      sourceFields: {
        default: ["title", "url", "content"]
      },
      docSize: 5
    },
    summarizationModel: {
      connectorId: "openai-connector",
      modelId: "gpt-4"
    }
  }

  const testElasticConnection: ElasticConnection = {
    cloudId: "test-deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlv",
    apiKey: "test-api-key-12345"
  }

  const testLLMConfig: LLMConfig = {
    provider: "elasticsearch",
    apiKey: "",
    modelName: "gpt-4"
  }

  const generateDeployUrl = () => {
    const url = createElasticPlaygroundDeployUrl({
      config: testConfig,
      elasticConnection: testElasticConnection,
      llmConfig: testLLMConfig
    }, 'https://github.com/elastic/rag-playground') // Example repo URL
    
    setDeployUrl(url)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Vercel Deploy URL Generation</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Chat Config:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(testConfig, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Elastic Connection:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">
                  {JSON.stringify(testElasticConnection, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">LLM Config:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">
                  {JSON.stringify(testLLMConfig, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Generate Deploy URL</h2>
            
            <button
              onClick={generateDeployUrl}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Generate Vercel Deploy URL
            </button>
            
            {deployUrl && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Generated URL:</h3>
                <div className="bg-gray-100 p-3 rounded">
                  <a 
                    href={deployUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {deployUrl}
                  </a>
                </div>
                
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(deployUrl)}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    Copy URL
                  </button>
                  
                  <button
                    onClick={() => window.open(deployUrl, '_blank')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Open in Vercel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <h3 className="font-semibold text-blue-800">How to Test the Flow:</h3>
            <ol className="list-decimal list-inside mt-2 text-blue-700 space-y-1">
              <li>Click "Generate Vercel Deploy URL" to create the deployment link</li>
              <li>Click "Open in Vercel" to simulate the Kibana → Vercel flow</li>
              <li>In Vercel, you should see the environment variables pre-filled</li>
              <li>Deploy the app and check if configuration loads correctly</li>
              <li>Use the <a href="/debug" className="underline">debug page</a> to verify configuration</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
