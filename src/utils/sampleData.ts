import { Artifact, GraphNode, Milestone, SkillGapItem, TargetRole, PortfolioConfig, AISuggestion } from '../types';

export const SAMPLE_ARTIFACTS: Artifact[] = [
  {
    id: 'doc-1',
    title: 'Rishi_Sharma_Resume_2026.pdf',
    category: 'Resume',
    fileName: 'Rishi_Sharma_Resume_2026.pdf',
    fileSize: '1.4 MB',
    uploadDate: '2026-06-15',
    confidenceScore: 99,
    parsedText: 'Bachelor of Computer Applications student at Satyug Darshan Institute. Full-Stack AI Engineer experienced in Python, React, FastAPI, Docker, OpenCV, TrOCR, and OCR. Projects: HDRS, EvalSync, LeafSense AI, CampusOS.',
    entityTags: {
      skills: ['Python', 'React', 'FastAPI', 'Docker', 'TrOCR + OpenCV', 'AWS'],
      projects: ['HDRS', 'EvalSync', 'LeafSense AI', 'CampusOS'],
      roles: ['Full-Stack AI Engineer'],
      tools: ['Microsoft', 'Anthropic', 'Internshala', 'GitHub']
    },
    verified: true,
    issuer: 'Verified OCR Engine'
  },
  {
    id: 'doc-2',
    title: 'AWS Certified Cloud Practitioner Certificate.pdf',
    category: 'Certificate',
    fileName: 'AWS_Cloud_Practitioner_Cert.pdf',
    fileSize: '850 KB',
    uploadDate: '2026-03-10',
    confidenceScore: 99,
    parsedText: 'Amazon Web Services Training & Certification awarded to Rishi Sharma for AWS Certified Cloud Practitioner credential (Score: 890/1000).',
    entityTags: {
      skills: ['AWS Cloud', 'S3', 'EC2'],
      projects: ['Cloud Infrastructure'],
      roles: ['Cloud Specialist'],
      tools: ['Amazon Web Services']
    },
    verified: true,
    issuer: 'Amazon Web Services'
  },
  {
    id: 'doc-3',
    title: 'Claude 101 AI Prompt Engineering Certificate.pdf',
    category: 'Certificate',
    fileName: 'Claude_101_Certification.pdf',
    fileSize: '920 KB',
    uploadDate: '2026-01-20',
    confidenceScore: 98,
    parsedText: 'Anthropic Claude 101 Masterclass certification validating prompt engineering and LLM application architecture.',
    entityTags: {
      skills: ['Prompt Engineering', 'LLM Architecture'],
      projects: ['DevInspect AI'],
      roles: ['AI Developer'],
      tools: ['Anthropic']
    },
    verified: true,
    issuer: 'Anthropic'
  },
  {
    id: 'doc-4',
    title: 'HDRS_High_Accuracy_Document_Recognition_Report.pdf',
    category: 'Project Report',
    fileName: 'HDRS_Project_Report.pdf',
    fileSize: '1.8 MB',
    uploadDate: '2025-11-15',
    confidenceScore: 97,
    parsedText: 'Technical project documentation for HDRS (High-accuracy Document Recognition System) powered by TrOCR, OpenCV, FastAPI, and React.',
    entityTags: {
      skills: ['TrOCR + OpenCV', 'FastAPI', 'React', 'Docker'],
      projects: ['HDRS'],
      roles: ['Lead Architect'],
      tools: ['VS Code', 'Docker']
    },
    verified: true,
    issuer: 'Satyug Darshan Institute'
  }
];

