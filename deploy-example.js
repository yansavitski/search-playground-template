// Example of how to deploy this template from a parent application
// This file should be used in the parent application that wants to deploy the playground

export function createElasticPlaygroundDeployUrl(playgroundConfig) {
  const repositoryUrl = 'https://github.com/your-org/rag-playground'; // Update with actual repo URL
  
  // Required environment variables for the deployment
  const envVars = [
    'PLAYGROUND_CONFIG',
    'ELASTIC_CLOUD_ID', 
    'ELASTIC_API_KEY',
    'LLM_PROVIDER',
    'LLM_API_KEY',
    'LLM_MODEL_NAME',
    'LLM_BASE_URL',
    'APP_NAME'
  ];

  // Encode the playground configuration
  const encodedConfig = encodeURIComponent(JSON.stringify(playgroundConfig));

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
  
  // Add other defaults if available
  if (playgroundConfig.elasticConnection?.cloudId) {
    deployUrl.searchParams.set('env[ELASTIC_CLOUD_ID]', playgroundConfig.elasticConnection.cloudId);
  }
  if (playgroundConfig.elasticConnection?.apiKey) {
    deployUrl.searchParams.set('env[ELASTIC_API_KEY]', playgroundConfig.elasticConnection.apiKey);
  }
  if (playgroundConfig.llmConfig?.provider) {
    deployUrl.searchParams.set('env[LLM_PROVIDER]', playgroundConfig.llmConfig.provider);
  }
  if (playgroundConfig.llmConfig?.apiKey) {
    deployUrl.searchParams.set('env[LLM_API_KEY]', playgroundConfig.llmConfig.apiKey);
  }
  if (playgroundConfig.llmConfig?.modelName) {
    deployUrl.searchParams.set('env[LLM_MODEL_NAME]', playgroundConfig.llmConfig.modelName);
  }
  if (playgroundConfig.llmConfig?.baseUrl) {
    deployUrl.searchParams.set('env[LLM_BASE_URL]', playgroundConfig.llmConfig.baseUrl);
  }
  if (playgroundConfig.name) {
    deployUrl.searchParams.set('env[APP_NAME]', playgroundConfig.name);
  }

  return deployUrl.toString();
}
