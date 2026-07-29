import { InferredSkill, JDMatchResult, SalaryForecast, PersonalityAttribute } from '../types';

// AI Skill Inference Dictionary
const INFERENCE_MAP: Record<string, InferredSkill[]> = {
  'FastAPI': [
    { name: 'REST API Design', category: 'Backend', derivedFrom: 'FastAPI', confidence: 96, reason: 'FastAPI microservices strictly mandate OpenAPI and RESTful endpoint design.' },
    { name: 'Microservices Architecture', category: 'Backend', derivedFrom: 'FastAPI', confidence: 94, reason: 'FastAPI is deployed in containerized microservices architecture.' },
    { name: 'Async I/O Processing', category: 'Backend', derivedFrom: 'FastAPI', confidence: 95, reason: 'FastAPI utilizes Python async/await for high throughput.' }
  ],
  'Python': [
    { name: 'Data Processing Pipelines', category: 'Data Science', derivedFrom: 'Python', confidence: 92, reason: 'Python ecosystem powers document text processing and OpenCV pipelines.' },
    { name: 'Algorithm Optimization', category: 'Computer Science', derivedFrom: 'Python', confidence: 90, reason: 'Python algorithms drive graph entity whitelisting.' }
  ],
  'React': [
    { name: 'Component-Driven Architecture', category: 'Frontend', derivedFrom: 'React', confidence: 95, reason: 'React applications utilize modular reusable UI state hooks.' },
    { name: 'State Management (Zustand)', category: 'Frontend', derivedFrom: 'React', confidence: 93, reason: 'React frontend consumes centralized Zustand store.' }
  ],
  'TrOCR': [
    { name: 'Document Computer Vision', category: 'AI / ML', derivedFrom: 'TrOCR', confidence: 98, reason: 'Microsoft TrOCR is a transformer-based vision-encoder text-decoder model.' },
    { name: 'Transformer Architectures', category: 'AI / ML', derivedFrom: 'TrOCR', confidence: 95, reason: 'TrOCR utilizes Vision Transformers (ViT) for OCR text extraction.' }
  ],
  'OpenCV': [
    { name: 'Image Preprocessing', category: 'AI / ML', derivedFrom: 'OpenCV', confidence: 96, reason: 'OpenCV performs document deskewing, binarization, and contour detection.' },
    { name: 'Computer Vision Pipelines', category: 'AI / ML', derivedFrom: 'OpenCV', confidence: 94, reason: 'OpenCV handles image matrix manipulation prior to OCR model inference.' }
  ],
  'Docker': [
    { name: 'Containerization', category: 'Cloud / DevOps', derivedFrom: 'Docker', confidence: 97, reason: 'Docker packages FastAPI microservices for portable cloud deployment.' },
    { name: 'DevOps Deployment', category: 'Cloud / DevOps', derivedFrom: 'Docker', confidence: 92, reason: 'Docker containers are deployed in continuous production environments.' }
  ]
};

// Returns inferred skills based on explicit skills
export const inferSkillsFromExplicit = (explicitSkills: string[]): InferredSkill[] => {
  const inferred: InferredSkill[] = [];
  const seen = new Set<string>();

  explicitSkills.forEach(skill => {
    const matches = INFERENCE_MAP[skill] || [];
    matches.forEach(item => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        inferred.push(item);
      }
    });
  });

  return inferred;
};

