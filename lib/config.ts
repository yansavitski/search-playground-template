import { ChatConfig, ElasticConnection, LLMConfig, LLMProvider } from '@/types/chat'

// Load configuration from environment variables
export function loadConfigFromEnv(): {
  config: ChatConfig
  elasticConnection: ElasticConnection
  llmConfig: LLMConfig
} {
  let elasticConnection = {} as ElasticConnection
  let llmConfig = {} as LLMConfig
  let config: ChatConfig = {} as ChatConfig

  // Try to load playground configuration from environment
  if (typeof window === 'undefined') { // Server-side only
    try {
      // Load Elasticsearch connection
      if (process.env.ELASTIC_CLOUD_ID && process.env.ELASTIC_CLOUD_ID !== '-') {
        elasticConnection.cloudId = process.env.ELASTIC_CLOUD_ID
      }
      if (process.env.ELASTIC_API_KEY && process.env.ELASTIC_API_KEY !== '-') {
        elasticConnection.apiKey = process.env.ELASTIC_API_KEY
      }
      if (process.env.ELASTIC_URL && process.env.ELASTIC_URL !== '-') {
        elasticConnection.url = process.env.ELASTIC_URL
      }
      if (process.env.ELASTIC_USERNAME && process.env.ELASTIC_USERNAME !== '-') {
        elasticConnection.username = process.env.ELASTIC_USERNAME
      }
      if (process.env.ELASTIC_PASSWORD && process.env.ELASTIC_PASSWORD !== '-') {
        elasticConnection.password = process.env.ELASTIC_PASSWORD
      }

      // Load LLM configuration
      if (process.env.LLM_PROVIDER && process.env.LLM_PROVIDER !== '-') {
        llmConfig.provider = process.env.LLM_PROVIDER as LLMProvider
      }
      if (process.env.LLM_API_KEY && process.env.LLM_API_KEY !== '-') {
        llmConfig.apiKey = process.env.LLM_API_KEY
      }
      if (process.env.LLM_BASE_URL && process.env.LLM_BASE_URL !== '-') {
        llmConfig.baseUrl = process.env.LLM_BASE_URL
      }

      // Load playground configuration
      if (process.env.PLAYGROUND_CONFIG && process.env.PLAYGROUND_CONFIG !== '-') {
        try {
          config = JSON.parse(decodeURIComponent(process.env.PLAYGROUND_CONFIG)) as ChatConfig

          if (config.summarizationModel?.modelId) {
            llmConfig.modelName = config.summarizationModel.modelId
          }
        } catch (parseError) {
          console.warn('Failed to parse PLAYGROUND_CONFIG:', parseError)
        }
      }

      if (process.env.APP_NAME && process.env.APP_NAME !== '-') {
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

export function getRequiredEnvVars(): string[] {
  return [
    'PLAYGROUND_CONFIG',
    'ELASTIC_CLOUD_ID',
    'ELASTIC_API_KEY', 
    'ELASTIC_URL',
    'ELASTIC_USERNAME',
    'ELASTIC_PASSWORD',
    'LLM_PROVIDER',
    'LLM_API_KEY',
    'LLM_BASE_URL',
    'APP_NAME'
  ]
}
