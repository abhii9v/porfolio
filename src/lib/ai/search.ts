/**
 * Lightweight Client-Side TF-IDF & Keyword Vector Search Engine
 */

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could',
  'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres',
  'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is',
  'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of',
  'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll',
  'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasnt',
  'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which',
  'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll',
  'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/[\s-]+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export interface SearchableProject {
  $id: string;
  title: string;
  subtitle: string;
  content: string;
  techStack: string[];
}

export function searchProjects(
  query: string,
  projects: SearchableProject[]
): { project: SearchableProject; score: number }[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return projects.map((p) => ({ project: p, score: 0 }));
  }

  // 1. Compute term frequencies (TF) for each project
  const docsTF = projects.map((p) => {
    const text = `${p.title} ${p.subtitle} ${p.content} ${p.techStack.join(' ')}`;
    const tokens = tokenize(text);
    const tf: Record<string, number> = {};
    tokens.forEach((t) => {
      tf[t] = (tf[t] || 0) + 1;
    });
    return { id: p.$id, tf, length: tokens.length };
  });

  // 2. Compute document frequencies (DF)
  const df: Record<string, number> = {};
  queryTokens.forEach((token) => {
    let count = 0;
    docsTF.forEach((doc) => {
      if (doc.tf[token]) count++;
    });
    df[token] = count;
  });

  // 3. Score documents (cosine similarity approximation using TF-IDF)
  const scored = projects.map((project, idx) => {
    const doc = docsTF[idx];
    let score = 0;

    queryTokens.forEach((token) => {
      const tfVal = doc.tf[token] || 0;
      if (tfVal === 0) return;

      // IDF = log(TotalDocs / (DocsWithTerm + 1))
      const docFreq = df[token] || 0;
      const idfVal = Math.log(projects.length / (docFreq + 0.5)) + 1;
      
      // TF-IDF
      const tfIdf = (tfVal / doc.length) * idfVal;
      
      // Title boosts
      let boost = 1.0;
      if (project.title.toLowerCase().includes(token)) boost += 2.5;
      if (project.subtitle.toLowerCase().includes(token)) boost += 1.5;
      if (project.techStack.some(t => t.toLowerCase() === token)) boost += 2.0;

      score += tfIdf * boost;
    });

    return { project, score };
  });

  return scored;
}