// AI Recruiter JD Matcher Engine
export const matchJobDescription = (jdText: string, userSkills: string[]): JDMatchResult => {
  const jdLower = jdText.toLowerCase();

  const targetKeywords = [
    { name: 'Python', weight: 15 },
    { name: 'FastAPI', weight: 15 },
    { name: 'React', weight: 12 },
    { name: 'TypeScript', weight: 10 },
    { name: 'Docker', weight: 10 },
    { name: 'TrOCR', weight: 15 },
    { name: 'OpenCV', weight: 10 },
    { name: 'PostgreSQL', weight: 8 },
    { name: 'Kubernetes', weight: 12 },
    { name: 'AWS', weight: 10 },
    { name: 'GraphQL', weight: 8 }
  ];

  const matchedSkills: string[] = [];
  const missingCriticalSkills: string[] = [];
  let scoreSum = 0;
  let totalWeight = 0;

  targetKeywords.forEach(kw => {
    totalWeight += kw.weight;
    const isPresentInJD = jdLower.includes(kw.name.toLowerCase());
    const isUserHas = userSkills.some(s => s.toLowerCase().includes(kw.name.toLowerCase()));

    if (isPresentInJD) {
      if (isUserHas) {
        matchedSkills.push(kw.name);
        scoreSum += kw.weight;
      } else {
        missingCriticalSkills.push(kw.name);
      }
    } else if (isUserHas) {
      matchedSkills.push(kw.name);
      scoreSum += (kw.weight * 0.7);
    }
  });

  const matchedInferred = inferSkillsFromExplicit(matchedSkills).map(i => i.name);
  const overallMatchScore = Math.min(Math.round((scoreSum / Math.max(totalWeight, 40)) * 100) + 15, 98);
  const interviewProbability = Math.min(Math.round(overallMatchScore * 0.95), 96);

  // Extract job title from JD text
  let jobTitle = 'Full-Stack AI Engineer';
  if (jdLower.includes('backend')) jobTitle = 'Senior Backend AI Engineer';
  else if (jdLower.includes('computer vision') || jdLower.includes('ocr')) jobTitle = 'Document AI & Computer Vision Specialist';
  else if (jdLower.includes('full stack') || jdLower.includes('fullstack')) jobTitle = 'Lead Full-Stack AI Architect';

  return {
    jobTitle,
    companyName: 'Target Enterprise AI Company',
    overallMatchScore,
    interviewProbability,
    matchedSkills: Array.from(new Set(matchedSkills)),
    missingCriticalSkills: Array.from(new Set(missingCriticalSkills.length > 0 ? missingCriticalSkills : ['Kubernetes', 'Distributed Systems'])),
    inferredMatches: matchedInferred.slice(0, 4),
    experienceFitScore: 94,
    recommendations: [
      'Highlight HDRS 99.4% TrOCR accuracy metric in your introduction.',
      'Add Kubernetes deployment manifest to reach 100% role match.',
      'Emphasize FastAPI async microservices performance during technical interview.'
    ]
  };
};

// Salary & Growth Trajectory Predictor
export const getSalaryForecasts = (): SalaryForecast[] => [
  {
    period: 'Current',
    estimatedSalaryRange: '$85,000 - $105,000',
    marketReadinessIndex: 94,
    projectedSkillsCount: 12,
    keyUnlocks: ['Verified HDRS Project', 'Microsoft TrOCR Engine', 'FastAPI & React Stack']
  },
  {
    period: '6 Months',
    estimatedSalaryRange: '$115,000 - $135,000',
    marketReadinessIndex: 97,
    projectedSkillsCount: 16,
    keyUnlocks: ['Kubernetes Cluster Deployment', 'Distributed Vector Databases (Qdrant)', 'CI/CD Pipelines']
  },
  {
    period: '1 Year',
    estimatedSalaryRange: '$145,000 - $170,000',
    marketReadinessIndex: 99,
    projectedSkillsCount: 20,
    keyUnlocks: ['Lead AI Systems Architect', 'Enterprise Document AI Pipeline', 'AWS Solutions Architect Cert']
  },
  {
    period: '3 Years',
    estimatedSalaryRange: '$190,000 - $240,000',
    marketReadinessIndex: 100,
    projectedSkillsCount: 28,
    keyUnlocks: ['Principal AI Engineer', 'Autonomous Agent Infrastructure', 'VP of AI Engineering Candidate']
  }
];

// AI Personality DNA Evaluator
export const getPersonalityDNA = (): PersonalityAttribute[] => [
  { trait: 'Technical Rigor', score: 96, evidenceSummary: 'Validated via 99.4% TrOCR extraction accuracy in HDRS Project Report.' },
  { trait: 'Learning Velocity', score: 99, evidenceSummary: 'Progressed from 2023 college student to 2026 Production AI Architect in 3 years.' },
  { trait: 'Innovation & Problem Solving', score: 98, evidenceSummary: 'Pioneered zero-junk whitelisting engine purging PDF specification metadata.' },
  { trait: 'Consistency & Execution', score: 95, evidenceSummary: 'Shipped 4 production-grade projects (HDRS, EvalSync, LeafSense AI, CampusOS).' },
  { trait: 'Communication & Clarity', score: 92, evidenceSummary: 'Demonstrated via 30s Recruiter Pitch and 100% verified document proof grounding.' }
];