// STRICT 100% UNIQUE ENTITY NODES (EXACTLY ONE NODE PER CONCEPT)
export const SAMPLE_NODES: GraphNode[] = [
  // 👤 1. ROOT NODE (Top Center Y=60)
  {
    id: 'node-root-user',
    label: 'Rishi Sharma',
    type: 'root',
    importance: 'root',
    year: '2026',
    x: 420,
    y: 60,
    connections: [
      { targetId: 'hub-projects', relationship: 'has_category' },
      { targetId: 'node-python', relationship: 'has_skill' },
      { targetId: 'hub-certs', relationship: 'has_category' },
      { targetId: 'node-edu-bca', relationship: 'studied_at' }
    ],
    documentRefIds: ['doc-1'],
    description: 'Full-Stack AI Engineer & Document AI Developer. BCA student at Satyug Darshan Institute.'
  },

  // 📂 2. PRIMARY CATEGORY HUBS (Y=170)
  {
    id: 'hub-projects',
    label: '📁 Projects',
    type: 'category_hub',
    importance: 'large',
    x: 180,
    y: 170,
    parentId: 'node-root-user',
    isExpanded: true,
    connections: [
      { targetId: 'node-proj-hdrs', relationship: 'contains' },
      { targetId: 'node-proj-evalsync', relationship: 'contains' },
      { targetId: 'node-proj-leafsense', relationship: 'contains' },
      { targetId: 'node-proj-campusos', relationship: 'contains' }
    ],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'Verified AI engineering projects built with modern backend and computer vision stacks.'
  },
  {
    id: 'hub-certs',
    label: '🔵 Certifications',
    type: 'category_hub',
    importance: 'large',
    x: 720,
    y: 170,
    parentId: 'node-root-user',
    isExpanded: true,
    connections: [
      { targetId: 'node-cert-aws', relationship: 'contains' },
      { targetId: 'node-cert-claude', relationship: 'contains' }
    ],
    documentRefIds: ['doc-2', 'doc-3'],
    description: 'Formal industry credentials validating cloud security and prompt engineering mastery.'
  },

  // 🟠 3. UNIQUE PROJECTS (Left Side Y=280 and Y=400)
  {
    id: 'node-proj-hdrs',
    label: 'HDRS (Document AI)',
    type: 'project',
    importance: 'large',
    year: '2026',
    x: 110,
    y: 280,
    parentId: 'hub-projects',
    connections: [
      { targetId: 'node-python', relationship: 'built_with' },
      { targetId: 'node-fastapi', relationship: 'built_with' },
      { targetId: 'node-trocr', relationship: 'built_with' }
    ],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'High-accuracy Document Recognition System built with TrOCR, OpenCV, FastAPI, and React.'
  },
  {
    id: 'node-proj-evalsync',
    label: 'EvalSync',
    type: 'project',
    importance: 'large',
    year: '2025',
    x: 270,
    y: 280,
    parentId: 'hub-projects',
    connections: [
      { targetId: 'node-python', relationship: 'built_with' },
      { targetId: 'node-react', relationship: 'built_with' }
    ],
    documentRefIds: ['doc-1'],
    description: 'Automated evaluation and grading platform for academic assignments.'
  },
  {
    id: 'node-proj-leafsense',
    label: 'LeafSense AI',
    type: 'project',
    importance: 'small',
    year: '2025',
    x: 110,
    y: 400,
    parentId: 'hub-projects',
    connections: [
      { targetId: 'node-python', relationship: 'built_with' }
    ],
    documentRefIds: ['doc-1'],
    description: 'AI-powered agricultural crop disease detection system using computer vision.'
  },
  {
    id: 'node-proj-campusos',
    label: 'CampusOS',
    type: 'project',
    importance: 'small',
    year: '2025',
    x: 270,
    y: 400,
    parentId: 'hub-projects',
    connections: [
      { targetId: 'node-react', relationship: 'built_with' }
    ],
    documentRefIds: ['doc-1'],
    description: 'Smart campus management system for course registration and student analytics.'
  },

  // 🟣 4. UNIQUE CENTRAL SKILLS CORE (EXACTLY 5 SKILL NODES TOTAL, ZERO DUPLICATES)
  {
    id: 'node-python',
    label: 'Python',
    type: 'skill',
    importance: 'large',
    level: 'Expert',
    proficiencyScore: 95,
    year: '2023-2026',
    x: 420,
    y: 300,
    parentId: 'node-root-user',
    connections: [
      { targetId: 'node-fastapi', relationship: 'implements' }
    ],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'Core backend and AI language used for machine learning models, OCR pipelines, and microservice backends.'
  },
  {
    id: 'node-fastapi',
    label: 'FastAPI',
    type: 'skill',
    importance: 'medium',
    level: 'Advanced',
    proficiencyScore: 92,
    year: '2024-2026',
    x: 340,
    y: 420,
    parentId: 'node-python',
    connections: [],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'High-performance async Python web framework powering HDRS REST API microservices.'
  },
  {
    id: 'node-react',
    label: 'React',
    type: 'skill',
    importance: 'medium',
    level: 'Advanced',
    proficiencyScore: 90,
    year: '2024-2026',
    x: 500,
    y: 420,
    parentId: 'node-python',
    connections: [],
    documentRefIds: ['doc-1'],
    description: 'Modern frontend web framework used for interactive dashboards and real-time state UI.'
  },
  {
    id: 'node-docker',
    label: 'Docker',
    type: 'skill',
    importance: 'medium',
    level: 'Advanced',
    proficiencyScore: 88,
    year: '2025-2026',
    x: 340,
    y: 520,
    parentId: 'node-python',
    connections: [],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'Containerization engine for deploying microservices with isolated dependencies.'
  },
  {
    id: 'node-trocr',
    label: 'TrOCR + OpenCV',
    type: 'skill',
    importance: 'medium',
    level: 'Expert',
    proficiencyScore: 94,
    year: '2025-2026',
    x: 500,
    y: 520,
    parentId: 'node-python',
    connections: [],
    documentRefIds: ['doc-1', 'doc-4'],
    description: 'Microsoft Transformer OCR and computer vision image preprocessing pipeline.'
  },

  // 🔵 5. UNIQUE CERTIFICATES (Right Side Y=280)
  {
    id: 'node-cert-aws',
    label: 'AWS Cloud Practitioner',
    type: 'certificate',
    importance: 'small',
    year: '2026',
    x: 650,
    y: 280,
    parentId: 'hub-certs',
    connections: [
      { targetId: 'node-docker', relationship: 'verifies' }
    ],
    documentRefIds: ['doc-2'],
    description: 'Official AWS cloud certification validating cloud architecture, security, and EC2/S3 basics.'
  },
  {
    id: 'node-cert-claude',
    label: 'Claude 101 Masterclass',
    type: 'certificate',
    importance: 'small',
    year: '2026',
    x: 790,
    y: 280,
    parentId: 'hub-certs',
    connections: [
      { targetId: 'node-python', relationship: 'verifies' }
    ],
    documentRefIds: ['doc-3'],
    description: 'Anthropic certification in prompt engineering and LLM application development.'
  },

  // 🟢 6. EDUCATION BASE LAYER (Bottom Center Y=610)
  {
    id: 'node-edu-bca',
    label: 'BCA @ Satyug Darshan Institute',
    type: 'education',
    importance: 'medium',
    year: '2023-2026',
    x: 420,
    y: 610,
    parentId: 'node-root-user',
    connections: [
      { targetId: 'node-python', relationship: 'studied' }
    ],
    documentRefIds: ['doc-1'],
    description: 'Bachelor of Computer Applications specializing in Computer Science and Applied AI.'
  }
];

