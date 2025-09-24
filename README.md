# RAG Playground

A chat interface for testing RAG (Retrieval-Augmented Generation) with Elasticsearch.

## Features

- Full-screen chat interface with "Elastic Playground" header
- Configuration panel for model, prompt, index, and other parameters
- Responsive design with dark mode support
- Real-time chat simulation (ready for backend integration)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
