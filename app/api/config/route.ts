import { NextResponse } from 'next/server'
import { loadConfigFromEnv } from '@/lib/config'

export async function GET() {
  try {
    const configuration = loadConfigFromEnv()
    
    return NextResponse.json(configuration)
  } catch (error) {
    console.error('Error loading configuration:', error)
    return NextResponse.json(
      { error: 'Failed to load configuration', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    )
  }
}
