import { ChatConfig, ElasticConnection, LLMConfig, LLMProvider } from '@/types/chat'

// Default configuration that matches the expected format
export const defaultConfig: ChatConfig = {
  name: "Elastic Playground",
  indices: [ 'kibana_sample_data_elasticsearch_documentation'],
  elasticsearchQueryJSON: '{"retriever":{"rrf":{"retrievers":[{"standard":{"query":{"semantic":{"field":"ai_questions_answered","query":"{query}"}}}},{"standard":{"query":{"semantic":{"field":"ai_summary","query":"{query}"}}}},{"standard":{"query":{"semantic":{"field":"content_body","query":"{query}"}}}}]}},"highlight":{"fields":{"ai_questions_answered":{"type":"semantic","number_of_fragments":2,"order":"score"},"ai_summary":{"type":"semantic","number_of_fragments":2,"order":"score"},"content_body":{"type":"semantic","number_of_fragments":2,"order":"score"}}}}',
  prompt: 'You are an assistant for question-answering tasks.',
  citations: true,
  context: {
    sourceFields: {
      default: ["title", "url", "body"]
    },
    docSize: 3
  },
  summarizationModel: {
    connectorId: "abc-123",
    modelId: "gpt-4o-mini"
  }
}

export const defaultElasticConnection: ElasticConnection = {
  cloudId: '',
  apiKey: ''
}

export const defaultLLMConfig: LLMConfig = {
  provider: 'elasticsearch',
  apiKey: '',
  modelName: ''
}

// Load configuration from environment variables
export function loadConfigFromEnv(): {
  config: ChatConfig
  elasticConnection: ElasticConnection
  llmConfig: LLMConfig
} {
  let config = defaultConfig
  let elasticConnection = defaultElasticConnection
  let llmConfig = defaultLLMConfig

  // Try to load playground configuration from environment
  if (typeof window === 'undefined') { // Server-side only
    try {
      // Load main configuration
      const playgroundConfig = process.env.PLAYGROUND_CONFIG
      if (playgroundConfig) {
        const decodedConfig = JSON.parse(decodeURIComponent(playgroundConfig))
        
        // Handle if elastic and llm configs are embedded in the main config
        if (decodedConfig._elasticConnection) {
          elasticConnection = { ...defaultElasticConnection, ...decodedConfig._elasticConnection }
          delete decodedConfig._elasticConnection
        }
        if (decodedConfig._llmConfig) {
          llmConfig = { ...defaultLLMConfig, ...decodedConfig._llmConfig }
          delete decodedConfig._llmConfig
        }
        
        config = { ...defaultConfig, ...decodedConfig }
      }

      // Load Elasticsearch connection
      if (process.env.ELASTIC_CLOUD_ID) {
        elasticConnection.cloudId = process.env.ELASTIC_CLOUD_ID
      }
      if (process.env.ELASTIC_API_KEY) {
        elasticConnection.apiKey = process.env.ELASTIC_API_KEY
      }
      // For local Elasticsearch
      if (process.env.ELASTIC_URL) {
        elasticConnection.url = process.env.ELASTIC_URL
      }
      if (process.env.ELASTIC_USERNAME) {
        elasticConnection.username = process.env.ELASTIC_USERNAME
      }
      if (process.env.ELASTIC_PASSWORD) {
        elasticConnection.password = process.env.ELASTIC_PASSWORD
      }

      // Load LLM configuration
      if (process.env.LLM_PROVIDER) {
        llmConfig.provider = process.env.LLM_PROVIDER as LLMProvider
      }
      if (process.env.LLM_API_KEY) {
        llmConfig.apiKey = process.env.LLM_API_KEY
      }
      if (process.env.LLM_MODEL_NAME) {
        llmConfig.modelName = process.env.LLM_MODEL_NAME
      }
      if (process.env.LLM_BASE_URL) {
        llmConfig.baseUrl = process.env.LLM_BASE_URL
      }

      // Override app name if provided
      if (process.env.APP_NAME) {
        config.name = process.env.APP_NAME
      }

    } catch (error) {
      console.warn('Failed to load configuration from environment:', error)
    }
  }

  return {
    config,
    elasticConnection,
    llmConfig
  }
}

// Helper function to encode configuration for Vercel deployment
export function encodeConfigForVercel(
  config: ChatConfig,
  elasticConnection: ElasticConnection,
  llmConfig: LLMConfig
): string {
  const combinedConfig = {
    ...config,
    _elasticConnection: elasticConnection,
    _llmConfig: llmConfig
  }
  return encodeURIComponent(JSON.stringify(combinedConfig))
}

// Helper function to get environment variables list for Vercel
export function getRequiredEnvVars(): string[] {
  return [
    'PLAYGROUND_CONFIG',
    'ELASTIC_CLOUD_ID',
    'ELASTIC_API_KEY',
    'LLM_PROVIDER',
    'LLM_API_KEY',
    'LLM_MODEL_NAME',
    'LLM_BASE_URL',
    'APP_NAME'
  ]
}
