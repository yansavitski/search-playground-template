import { Client } from '@elastic/elasticsearch'
import { ElasticConnection } from '@/types/chat'

export function createElasticsearchClient(connection: ElasticConnection): Client {
  if (connection.cloudId && connection.apiKey) {
    return new Client({
      cloud: {
        id: connection.cloudId
      },
      auth: {
        apiKey: connection.apiKey
      }
    })
  }

  if (connection.url) {
    const clientConfig: any = {
      node: connection.url
    }

    if (connection.username && connection.password) {
      clientConfig.auth = {
        username: connection.username,
        password: connection.password
      }
    }
    
    // For local development, ignore SSL issues
    // if (connection.url.includes('localhost') || connection.url.includes('127.0.0.1')) {
    //   clientConfig.tls = {
    //     rejectUnauthorized: false
    //   }
    // }

    console.log('clientConfig', clientConfig)

    const client = new Client(clientConfig)
    
    return client
  }
  
  throw new Error('No valid Elasticsearch connection configuration provided')
}

export async function searchDocuments(
  client: Client, 
  question: string, 
  indices: string[], 
  elasticsearchQuery: Record<string, unknown>, 
  size: number = 5
) {
  try {
    const elasticsearchQueryJSON = JSON.stringify(elasticsearchQuery)
    let searchBody = elasticsearchQueryJSON.replace(/\"{query}\"/g, JSON.stringify(question))

    const response = await client.transport.request({
        method: 'POST',
        path: `/${indices.join(',')}/_search`,
        body: {
          ...JSON.parse(searchBody),
          size,
        },
      });

    return {
      hits: (response as any).hits.hits.map((hit: any) => ({
        _source: hit._source,
        _score: hit._score,
        _index: hit._index,
        highlight: hit.highlight
      })),
      total: (response as any).hits.total
    }
  } catch (error) {
    console.error('Elasticsearch search error:', error)
    
    return {
      hits: [],
      total: 0
    }
  }
}

export async function testConnection(client: Client): Promise<boolean> {
  try {
    const response = await client.ping()

    return response
  } catch (error) {
    console.error('Elasticsearch connection test failed:', error)
    return false
  }
}
