export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export interface QueryFields {
  default: string[]
  semantic: string[]
}

export interface SourceFields {
  default: string[]
}

export interface Context {
  sourceFields: SourceFields
  docSize: number
}

export interface SummarizationModel {
  connectorId: string
  modelId: string
}

export interface ChatConfig {
  name: string
  indices: string[]
  queryFields: QueryFields
  elasticsearchQueryJSON: string
  userElasticsearchQueryJSON: string | null
  prompt: string
  citations: boolean
  context: Context
  summarizationModel: SummarizationModel
}

export interface ElasticConnection {
  cloudId: string
  apiKey: string
}

export type LLMProvider = 'openai' | 'elasticsearch' | 'azure-openai'

export interface LLMConfig {
  provider: LLMProvider
  apiKey: string
  baseUrl?: string
  modelName?: string
}

export interface ChatRequest {
  message: string
  config: ChatConfig
  elasticConnection: ElasticConnection
  llmConfig: LLMConfig
}

export interface ChatResponse {
  message: string
  sources?: any[]
  error?: string
}
