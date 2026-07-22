/**
 * Appwrite Database Schema Initialization Script
 * 
 * This script documents the structure of the Appwrite database 'portfolio_db'
 * and can be run using the Appwrite Server SDK in a Node environment:
 * `node scripts/init-appwrite.js`
 * 
 * Required Environment Variables:
 * - APPWRITE_ENDPOINT
 * - APPWRITE_PROJECT_ID
 * - APPWRITE_API_KEY
 */

import { Client, Databases } from 'node-appwrite';

const endpoint = process.env.APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const projectId = process.env.APPWRITE_PROJECT_ID || '6a1ece8b002c669f2b4f';
const apiKey = process.env.APPWRITE_API_KEY;

if (!apiKey) {
  console.log('Skipping programmatic database setup check. APPWRITE_API_KEY is not defined.');
  console.log('The database has been pre-configured on NYC Cloud Appwrite Console.');
  process.exit(0);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const DB_ID = 'portfolio_db';

async function initSchema() {
  try {
    // 1. Create Database
    try {
      await databases.create(DB_ID, 'Portfolio Database');
      console.log('Created database: portfolio_db');
    } catch (e) {
      if (e.code === 409) {
        console.log('Database portfolio_db already exists.');
      } else {
        throw e;
      }
    }

    // 2. Create Projects Collection & Attributes
    await setupCollection('projects', 'Projects', [
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'subtitle', type: 'string', size: 255, required: true },
      { key: 'content', type: 'string', size: 5000, required: true },
      { key: 'architecture', type: 'string', size: 1000, required: false },
      { key: 'techStack', type: 'string', size: 255, required: true, array: true },
      { key: 'screenshots', type: 'string', size: 500, required: false, array: true },
      { key: 'businessResults', type: 'string', size: 500, required: true, array: true },
      { key: 'demoUrl', type: 'string', size: 500, required: false },
      { key: 'githubUrl', type: 'string', size: 500, required: false },
      { key: 'featured', type: 'boolean', required: false, default: false },
      { key: 'order', type: 'integer', required: true }
    ], [], ['read("any")']);

    // 3. Create Experience Collection & Attributes
    await setupCollection('experience', 'Experience', [
      { key: 'company', type: 'string', size: 255, required: true },
      { key: 'role', type: 'string', size: 255, required: true },
      { key: 'period', type: 'string', size: 255, required: true },
      { key: 'architecture', type: 'string', size: 3000, required: false },
      { key: 'responsibilities', type: 'string', size: 500, required: true, array: true },
      { key: 'technologies', type: 'string', size: 255, required: true, array: true },
      { key: 'businessImpact', type: 'string', size: 500, required: true, array: true },
      { key: 'metrics', type: 'string', size: 255, required: true, array: true },
      { key: 'imageUrl', type: 'string', size: 500, required: false },
      { key: 'order', type: 'integer', required: true }
    ], [], ['read("any")']);

    // 4. Create Blog Posts Collection & Attributes
    await setupCollection('blog_posts', 'Blog Posts', [
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'slug', type: 'string', size: 255, required: true },
      { key: 'summary', type: 'string', size: 1000, required: true },
      { key: 'content', type: 'string', size: 8000, required: true },
      { key: 'categories', type: 'string', size: 255, required: true, array: true },
      { key: 'readingTime', type: 'string', size: 50, required: true },
      { key: 'publishedAt', type: 'datetime', required: true },
      { key: 'coverImageUrl', type: 'string', size: 500, required: false },
      { key: 'draft', type: 'boolean', required: false, default: true }
    ], [], ['read("any")']);

    // 5. Create Knowledge Base Collection & Attributes
    await setupCollection('knowledge_base', 'Knowledge Base', [
      { key: 'category', type: 'string', size: 50, required: true },
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'content', type: 'string', size: 5000, required: true },
      { key: 'keywords', type: 'string', size: 255, required: true, array: true }
    ], [
      { key: 'content_search', type: 'fulltext', attributes: ['content'] }
    ], ['read("any")']);

    // 6. Create Analytics Collection & Attributes
    await setupCollection('analytics', 'Analytics', [
      { key: 'eventType', type: 'string', size: 50, required: true },
      { key: 'eventData', type: 'string', size: 2000, required: false },
      { key: 'timestamp', type: 'datetime', required: true }
    ], [], ['create("any")']);

    console.log('Appwrite initialization finished successfully!');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

async function setupCollection(id, name, attributes, indexes = [], permissions = []) {
  try {
    await databases.createCollection(DB_ID, id, name, permissions);
    console.log(`Created collection: ${name} (${id})`);
  } catch (e) {
    if (e.code === 409) {
      console.log(`Collection ${id} already exists.`);
    } else {
      throw e;
    }
  }

  // Retrieve existing attributes to avoid conflicts
  const current = await databases.getCollection(DB_ID, id);
  const currentKeys = new Set(current.attributes.map(a => a.key));

  for (const attr of attributes) {
    if (currentKeys.has(attr.key)) continue;
    
    console.log(`Creating attribute ${id}.${attr.key}...`);
    try {
      if (attr.type === 'string') {
        await databases.createStringAttribute(DB_ID, id, attr.key, attr.size, attr.required, attr.default, attr.array);
      } else if (attr.type === 'boolean') {
        await databases.createBooleanAttribute(DB_ID, id, attr.key, attr.required, attr.default, attr.array);
      } else if (attr.type === 'integer') {
        await databases.createIntegerAttribute(DB_ID, id, attr.key, attr.required, attr.min, attr.max, attr.default, attr.array);
      } else if (attr.type === 'datetime') {
        await databases.createDatetimeAttribute(DB_ID, id, attr.key, attr.required, attr.default, attr.array);
      }
      // Wait 1.5s between attribute creation to prevent rate limits
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`Error creating attribute ${id}.${attr.key}:`, err.message);
    }
  }

  // Retrieve existing indexes
  const currentIndexes = new Set(current.indexes.map(idx => idx.key));
  for (const idx of indexes) {
    if (currentIndexes.has(idx.key)) continue;
    console.log(`Creating index ${id}.${idx.key}...`);
    try {
      await databases.createIndex(DB_ID, id, idx.key, idx.type, idx.attributes);
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`Error creating index ${id}.${idx.key}:`, err.message);
    }
  }
}

initSchema();
