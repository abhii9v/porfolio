'use server';

import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import { Query } from 'node-appwrite';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

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
    const response = await serverDatabases.listDocuments(
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
    const results = await serverDatabases.listDocuments(
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

  // 3. Invoke Gemini via Vercel AI SDK
  try {
    const systemPrompt = `You are the AI Assistant representing Abhinav Yadav, an experienced Data Scientist. 
Your goal is to answer questions about Abhinav's experience, ML projects, technical skills, and background using the provided context.

Context:
${contextText || 'No direct matching context found. Refer to general candidate details if needed.'}

Rules:
- Be highly professional, concise, and helpful.
- Keep answers under 3-4 paragraphs.
- Answer as an assistant speaking *about* Abhinav (e.g., "Abhinav has experience in..." or "Abhinav worked at...").
- If the question is unrelated to Abhinav's career, ML, or education, politely redirect the user back to his portfolio topics.
- If the answer cannot be inferred from the context, state that you don't know the exact details, and invite them to email Abhinav directly at abhi9v2204@gmail.com or contact him via LinkedIn.`;

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      prompt: lastMessage,
    });

    return text;
  } catch (error: any) {
    console.error('Gemini API call failed, falling back...', error);
    return getFallbackAnswer(lastMessage);
  }
}
