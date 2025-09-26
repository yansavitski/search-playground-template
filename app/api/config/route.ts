import { NextResponse } from 'next/server'
import { loadConfigFromEnv } from '@/lib/config'
import { PublicConfig } from '@/types/chat'

export async function GET() {
  try {
    const { config } = loadConfigFromEnv()
    
    // Return only public configuration
    const publicConfig: PublicConfig = {
      name: config.name || 'Elastic Playground',
      citations: config.citations || false
    }
    
    return NextResponse.json(publicConfig)
  } catch (error) {
    console.error('Error loading configuration:', error)
    return NextResponse.json(
      { error: 'Failed to load configuration', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    )
  }
}
