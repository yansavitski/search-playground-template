# RAG Playground

A chat interface for testing RAG (Retrieval-Augmented Generation) with Elasticsearch.

## Features

- Full-screen chat interface with "Elastic Playground" header
- Configuration panel for model, prompt, index, and other parameters
- Responsive design with dark mode support
- Real-time chat simulation (ready for backend integration)

## Getting Started

### Option 1: Direct Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Deploy from Kibana (Recommended Flow)

This project is designed to be deployed as a Vercel template from Kibana. When you click "Deploy to Vercel" in Kibana, it will:

1. Generate a Vercel deployment URL with pre-filled configuration
2. Open Vercel with environment variables already set
3. Deploy this template with your specific Elasticsearch and RAG settings

**Testing the Kibana → Vercel Flow:**
1. Visit `/test-deploy` to simulate the deployment URL generation
2. Visit `/debug` after deployment to verify configuration loaded correctly

### Option 3: Deploy from Custom Application

```javascript
// In your parent application (like Kibana)
import { createElasticPlaygroundDeployUrl } from './lib/deploy.ts';

const playgroundConfig = {
  config: { name: "My RAG", indices: ["docs"], /* ... */ },
  elasticConnection: { cloudId: "...", apiKey: "..." },
  llmConfig: { provider: "elasticsearch", /* ... */ }
};

const deployUrl = createElasticPlaygroundDeployUrl(playgroundConfig);
window.open(deployUrl, '_blank'); // Opens Vercel deployment page
```

### Option 4: Deploy to Vercel Manually

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/rag-playground)

Set the following environment variables in Vercel:
- `PLAYGROUND_CONFIG`: JSON encoded configuration
- `ELASTIC_CLOUD_ID`: Your Elasticsearch Cloud ID
- `ELASTIC_API_KEY`: Your Elasticsearch API key
- `LLM_PROVIDER`: elasticsearch/openai/azure-openai
- `LLM_API_KEY`: API key for external LLM providers
- `APP_NAME`: Custom name for your playground

## Configuration

Click the settings icon in the header to configure:

### LLM Provider
- **Provider**: Choose between Elasticsearch ML, OpenAI, or Azure OpenAI
- **API Key**: Your provider's API key (not needed for Elasticsearch ML)
- **Model**: Specific model to use (e.g., gpt-4, gpt-3.5-turbo)

### Elasticsearch Connection
- **Cloud ID**: Your Elasticsearch Cloud deployment ID
- **API Key**: Elasticsearch API key for authentication

### RAG Configuration
- **Configuration Name**: Display name for your setup
- **Indices**: Elasticsearch indices to search (can be multiple)
- **Query Fields**: Fields to search in (with optional boosting like "title^2")
- **Elasticsearch Query JSON**: Custom query template (use "__USER_QUERY__" placeholder)
- **System Prompt**: Instructions for the AI assistant
- **Citations**: Include source documents in responses
- **Context Doc Size**: Number of documents to retrieve for context
- **Connector/Model ID**: For Elasticsearch ML inference

## Environment Variables

When deployed as a Vercel template, the following environment variables are supported:

| Variable | Description | Required |
|----------|-------------|----------|
| `PLAYGROUND_CONFIG` | JSON encoded complete configuration | No |
| `ELASTIC_CLOUD_ID` | Elasticsearch Cloud deployment ID | Yes |
| `ELASTIC_API_KEY` | Elasticsearch API key | Yes |
| `LLM_PROVIDER` | LLM provider (elasticsearch/openai/azure-openai) | No (default: elasticsearch) |
| `LLM_API_KEY` | API key for external LLM providers | No |
| `LLM_MODEL_NAME` | Model name/deployment name | No |
| `LLM_BASE_URL` | Base URL for Azure OpenAI | No |
| `APP_NAME` | Custom application name | No |

## Supported Providers

### ⚡ **Elasticsearch ML** (Recommended for RAG)
- Uses Elasticsearch's built-in ML connectors
- No external API keys needed
- Requires Elasticsearch 8.8+ with ML connectors configured
- Best integration with Elasticsearch search

### 🤖 **OpenAI** (High quality responses)
- Models: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4o, GPT-4o Mini
- Requires API key from https://platform.openai.com/
- Excellent for general knowledge and reasoning

### 🏢 **Azure OpenAI** (Enterprise)
- Enterprise-grade OpenAI models
- Requires Azure OpenAI resource and endpoint URL
- Good for corporate environments with compliance requirements

## Implementation Status

✅ **Completed:**
- Full-screen chat interface
- Multi-provider LLM support
- Elasticsearch configuration
- RAG pipeline structure
- TypeScript + Next.js setup

🔄 **In Progress:**
- Real Elasticsearch integration
- Advanced query customization

📋 **Todo:**
- Vector search support
- Document upload functionality
- Authentication system
- Export/import configurations
