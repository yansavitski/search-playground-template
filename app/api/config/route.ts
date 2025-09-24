import { NextResponse } from 'next/server'
import { loadConfigFromEnv } from '@/lib/config'

export async function GET() {
  try {
    const configuration = loadConfigFromEnv()
    
    // Add debug information about environment variables
    const debugInfo = {
      ...configuration,
      hasPlaygroundConfig: !!process.env.PLAYGROUND_CONFIG,
      hasElasticCloudId: !!process.env.ELASTIC_CLOUD_ID,
      hasElasticApiKey: !!process.env.ELASTIC_API_KEY,
      hasLlmProvider: !!process.env.LLM_PROVIDER,
      hasLlmApiKey: !!process.env.LLM_API_KEY,
      hasLlmModelName: !!process.env.LLM_MODEL_NAME,
      hasLlmBaseUrl: !!process.env.LLM_BASE_URL,
      hasAppName: !!process.env.APP_NAME
    }
    
    return NextResponse.json(debugInfo)
  } catch (error) {
    console.error('Error loading configuration:', error)
    return NextResponse.json(
      { error: 'Failed to load configuration', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    )
  }
}
