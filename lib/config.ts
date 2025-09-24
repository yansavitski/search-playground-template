import { ChatConfig, ElasticConnection, LLMConfig, LLMProvider } from '@/types/chat'

// Default configuration that matches the expected format
export const defaultConfig: ChatConfig = {
  name: "My ES RAG Playground",
  indices: ["docs", "faq"],
  queryFields: {
    default: ["title^2", "body", "tags"],
    semantic: ["ml.embeddings"]
  },
  elasticsearchQueryJSON: '{"bool":{"must":[{"multi_match":{"query":"__USER_QUERY__","fields":["title^2","body","tags"]}}]}}',
  userElasticsearchQueryJSON: null,
  prompt: "Answer based on the retrieved context. Be concise.",
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
