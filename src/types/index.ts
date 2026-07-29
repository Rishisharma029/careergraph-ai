export type PersonaType = 'student' | 'jobseeker' | 'freelancer' | 'recruiter';

export type ArtifactCategory = 'Resume' | 'Certificate' | 'Project Report' | 'Offer Letter' | 'GitHub Repo';

export interface EvidenceRecord {
  documentId: string;
  documentTitle: string;
  pageOrSection: string;
  excerpt: string;
  confidence: number;
}

export interface InferredSkill {
  name: string;
  category: string;
  derivedFrom: string;
  confidence: number;
  reason: string;
}

export interface Artifact {
  id: string;
  title: string;
  category: ArtifactCategory;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  confidenceScore: number;
  parsedText: string;
  entityTags: {
    skills: string[];
    projects: string[];
    roles: string[];
    tools: string[];
  };
  verified: boolean;
  issuer?: string;
  evidenceList?: EvidenceRecord[];
}

export type NodeType = 'root' | 'category_hub' | 'skill' | 'project' | 'certificate' | 'role' | 'education';
export type NodeImportance = 'root' | 'large' | 'medium' | 'small';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  importance?: NodeImportance;
  level?: string;
  proficiencyScore?: number;
  year?: string;
  iconName?: string;
  x: number;
  y: number;
  z?: number; // 3D Canvas Coordinate
  parentId?: string;
  isExpanded?: boolean;
  subNodes?: { id: string; label: string; category: string }[];
  connections: {
    targetId: string;
    relationship: 'built_with' | 'uses' | 'demonstrates' | 'verifies' | 'earned' | 'studied_at' | 'implements' | string;
  }[];
  documentRefIds: string[];
  description?: string;
  evidenceList?: EvidenceRecord[];
  inferredSkills?: InferredSkill[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export type MilestoneCategory = 'work' | 'project' | 'certification' | 'education';

export interface Milestone {
  id: string;
  title: string;
  organization: string;
  date: string;
  year: number;
  category: MilestoneCategory;
  description: string;
  skillsUsed: string[];
  impactMetric?: string;
  verifiedDocId?: string;
  verifiedDocTitle?: string;
}

export interface Citation {
  documentId: string;
  documentTitle: string;
  category: ArtifactCategory;
  excerpt: string;
}

export type AgentType = 'general' | 'resume' | 'portfolio' | 'advisor' | 'interview' | 'learning' | 'twin';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'twin';
  text: string;
  timestamp: string;
  agentType?: AgentType;
  citations?: Citation[];
  suggestedFollowups?: string[];
  isStreaming?: boolean;
}

export interface SkillGapItem {
  skillName: string;
  category: 'AI / ML' | 'Backend' | 'Frontend' | 'Cloud / DevOps' | 'Database';
  currentScore: number;
  targetScore: number;
  verifiedInDoc?: string;
  recommendation: string;
}

export interface TargetRole {
  id: string;
  title: string;
  matchPercentage: number;
  matchedSkillsCount: number;
  totalSkillsCount: number;
  keySkills: string[];
  missingSkills: string[];
  matchExplanation?: {
    matched: string[];
    missing: string[];
    recommendation: string;
  };
}

export interface JDMatchResult {
  jobTitle: string;
  companyName?: string;
  overallMatchScore: number;
  interviewProbability: number;
  matchedSkills: string[];
  missingCriticalSkills: string[];
  inferredMatches: string[];
  experienceFitScore: number;
  recommendations: string[];
}

export interface SalaryForecast {
  period: 'Current' | '6 Months' | '1 Year' | '3 Years';
  estimatedSalaryRange: string;
  marketReadinessIndex: number;
  projectedSkillsCount: number;
  keyUnlocks: string[];
}

export interface PersonalityAttribute {
  trait: string;
  score: number;
  evidenceSummary: string;
}

export interface AISuggestion {
  id: string;
  title: string;
  actionText: string;
  category: 'resume' | 'skill' | 'portfolio' | 'metric';
  impact: 'high' | 'medium';
  route: string;
}

export type PortfolioTheme = 'glass' | 'cyber' | 'minimal';
export type DeviceViewport = 'desktop' | 'mobile' | 'tablet';

export interface PortfolioConfig {
  theme: PortfolioTheme;
  customSlug: string;
  isPublic: boolean;
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  featuredSkillIds: string[];
  showGraph: boolean;
  showTimeline: boolean;
  showVerificationBadges: boolean;
}
