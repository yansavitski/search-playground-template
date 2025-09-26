import { ChatConfig, ElasticConnection, LLMConfig } from '@/types/chat'
import { getRequiredEnvVars } from './config'

export interface PlaygroundDeployConfig {
  config: ChatConfig
  elasticConnection: ElasticConnection
  llmConfig: LLMConfig
}

/**
 * Creates a Vercel deployment URL for the Elastic RAG Playground
 * This function should be used in parent applications that want to deploy the playground
 */
export function createElasticPlaygroundDeployUrl(
  playgroundConfig: PlaygroundDeployConfig,
  repositoryUrl: string = 'https://github.com/elastic/rag-playground' // Update with actual repo
): string {
  const envVars = getRequiredEnvVars();

  // Encode the complete configuration
  const completeConfig = {
    ...playgroundConfig.config,
    _elasticConnection: playgroundConfig.elasticConnection,
    _llmConfig: playgroundConfig.llmConfig
  };
  const encodedConfig = encodeURIComponent(JSON.stringify(completeConfig));

  // Create Vercel deployment URL
  const deployUrl = new URL('https://vercel.com/new/clone');
  deployUrl.searchParams.set('repository-url', repositoryUrl);
  deployUrl.searchParams.set('env', envVars.join(','));
  deployUrl.searchParams.set('envDescription', 'Configuration for Elastic RAG Playground');
  deployUrl.searchParams.set(
    'envLink',
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-create-api-key.html'
  );
  deployUrl.searchParams.set('project-name', 'elastic-rag-playground');
  deployUrl.searchParams.set('repository-name', 'elastic-rag-playground');

  // Add encoded playground configuration as environment variable default
  deployUrl.searchParams.set('env[PLAYGROUND_CONFIG]', encodedConfig);
  
  // Add individual environment variable defaults
  if (playgroundConfig.elasticConnection.cloudId) {
    deployUrl.searchParams.set('env[ELASTIC_CLOUD_ID]', playgroundConfig.elasticConnection.cloudId);
  }
  if (playgroundConfig.elasticConnection.apiKey) {
    deployUrl.searchParams.set('env[ELASTIC_API_KEY]', playgroundConfig.elasticConnection.apiKey);
  }
  if (playgroundConfig.llmConfig.provider) {
    deployUrl.searchParams.set('env[LLM_PROVIDER]', playgroundConfig.llmConfig.provider);
  }
  if (playgroundConfig.llmConfig.apiKey) {
    deployUrl.searchParams.set('env[LLM_API_KEY]', playgroundConfig.llmConfig.apiKey);
  }
  if (playgroundConfig.llmConfig.baseUrl) {
    deployUrl.searchParams.set('env[LLM_BASE_URL]', playgroundConfig.llmConfig.baseUrl);
  }
  if (playgroundConfig.config.name) {
    deployUrl.searchParams.set('env[APP_NAME]', playgroundConfig.config.name);
  }

  return deployUrl.toString();
}
