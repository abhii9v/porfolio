import { Client, Databases, Storage, Users } from 'node-appwrite';

// Server SDK initialization (requires node-appwrite)
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a1ece8b002c669f2b4f';
const apiKey = process.env.APPWRITE_API_KEY; // Only present server-side

const createServerClient = () => {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);
  
  if (apiKey) {
    client.setKey(apiKey);
  }
  
  return client;
};

export const serverClient = createServerClient();
export const serverDatabases = new Databases(serverClient);
export const serverStorage = new Storage(serverClient);
export const serverUsers = new Users(serverClient);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'portfolio_db';

export const COLLECTIONS = {
  projects: 'projects',
  experience: 'experience',
  blog_posts: 'blog_posts',
  knowledge_base: 'knowledge_base',
  analytics: 'analytics',
} as const;
