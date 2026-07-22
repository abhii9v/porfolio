import React from 'react';
import { Metadata } from 'next';
import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import HomeClient from '@/components/layout/HomeClient';

export const metadata: Metadata = {
  title: 'Abhinav Yadav | Data Scientist & ML Systems Engineer',
  description: 'Portfolio of Abhinav Yadav, showcasing production-ready Machine Learning and Data Science solutions.',
};

export const revalidate = 60; // Revalidate every minute

async function getExperiences() {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.experience
    );
    // Sort by order ascending
    return response.documents.map((doc: any) => ({
      $id: doc.$id,
      company: doc.company,
      role: doc.role,
      period: doc.period,
      order: doc.order,
      responsibilities: doc.responsibilities || [],
      architecture: doc.architecture || '',
      technologies: doc.technologies || [],
      businessImpact: doc.businessImpact || [],
      metrics: doc.metrics || [],
    })).sort((a: any, b: any) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch experiences from Appwrite:', error);
    return [];
  }
}

async function getProjects() {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.projects
    );
    return response.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      subtitle: doc.subtitle || '',
      content: doc.content || '',
      techStack: doc.techStack || [],
      businessResults: doc.businessResults || [],
      githubUrl: doc.githubUrl || '',
      demoUrl: doc.demoUrl || '',
      architecture: doc.architecture || '',
      featured: doc.featured || false,
      order: doc.order || 99,
    }));
  } catch (error) {
    console.error('Failed to fetch projects from Appwrite:', error);
    return [];
  }
}

async function getBlogPosts() {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_posts
    );
    return response.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      slug: doc.slug,
      summary: doc.summary,
      content: doc.content || '',
      categories: doc.categories || [],
      readingTime: doc.readingTime || '5 min read',
      publishedAt: doc.publishedAt || '',
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts from Appwrite:', error);
    return [];
  }
}

export default async function HomePage() {
  const [experiences, projects, posts] = await Promise.all([
    getExperiences(),
    getProjects(),
    getBlogPosts(),
  ]);

  return (
    <HomeClient
      experiences={experiences}
      projects={projects}
      posts={posts}
    />
  );
}