export const SAMPLE_MILESTONES: Milestone[] = [
  {
    id: 'ms-1',
    title: 'AWS Certified Cloud Practitioner',
    organization: 'Amazon Web Services',
    date: 'March 10, 2026',
    year: 2026,
    category: 'certification',
    description: 'Achieved AWS Certified Cloud Practitioner certification with an 890/1000 score.',
    skillsUsed: ['AWS Cloud', 'S3', 'EC2', 'IAM'],
    impactMetric: '890/1000 Exam Score',
    verifiedDocId: 'doc-2',
    verifiedDocTitle: 'AWS Certified Cloud Practitioner Certificate.pdf'
  },
  {
    id: 'ms-2',
    title: 'Architected HDRS Document Recognition System',
    organization: 'AI Project',
    date: 'January 15, 2026',
    year: 2026,
    category: 'project',
    description: 'Built HDRS using Microsoft TrOCR, OpenCV, FastAPI, and React for high-precision OCR text extraction.',
    skillsUsed: ['TrOCR + OpenCV', 'FastAPI', 'React', 'Docker'],
    impactMetric: '99.4% Extraction Precision',
    verifiedDocId: 'doc-4',
    verifiedDocTitle: 'HDRS_Project_Report.pdf'
  },
  {
    id: 'ms-3',
    title: 'Completed Claude 101 AI Masterclass',
    organization: 'Anthropic',
    date: 'January 20, 2026',
    year: 2026,
    category: 'certification',
    description: 'Passed Anthropic prompt engineering certification for LLM application architectures.',
    skillsUsed: ['Prompt Engineering', 'Claude API', 'LLM Architecture'],
    impactMetric: 'Anthropic Certified',
    verifiedDocId: 'doc-3',
    verifiedDocTitle: 'Claude_101_Certification.pdf'
  },
  {
    id: 'ms-4',
    title: 'Enrolled in BCA at Satyug Darshan Institute',
    organization: 'Satyug Darshan Institute',
    date: 'August 2023',
    year: 2023,
    category: 'education',
    description: 'Bachelor of Computer Applications track focusing on Data Structures, Web Development, and AI.',
    skillsUsed: ['Python', 'React', 'C++', 'SQL'],
    impactMetric: 'Academic Honor Roll',
    verifiedDocId: 'doc-1',
    verifiedDocTitle: 'Rishi_Sharma_Resume_2026.pdf'
  }
];

