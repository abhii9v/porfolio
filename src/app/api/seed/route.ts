import { NextResponse } from 'next/server';
import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import { ID } from 'node-appwrite';

const experiences = [
  {
    company: 'Cognitio Analytics Inc',
    role: 'Data Scientist',
    period: 'Sep 2025 – Present',
    order: 1,
    responsibilities: [
      'Developed time series forecasting models to predict 12-month PLPM (Per Life Per Month) cost for an insurance client using regression and boosting approaches, achieving less than 10% MAPE.',
      'Implemented an automated model monitoring framework to track prediction accuracy, detect data and concept drift, and evaluate model stability over time.',
      'Built scheduled retraining pipelines that automatically trigger model retraining and deployment when monitoring thresholds or performance metrics degrade.',
      'Performed exploratory data analysis (EDA) and feature engineering on large healthcare/insurance claims datasets using Python and SQL to improve forecasting reliability.',
      'Collaborated with actuarial, product, and engineering teams to integrate cost forecasting outputs into analytics systems for premium planning and risk management.'
    ],
    architecture: `### System Architecture: Insurance Claims Forecast & Drift Monitoring

\`\`\`
[ Healthcare Claims (SQL) ]
            │
            ▼
[ Feature Engineering (Lags, Rolling Stats, Demographics) ]
            │
            ▼
[ Stacked Regressor (XGBoost + LightGBM) ]
            │
            ├─────────────────────────────────────────┐
            ▼                                         ▼
[ Cost Predictions (MAPE < 10%) ]        [ Model Monitoring (Drift) ]
            │                                         │ (if drift > threshold)
            ▼                                         ▼
[ Actuarial Risk Analytics Systems ]     [ Auto-Retraining Trigger (MLflow) ]
\`\`\``,
    technologies: ['Python', 'SQL', 'Scikit-learn', 'XGBoost', 'LightGBM', 'MLflow', 'Docker', 'Pandas', 'NumPy'],
    businessImpact: [
      'Predicted 12-month PLPM costs enabling client risk management and premium planning.',
      'Established automated model health checks ensuring high stability and accuracy.',
      'Automated model retraining reducing manual ML operations overhead by 90%.'
    ],
    metrics: ['MAPE < 10%', '100% Automated Drift Detection', '90% Retraining Overhead Saved'],
    imageUrl: ''
  },
  {
    company: 'ShyftLabs',
    role: 'Data Scientist',
    period: 'Jan 2024 – Aug 2025',
    order: 2,
    responsibilities: [
      'Built and deployed session-level recommendation systems for cross-sell and up-sell opportunities, enabling personalized ad delivery for registered and anonymous users.',
      'Developed multiple time series forecasting models for impressions, requests, and clicks using stacked models (Linear Regression, XGBoost, LightGBM) achieving MAPE under 10%.',
      'Designed a scalable semantic search engine using transformer-based embeddings and Elasticsearch vector search for improved query relevance.',
      'Built CTR prediction models to estimate click probability and dynamically rank advertisements.',
      'Developed a hybrid search architecture combining vector embeddings (paraphrase-MiniLM) with LLM-based query intent detection.',
      'Conducted data analysis and feature engineering using Python, Pandas, and SQL to improve model performance and campaign optimization.'
    ],
    architecture: `### System Architecture: Hybrid Search & Recommender Engine

\`\`\`
[ User Query / Ad Requests ]
            │
            ├─────────────────────────────────────────┐
            ▼                                         ▼
[ LLM Query Intent Detection ]           [ paraphrase-MiniLM Embeddings ]
            │                                         │
            └──────────────┬──────────────────────────┘
                           ▼
             [ Elasticsearch Hybrid Vector Search ]
                           │
                           ▼
             [ LightGBM CTR Prediction Re-ranker ]
                           │
                           ▼
             [ Personalized Ad Delivery (< 50ms) ]
\`\`\``,
    technologies: ['Python', 'Pandas', 'Elasticsearch', 'Transformers', 'LLMs', 'paraphrase-MiniLM', 'LightGBM', 'XGBoost', 'Gunicorn', 'Flask'],
    businessImpact: [
      'Boosted ad cross-sell/up-sell via real-time recommenders serving registered and guest users.',
      'Provided ad clicks forecasting with high precision for publisher budget optimization.',
      'Created scalable semantic search system for advertisements reducing search failures.'
    ],
    metrics: ['MAPE < 10%', 'Under 50ms Latency', 'High-accuracy CTR Re-ranking'],
    imageUrl: ''
  },
  {
    company: 'Intellipaat',
    role: 'Data Analyst & Research Intern',
    period: 'Aug 2023 – Dec 2023',
    order: 3,
    responsibilities: [
      'Conducted statistical analysis on learner activity data to identify behavioral trends and provide recommendations for platform improvements.',
      'Applied clustering algorithms (K-Means, DBSCAN) for student segmentation and cheating detection, achieving 80% automated detection accuracy.',
      'Mentored students in machine learning fundamentals and practical implementation of algorithms.'
    ],
    architecture: `### System Architecture: Learner Activity Clustering

\`\`\`
[ Learner Activity Logs (Clickstream, Time Spent, Submissions) ]
                             │
                             ▼
               [ Feature Vector Extraction ]
                             │
                             ▼
             [ Dimensionality Reduction (PCA) ]
                             │
                             ▼
         [ Clustering Engines (K-Means & DBSCAN) ]
                             │
                             ▼
            [ Automated Behavior Identification ]
                             │
                             ▼
          [ Student Cheating / Cheating Alerts (80% Acc) ]
\`\`\``,
    technologies: ['Python', 'K-Means', 'DBSCAN', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Statistics'],
    businessImpact: [
      'Identified student cheating patterns with high fidelity, preserving platform integrity.',
      'Segmented student behaviors to optimize learning path suggestions.'
    ],
    metrics: ['80% Automated Detection Accuracy', 'Behavioral Segments Optimized'],
    imageUrl: ''
  }
];

const projects = [
  {
    title: 'Claims Cost Forecast Lab (Insurance PLPM)',
    subtitle: 'Time series forecasting and drift monitoring system',
    content: `### Problem
An insurance client needed to project health insurance claims costs (PLPM - Per Life Per Month) for the next 12 months. Inaccurate estimates directly caused poor premium pricing, leading to major underwriting losses or uncompetitive rates.

### Solution
Developed a robust machine learning time series pipeline using stacked boosting approaches (XGBoost and LightGBM). Built scheduled pipelines for training and deployed an automated drift monitoring framework to track prediction error and feature changes over time.

### Challenges
*   **Data Non-Stationarity**: Healthcare claims are highly volatile and affected by seasonal changes, inflation, and changing policy structures.
*   **Solution**: Engineered lag features (rolling averages, YoY differences) and isolated seasonal indicators.
*   **Concept Drift**: Model accuracy degrades as claimant behaviors shift.
*   **Solution**: Implemented an automated monitoring system that tracks data/concept drift (using PSI and KS-tests) and triggers automated retraining when thresholds are violated.

### Results
*   Forecast accuracy achieved under **10% MAPE**.
*   Saved hundreds of engineering hours through self-monitoring, self-healing retraining pipelines.
*   Successfully integrated directly into client premium pricing dashboards.`,
    architecture: `\`\`\`
[Claims Database] ──> [Feature Pipeline] ──> [XGBoost/LightGBM Stack] ──> [Forecasts]
                             │
                             ▼
                   [PSI/KS Drift Monitors] ──> [Trigger Retrain (MLflow)]
\`\`\``,
    techStack: ['Python', 'XGBoost', 'LightGBM', 'Scikit-Learn', 'MLflow', 'Docker', 'SQL'],
    businessResults: [
      'Achieved forecasting error under 10% MAPE',
      'Established real-time alerts for drift detection',
      'Integrated predictions into corporate risk planning system'
    ],
    demoUrl: '/forecast-lab',
    githubUrl: 'https://github.com/abhii9v',
    featured: true,
    order: 1
  },
  {
    title: 'Session-Level Recommendation Engine',
    subtitle: 'Real-time personalization and CTR prediction system',
    content: `### Problem
E-commerce and advertising platforms lose user engagement if they cannot present personalized suggestions quickly. For anonymous visitors, lack of historical profiles makes recommendations difficult, necessitating session-based modeling.

### Solution
Created a real-time session-level recommender engine. It parses a user's clickstream actions in real-time, builds a dynamic session interest vector, retrieves candidates using Elasticsearch vector indexing, and ranks them using a lightweight CTR prediction model.

### Challenges
*   **Latency constraint**: Recommendations must be served under 50 milliseconds to prevent layout shift or loading delays.
*   **Solution**: Optimized vector indexes and built a lightweight ranking model. Deployed on Flask and Gunicorn with asynchronous workers.
*   **Cold Start**: Recommending to brand new visitors.
*   **Solution**: Built popular-item and categorized fallback loops based on referral headers and geo-location.

### Results
*   Personalized recommendations served in under **50ms**.
*   Achieved double-digit lift in cross-sell CTR.
*   Successfully scaled to handle registered and anonymous traffic.`,
    architecture: `\`\`\`
[Clickstream Event] ──> [Session Vectorizer] ──> [Elasticsearch Retrieve] ──> [LightGBM Rank] ──> [Ads Served (<50ms)]
\`\`\``,
    techStack: ['Python', 'Elasticsearch', 'LightGBM', 'Flask', 'Gunicorn', 'Transformers'],
    businessResults: [
      'Served recommendations under 50ms',
      'Increased ad CTR via real-time click modeling',
      'Unified recommendation loop for registered and anonymous users'
    ],
    demoUrl: '',
    githubUrl: 'https://github.com/abhii9v',
    featured: true,
    order: 2
  },
  {
    title: 'Hybrid Semantic Vector Search',
    subtitle: 'Dense embeddings and LLM intent recognition search engine',
    content: `### Problem
Keyword-based search engines (like BM25) fail when users query using synonyms, natural language questions, or when they express implicit intents.

### Solution
Designed a hybrid search engine combining vector embeddings ('paraphrase-MiniLM') and Elasticsearch BM25 search. Integrated an LLM-based query intent classifier that reads queries and dynamically adjusts the weights of vector vs. keyword scores.

### Challenges
*   **Vocabulary Mismatch**: Users searching for "automobile coverage" instead of "car insurance".
*   **Solution**: Dense embeddings easily captured semantic similarity.
*   **Latency & Payload**: Running transformers for every query can choke servers.
*   **Solution**: Quantized embeddings and optimized Elasticsearch indexes.

### Results
*   Instantaneous semantic matching.
*   Relevance scores (NDCG@10) increased significantly.
*   High intent routing accuracy.`,
    architecture: `\`\`\`
[User Query] ──> [LLM Intent Router] ── (adjust weights) ──> [Elasticsearch Hybrid Search] ──> [Results]
      │
      └──> [paraphrase-MiniLM Embeddings] ───────────┘
\`\`\``,
    techStack: ['paraphrase-MiniLM', 'LLMs', 'Elasticsearch', 'Transformers', 'Python', 'SQL'],
    businessResults: [
      'Instant vector similarity search (<15ms latency)',
      'Substantially reduced empty search results pages',
      'Dynamic intent recognition for targeted ranking'
    ],
    demoUrl: '',
    githubUrl: 'https://github.com/abhii9v',
    featured: true,
    order: 3
  }
];

const knowledgeChunks = [
  {
    category: 'resume',
    title: 'Abhinav Yadav Overview',
    content: 'Abhinav Yadav is a Senior Data Scientist with a B.Tech in Computer Science from Lovely Professional University (2020 - 2024). He has worked as a Data Scientist at Cognitio Analytics and ShyftLabs, and a Data Analyst Intern at Intellipaat. He specializes in time series forecasting, recommendation systems, LLM-based hybrid search systems, and end-to-end machine learning pipeline deployment.',
    keywords: ['abhinav yadav', 'summary', 'profile', 'data scientist', 'education', 'skills']
  },
  {
    category: 'experience',
    title: 'Cognitio Analytics Experience',
    content: 'At Cognitio Analytics (Sep 2025 - Present), Abhinav developed time series forecasting models to predict 12-month Per Life Per Month (PLPM) insurance cost using regression and boosting, achieving less than 10% MAPE. He built scheduled retraining pipelines and implemented an automated model monitoring framework to track prediction accuracy and detect data and concept drift using MLflow and Docker.',
    keywords: ['cognitio analytics', 'experience', 'forecasting', 'insurance', 'mape', 'retraining', 'monitoring', 'drift']
  },
  {
    category: 'experience',
    title: 'ShyftLabs Experience',
    content: 'At ShyftLabs (Jan 2024 - Aug 2025), Abhinav built and deployed session-level recommendation systems for cross-sell/up-sell opportunities, enabling ad delivery for registered and anonymous users. He also developed stacked time series models for impressions, requests, and clicks (<10% MAPE), CTR prediction models, and designed a hybrid semantic search engine using paraphrase-MiniLM embeddings and Elasticsearch vector search.',
    keywords: ['shyftlabs', 'experience', 'recommendation', 'CTR', 'semantic search', 'paraphrase-minilm', 'elasticsearch']
  },
  {
    category: 'experience',
    title: 'Intellipaat Intern Experience',
    content: 'At Intellipaat (Aug 2023 - Dec 2023), Abhinav worked as a Data Analyst & Research Intern. He conducted statistical analysis on student activity data and applied clustering algorithms (K-Means, DBSCAN) for learner segmentation and cheating detection, achieving 80% automated detection accuracy.',
    keywords: ['intellipaat', 'intern', 'cheating detection', 'k-means', 'dbscan', 'clustering', 'student segmentation']
  },
  {
    category: 'resume',
    title: 'Technical Skills List',
    content: 'Programming: Python, SQL, PySpark, Git. Machine Learning: Linear Regression, Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM. ML Frameworks: Scikit-learn, TensorFlow, PyTorch. Time Series: Forecasting, Feature Engineering, Model Evaluation. NLP/GenAI: Transformers, LLMs, Embeddings, Prompt Engineering. Data Processing: Pandas, NumPy, ETL Pipelines. Model Deployment: Docker, Flask, Gunicorn, MLflow. Databases: PostgreSQL, Elasticsearch, MongoDB. Visualization: Tableau, Matplotlib, Seaborn. Statistics: Hypothesis Testing, A/B Testing.',
    keywords: ['skills', 'technologies', 'programming', 'machine learning', 'frameworks', 'databases', 'python', 'sql']
  },
  {
    category: 'resume',
    title: 'Why Hire Abhinav',
    content: 'You should hire Abhinav because he is a highly capable production-oriented Data Scientist. He does not just train models in Jupyter Notebooks; he builds end-to-end ML pipelines with automated monitoring, drift detection, and scheduled retraining (MLflow, Docker). He has direct business impact, such as reducing claims forecasting errors to <10% MAPE and implementing recommendation models serving ad traffic under 50ms latency.',
    keywords: ['why hire', 'value', 'hiring manager', 'production', 'mlops', 'business impact']
  }
];

export async function GET() {
  try {
    console.log('Starting Appwrite Database Seeding...');

    // 1. Seed Experiences
    for (const exp of experiences) {
      // Find or create
      const existing = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.experience,
        []
      );
      
      const exists = existing.documents.some((doc: any) => doc.company === exp.company);
      if (!exists) {
        await serverDatabases.createDocument(
          DATABASE_ID,
          COLLECTIONS.experience,
          ID.unique(),
          exp
        );
        console.log(`Seeded experience: ${exp.company}`);
      }
    }

    // 2. Seed Projects
    for (const proj of projects) {
      const existing = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.projects,
        []
      );
      const exists = existing.documents.some((doc: any) => doc.title === proj.title);
      if (!exists) {
        await serverDatabases.createDocument(
          DATABASE_ID,
          COLLECTIONS.projects,
          ID.unique(),
          proj
        );
        console.log(`Seeded project: ${proj.title}`);
      }
    }

    // 3. Seed Knowledge Base for RAG
    for (const chunk of knowledgeChunks) {
      const existing = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.knowledge_base,
        []
      );
      const exists = existing.documents.some((doc: any) => doc.title === chunk.title);
      if (!exists) {
        await serverDatabases.createDocument(
          DATABASE_ID,
          COLLECTIONS.knowledge_base,
          ID.unique(),
          chunk
        );
        console.log(`Seeded knowledge chunk: ${chunk.title}`);
      }
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
