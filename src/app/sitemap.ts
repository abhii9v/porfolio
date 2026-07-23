import { MetadataRoute } from 'next';
import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://abhinavyadav.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/forecast-lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_posts
    );
    
    const blogRoutes: MetadataRoute.Sitemap = response.documents.map((doc: any) => ({
      url: `${baseUrl}/blog/${doc.slug}`,
      lastModified: doc.publishedAt ? new Date(doc.publishedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
    return staticRoutes;
  }
}