export const SAMPLE_TARGET_ROLES: TargetRole[] = [
  {
    id: 'role-1',
    title: 'Full-Stack AI Engineer',
    matchPercentage: 96,
    matchedSkillsCount: 9,
    totalSkillsCount: 10,
    keySkills: ['Python', 'FastAPI', 'React', 'TypeScript', 'Docker', 'TrOCR + OpenCV', 'AWS'],
    missingSkills: ['Kubernetes'],
    matchExplanation: {
      matched: ['Python (95%)', 'FastAPI (92%)', 'React (90%)', 'TrOCR + OpenCV (94%)', 'AWS Cloud (89%)', 'Docker (88%)'],
      missing: ['Kubernetes'],
      recommendation: 'Complete a Kubernetes deployment hands-on project to reach 100% role match.'
    }
  }
];

export const SAMPLE_AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: 'sug-1',
    title: 'Add HDRS TrOCR Latency Metrics',
    actionText: 'Quantify OCR extraction response time (e.g. processed 10-page document in 280ms).',
    category: 'metric',
    impact: 'high',
    route: 'documents'
  },
  {
    id: 'sug-2',
    title: 'Acquire Missing Kubernetes Credential',
    actionText: 'You are 1 skill away from a 100% match for Full-Stack AI Engineer role.',
    category: 'skill',
    impact: 'high',
    route: 'analytics'
  }
];

export const SAMPLE_SKILL_GAPS: SkillGapItem[] = [
  {
    skillName: 'Kubernetes (K8s) Orchestration',
    category: 'Cloud / DevOps',
    currentScore: 60,
    targetScore: 85,
    verifiedInDoc: 'AWS Certificate',
    recommendation: 'Obtain Certified Kubernetes Application Developer (CKAD) credential.'
  }
];

export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  theme: 'glass',
  customSlug: 'rishisharma',
  isPublic: true,
  fullName: 'Rishi Sharma',
  headline: 'Full-Stack AI Engineer & Document AI Developer',
  bio: 'Building intelligent, graph-connected web applications and high-precision document recognition systems. BCA student at Satyug Darshan Institute.',
  email: 'rishi.sharma@example.com',
  githubUrl: 'https://github.com/rishisharma',
  linkedinUrl: 'https://linkedin.com/in/rishisharma',
  featuredSkillIds: ['node-python', 'node-fastapi', 'node-trocr', 'node-react', 'node-docker'],
  showGraph: true,
  showTimeline: true,
  showVerificationBadges: true
};
