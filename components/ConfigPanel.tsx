'use client'

import { ChatConfig, ElasticConnection, LLMConfig, LLMProvider } from '@/types/chat'
import { X, Plus, Trash2 } from 'lucide-react'

interface ConfigPanelProps {
  config: ChatConfig
  elasticConnection: ElasticConnection
  llmConfig: LLMConfig
  onConfigChange: (config: ChatConfig) => void
  onElasticConnectionChange: (connection: ElasticConnection) => void
  onLLMConfigChange: (llmConfig: LLMConfig) => void
  onClose: () => void
  isOpen: boolean
}

export default function ConfigPanel({ 
  config, 
  elasticConnection,
  llmConfig,
  onConfigChange, 
  onElasticConnectionChange,
  onLLMConfigChange,
  onClose, 
  isOpen 
}: ConfigPanelProps) {
  if (!isOpen) return null

  const handleInputChange = (field: keyof ChatConfig, value: any) => {
    onConfigChange({
      ...config,
      [field]: value
    })
  }

  const handleNestedChange = (parentField: keyof ChatConfig, field: string, value: any) => {
    onConfigChange({
      ...config,
      [parentField]: {
        ...config[parentField] as any,
        [field]: value
      }
    })
  }

  const handleArrayChange = (field: keyof ChatConfig, index: number, value: string) => {
    const array = [...(config[field] as string[])]
    array[index] = value
    onConfigChange({
      ...config,
      [field]: array
    })
  }

  const addArrayItem = (field: keyof ChatConfig) => {
    const array = [...(config[field] as string[])]
    array.push('')
    onConfigChange({
      ...config,
      [field]: array
    })
  }

  const removeArrayItem = (field: keyof ChatConfig, index: number) => {
    const array = [...(config[field] as string[])]
    array.splice(index, 1)
    onConfigChange({
      ...config,
      [field]: array
    })
  }

  const handleElasticChange = (field: keyof ElasticConnection, value: string) => {
    onElasticConnectionChange({
      ...elasticConnection,
      [field]: value
    })
  }

  const handleLLMChange = (field: keyof LLMConfig, value: any) => {
    onLLMConfigChange({
      ...llmConfig,
      [field]: value
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            RAG Configuration
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* LLM Provider Configuration */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              LLM Provider
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provider
                </label>
                <select
                  value={llmConfig.provider}
                  onChange={(e) => handleLLMChange('provider', e.target.value as LLMProvider)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="elasticsearch">Elasticsearch ML</option>
                  <option value="openai">OpenAI</option>
                  <option value="azure-openai">Azure OpenAI</option>
                </select>
              </div>
              
              {llmConfig.provider !== 'elasticsearch' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={llmConfig.apiKey}
                    onChange={(e) => handleLLMChange('apiKey', e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter API key..."
                  />
                </div>
              )}


              {llmConfig.provider === 'openai' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model
                  </label>
                  <select
                    value={llmConfig.modelName || 'gpt-3.5-turbo'}
                    onChange={(e) => handleLLMChange('modelName', e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                  </select>
                </div>
              )}

              {llmConfig.provider === 'azure-openai' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Base URL
                    </label>
                    <input
                      type="text"
                      value={llmConfig.baseUrl || ''}
                      onChange={(e) => handleLLMChange('baseUrl', e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="https://your-resource.openai.azure.com/"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deployment Name
                    </label>
                    <input
                      type="text"
                      value={llmConfig.modelName || ''}
                      onChange={(e) => handleLLMChange('modelName', e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="gpt-35-turbo"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Elasticsearch Connection */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              Elasticsearch Connection
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cloud ID
                </label>
                <input
                  type="text"
                  value={elasticConnection.cloudId}
                  onChange={(e) => handleElasticChange('cloudId', e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your-deployment:dXMtY2VudHJhbDEuZ2Nw..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={elasticConnection.apiKey}
                  onChange={(e) => handleElasticChange('apiKey', e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter API key..."
                />
              </div>
            </div>
          </div>

          {/* Basic Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Configuration Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="My ES RAG Playground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Indices
              </label>
              {config.indices.map((index, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={index}
                    onChange={(e) => handleArrayChange('indices', i, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Index name"
                  />
                  <button
                    onClick={() => removeArrayItem('indices', i)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('indices')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Index
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Query Fields
              </label>
              {config.queryFields.default.map((field, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => {
                      const newFields = [...config.queryFields.default]
                      newFields[i] = e.target.value
                      handleNestedChange('queryFields', 'default', newFields)
                    }}
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="title^2"
                  />
                  <button
                    onClick={() => {
                      const newFields = [...config.queryFields.default]
                      newFields.splice(i, 1)
                      handleNestedChange('queryFields', 'default', newFields)
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newFields = [...config.queryFields.default, '']
                  handleNestedChange('queryFields', 'default', newFields)
                }}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Field
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Elasticsearch Query JSON
              </label>
              <textarea
                value={config.elasticsearchQueryJSON}
                onChange={(e) => handleInputChange('elasticsearchQueryJSON', e.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                placeholder='{"bool":{"must":[{"multi_match":{"query":"__USER_QUERY__","fields":["title^2","body"]}}]}}'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                System Prompt
              </label>
              <textarea
                value={config.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Answer based on the retrieved context. Be concise."
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.citations}
                  onChange={(e) => handleInputChange('citations', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include Citations</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Context Doc Size
                </label>
                <input
                  type="number"
                  value={config.context.docSize}
                  onChange={(e) => handleNestedChange('context', 'docSize', parseInt(e.target.value))}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Connector ID
                </label>
                <input
                  type="text"
                  value={config.summarizationModel.connectorId}
                  onChange={(e) => handleNestedChange('summarizationModel', 'connectorId', e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="abc-123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model ID
                </label>
                <input
                  type="text"
                  value={config.summarizationModel.modelId}
                  onChange={(e) => handleNestedChange('summarizationModel', 'modelId', e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="gpt-4o-mini"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
