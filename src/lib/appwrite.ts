import { Client, Databases, Storage, Account } from 'appwrite';

// Client SDK initialization
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a1ece8b002c669f2b4f';

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'portfolio_db';

// Collection IDs for convenience
export const COLLECTIONS = {
  projects: 'projects',
  experience: 'experience',
  blog_posts: 'blog_posts',
  knowledge_base: 'knowledge_base',
  analytics: 'analytics',
} as const;
