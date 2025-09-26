export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
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
  queryFields: Record<string, string[]>
  elasticsearchQuery: any // Elasticsearch query object
  prompt: string
  citations: boolean
  sourceFields: Record<string, string[]>
  docSize: number
  summarizationModel: SummarizationModel
}

export interface ElasticConnection {
  cloudId: string
  apiKey: string
  url?: string
  username?: string
  password?: string
}

export type LLMProvider = 'openai' | 'azure-openai' | 'elasticsearch'

export interface LLMConfig {
  provider: LLMProvider
  apiKey: string
  baseUrl?: string
  modelName?: string
}

export interface ChatRequest {
  message: string
}

export interface ChatResponse {
  message: string
  sources?: any[]
  error?: string
}

export interface PublicConfig {
  name: string
  citations: boolean
}
