import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Tokenize helper for fallback matching
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

// Fallback rule-based matching engine when no API Key is provided
async function getFallbackAnswer(query: string): Promise<string> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.knowledge_base,
      [Query.limit(50)]
    );

    const queryTokens = tokenize(query);
    let bestChunk: any = null;
    let maxOverlap = 0;

    for (const chunk of response.documents) {
      const keywords = chunk.keywords || [];
      let overlap = 0;
      queryTokens.forEach((token) => {
        // Keyword match
        if (keywords.some((k: string) => k.toLowerCase().includes(token))) {
          overlap += 2.0;
        }
        // Content match
        if (chunk.content.toLowerCase().includes(token)) {
          overlap += 0.5;
        }
      });

      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestChunk = chunk;
      }
    }

    if (bestChunk && maxOverlap > 0) {
      return `[RAG Retrieval Fallback Mode]\n\nBased on Abhinav's knowledge base:\n\n${bestChunk.content}\n\n*If you would like to discuss this further, feel free to contact Abhinav at abhi9v2204@gmail.com.*`;
    }

    return `Hello! I am Abhinav's AI Resume Assistant. I couldn't find a direct answer to your question in the pre-loaded knowledge base. 

Abhinav's core areas of expertise are:
*   **Time Series Forecasting** (Insurance claims forecasting, MAPE < 10%, model monitoring)
*   **Recommendation Systems** (Session-level recommenders, CTR modeling)
*   **NLP & LLMs** (Semantic search, hybrid query intent, embeddings)
*   **MLOps** (Docker, MLflow, scheduled retraining pipelines)

Please ask about these topics or drop Abhinav an email at abhi9v2204@gmail.com!`;
  } catch (error) {
    console.error('Fallback matching error:', error);
    return 'Sorry, I encountered an error searching the knowledge base. Please contact Abhinav at abhi9v2204@gmail.com.';
  }
}

export async function askAIResume(messages: ChatMessage[]): Promise<string> {
  if (messages.length === 0) return '';
  const lastMessage = messages[messages.length - 1].content;

  // 1. Perform database search in Appwrite
  let contextText = '';
  try {
    // Attempt full-text query
    const results = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.knowledge_base,
      [
        Query.search('content', lastMessage),
        Query.limit(3)
      ]
    );

    if (results.documents.length > 0) {
      contextText = results.documents.map((doc: any) => `- ${doc.title}: ${doc.content}`).join('\n\n');
    }
  } catch (err) {
    console.warn('Appwrite full-text search failed, falling back to database list matching...', err);
  }

  // 2. Check if Gemini API key is available
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('GEMINI_API_KEY is not defined. Using local keyword fallback matcher.');
    return getFallbackAnswer(lastMessage);
  }

  // Return context-aware answer from Appwrite database
  return getFallbackAnswer(lastMessage);
}
