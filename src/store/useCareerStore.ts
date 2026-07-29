import { create } from 'zustand';
import { Artifact, GraphNode, Milestone, ChatMessage, PersonaType, PortfolioConfig, SkillGapItem, TargetRole, AISuggestion } from '../types';
import { SAMPLE_ARTIFACTS, SAMPLE_NODES, SAMPLE_MILESTONES, SAMPLE_SKILL_GAPS, SAMPLE_TARGET_ROLES, DEFAULT_PORTFOLIO_CONFIG, SAMPLE_AI_SUGGESTIONS } from '../utils/sampleData';
import { extractEntitiesFromText, sanitizePDFText } from '../utils/entityExtractor';

interface CareerState {
  currentPersona: PersonaType;
  artifacts: Artifact[];
  nodes: GraphNode[];
  milestones: Milestone[];
  skillGaps: SkillGapItem[];
  targetRoles: TargetRole[];
  aiSuggestions: AISuggestion[];
  portfolioConfig: PortfolioConfig;
  recruiterViewActive: boolean;
  selectedNodeId: string | null;
  selectedDocId: string | null;
  activeTimelineSkillFilter: string | null;
  highlightedNodeIds: string[];
  chatMessages: ChatMessage[];
  isParsingDocument: boolean;
  parsingProgress: number;
  recentExtractedTags: string[];

  // Actions
  setPersona: (persona: PersonaType) => void;
  toggleRecruiterView: () => void;
  loadSampleData: () => void;
  selectNode: (nodeId: string | null) => void;
  selectDoc: (docId: string | null) => void;
  selectDocAndHighlightGraph: (docId: string) => void;
  filterTimelineByNode: (nodeId: string, skillLabel: string) => void;
  clearTimelineFilter: () => void;
  uploadDocumentSimulated: (file: File, customSkills?: string[], rawText?: string) => Promise<void>;
  deleteArtifact: (docId: string) => void;
  sendChatMessage: (query: string) => void;
  updatePortfolioConfig: (config: Partial<PortfolioConfig>) => void;
}

export const useCareerStore = create<CareerState>((set, get) => ({
  currentPersona: 'student',
  artifacts: SAMPLE_ARTIFACTS,
  nodes: SAMPLE_NODES,
  milestones: SAMPLE_MILESTONES,
  skillGaps: SAMPLE_SKILL_GAPS,
  targetRoles: SAMPLE_TARGET_ROLES,
  aiSuggestions: SAMPLE_AI_SUGGESTIONS,
  portfolioConfig: DEFAULT_PORTFOLIO_CONFIG,
  recruiterViewActive: false,
  selectedNodeId: null,
  selectedDocId: null,
  activeTimelineSkillFilter: null,
  highlightedNodeIds: [],
  isParsingDocument: false,
  parsingProgress: 0,
  recentExtractedTags: [],
  chatMessages: [
    {
      id: 'chat-init-1',
      sender: 'ai',
      text: 'Hello Rishi! I have extracted and sanitized your career artifacts into your Knowledge Graph. All PDF metadata junk objects (/Catalog, /Pages, /Kids) have been discarded. Ask me anything about HDRS, EvalSync, LeafSense AI, CampusOS, or your verified TrOCR & FastAPI expertise.',
      timestamp: 'Just now',
      citations: [
        {
          documentId: 'doc-1',
          documentTitle: 'Rishi_Sharma_Resume_2026.pdf',
          category: 'Resume',
          excerpt: 'Full-Stack AI Engineer at Satyug Darshan Institute. Projects: HDRS, EvalSync, LeafSense AI, CampusOS. Skills: Python, React, FastAPI, Docker, TrOCR, OpenCV.'
        },
        {
          documentId: 'doc-4',
          documentTitle: 'HDRS_High_Accuracy_Document_Recognition_Report.pdf',
          category: 'Project Report',
          excerpt: 'HDRS powered by Microsoft TrOCR, OpenCV, FastAPI, and React.'
        }
      ],
      suggestedFollowups: [
        'What technologies were used in HDRS?',
        'Which certificates verify my cloud skills?',
        'Show LeafSense AI and EvalSync details',
        'Generate interview answer for HDRS TrOCR project'
      ]
    }
  ],

  setPersona: (persona) => set({ currentPersona: persona }),

  toggleRecruiterView: () => set((state) => ({ recruiterViewActive: !state.recruiterViewActive })),

  loadSampleData: () => set({
    artifacts: SAMPLE_ARTIFACTS,
    nodes: SAMPLE_NODES,
    milestones: SAMPLE_MILESTONES,
    skillGaps: SAMPLE_SKILL_GAPS,
    targetRoles: SAMPLE_TARGET_ROLES,
    aiSuggestions: SAMPLE_AI_SUGGESTIONS,
    portfolioConfig: DEFAULT_PORTFOLIO_CONFIG,
    activeTimelineSkillFilter: null,
    highlightedNodeIds: []
  }),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  selectDoc: (docId) => set({ selectedDocId: docId }),

  selectDocAndHighlightGraph: (docId) => {
    const { nodes } = get();
    const relatedNodeIds = (nodes || []).filter(n => (n.documentRefIds || []).includes(docId)).map(n => n.id);
    set({ selectedDocId: docId, highlightedNodeIds: relatedNodeIds });
  },

  filterTimelineByNode: (nodeId, skillLabel) => {
    set({ activeTimelineSkillFilter: skillLabel, selectedNodeId: nodeId });
  },

  clearTimelineFilter: () => set({ activeTimelineSkillFilter: null }),

  uploadDocumentSimulated: async (file: File, customSkills?: string[], rawText?: string) => {
    set({ isParsingDocument: true, parsingProgress: 10, recentExtractedTags: [] });

    await new Promise((r) => setTimeout(r, 400));

    const cleanText = sanitizePDFText(rawText || '');

    let extractedSkills: string[] = [];
    if (customSkills && customSkills.length > 0) {
      extractedSkills = customSkills;
    } else {
      const extracted = extractEntitiesFromText(cleanText, file.name);
      extractedSkills = extracted.skills.map(s => s.name);
    }

    set({ parsingProgress: 60, recentExtractedTags: extractedSkills });

    await new Promise((r) => setTimeout(r, 400));

    const newDocId = `doc-${Date.now()}`;
    const newArtifact: Artifact = {
      id: newDocId,
      title: file.name,
      category: file.name.toLowerCase().includes('cert') ? 'Certificate' : file.name.toLowerCase().includes('offer') ? 'Offer Letter' : 'Project Report',
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      confidenceScore: Math.floor(Math.random() * 4) + 96,
      parsedText: cleanText || `Verified career competencies from ${file.name}: ${extractedSkills.join(', ')}.`,
      entityTags: {
        skills: extractedSkills,
        projects: [file.name.replace(/\.[^/.]+$/, '')],
        roles: ['Contributor'],
        tools: ['AI Entity Cleaner Engine']
      },
      verified: true,
      issuer: 'AI Entity Cleaner Engine'
    };

    // Safe Deduplication check: update existing nodes without crashing on null arrays
    const currentNodes = Array.isArray(get().nodes) ? get().nodes : SAMPLE_NODES;
    const updatedNodes = currentNodes.map(n => {
      const existingDocIds = Array.isArray(n.documentRefIds) ? n.documentRefIds : [];
      if (extractedSkills.some(s => s.toLowerCase() === (n.label || '').toLowerCase())) {
        return {
          ...n,
          documentRefIds: Array.from(new Set([...existingDocIds, newDocId]))
        };
      }
      return n;
    });

    // Only create a new node if the skill doesn't exist anywhere in the graph
    const brandNewSkills = extractedSkills.filter(
      s => !currentNodes.some(n => (n.label || '').toLowerCase() === s.toLowerCase())
    );

    const brandNewNodes: GraphNode[] = brandNewSkills.map((skill, index) => ({
      id: `node-${Date.now()}-${index}`,
      label: skill,
      type: 'skill',
      importance: 'medium',
      level: 'Advanced',
      proficiencyScore: 90,
      year: '2026',
      x: 350 + ((index % 3) * 140),
      y: 450 + (Math.floor(index / 3) * 80),
      connections: [{ targetId: 'node-root-user', relationship: 'implements' }],
      documentRefIds: [newDocId],
      description: `Skill "${skill}" extracted directly from ${file.name}.`
    }));

    const newMilestone: Milestone = {
      id: `ms-${Date.now()}`,
      title: `Uploaded & Verified ${file.name}`,
      organization: 'Verified Artifact Repository',
      date: 'Today',
      year: 2026,
      category: 'project',
      description: `Extracted ${extractedSkills.length} exact career competency keywords (${extractedSkills.join(', ')}) from ${file.name}.`,
      skillsUsed: extractedSkills,
      impactMetric: '100% Whitelisted Career Entities',
      verifiedDocId: newDocId,
      verifiedDocTitle: file.name
    };

    set((state) => ({
      artifacts: [newArtifact, ...(state.artifacts || [])],
      nodes: [...updatedNodes, ...brandNewNodes],
      milestones: [newMilestone, ...(state.milestones || [])],
      isParsingDocument: false,
      parsingProgress: 100,
      highlightedNodeIds: brandNewNodes.map(n => n.id)
    }));
  },

  deleteArtifact: (docId) => set((state) => ({
    artifacts: (state.artifacts || []).filter((a) => a.id !== docId),
    nodes: (state.nodes || []).filter((n) => !(n.documentRefIds || []).includes(docId)),
    milestones: (state.milestones || []).filter((m) => m.verifiedDocId !== docId)
  })),

  sendChatMessage: (query: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => ({ chatMessages: [...(state.chatMessages || []), userMsg] }));

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let responseText = '';
      let citations = [];
      let followups = [];

      if (qLower.includes('hdrs') || qLower.includes('trocr') || qLower.includes('ocr')) {
        responseText = 'HDRS (High-accuracy Document Recognition System) is your flagship project. It is built with Microsoft TrOCR, OpenCV image preprocessing, FastAPI async endpoints, and React. It achieves 99.4% extraction precision.';
        citations = [
          {
            documentId: 'doc-4',
            documentTitle: 'HDRS_High_Accuracy_Document_Recognition_Report.pdf',
            category: 'Project Report' as const,
            excerpt: 'HDRS powered by TrOCR, OpenCV, FastAPI, and React.'
          }
        ];
        followups = ['Highlight TrOCR on Resume', 'Show HDRS graph nodes', 'Filter timeline for HDRS'];
      } else if (qLower.includes('project') || qLower.includes('leafsense') || qLower.includes('evalsync') || qLower.includes('campusos')) {
        responseText = 'Your portfolio includes 4 primary verified projects:\n\n1. HDRS: High-accuracy Document Recognition System (TrOCR + OpenCV + FastAPI)\n2. EvalSync: Automated evaluation and grading platform\n3. LeafSense AI: Computer vision agricultural crop disease classifier\n4. CampusOS: Smart campus management portal';
        citations = [
          {
            documentId: 'doc-1',
            documentTitle: 'Rishi_Sharma_Resume_2026.pdf',
            category: 'Resume' as const,
            excerpt: 'Projects: HDRS, EvalSync, LeafSense AI, CampusOS.'
          }
        ];
        followups = ['Show tech stack for HDRS', 'Filter timeline for Projects'];
      } else if (qLower.includes('aws') || qLower.includes('cloud')) {
        responseText = 'Your AWS cloud credentials are formally verified by Amazon Web Services. You achieved an 890/1000 score on the AWS Certified Cloud Practitioner exam in March 2026.';
        citations = [
          {
            documentId: 'doc-2',
            documentTitle: 'AWS Certified Cloud Practitioner Certificate.pdf',
            category: 'Certificate' as const,
            excerpt: 'Score 890/1000. Validated skills: EC2, S3, IAM, Cloud Security.'
          }
        ];
        followups = ['Show AWS Knowledge Graph nodes', 'Check Cloud Architect match'];
      } else {
        responseText = `Analyzing your Knowledge Graph for "${query}"... Your graph contains 6 clean career skills and 4 verified document proofs. PDF metadata objects (/Catalog, /Pages, /Kids) have been discarded.`;
        citations = [
          {
            documentId: 'doc-1',
            documentTitle: 'Rishi_Sharma_Resume_2026.pdf',
            category: 'Resume' as const,
            excerpt: 'Verified full-stack AI skills: Python, React, FastAPI, Docker, TrOCR, OpenCV.'
          }
        ];
        followups = ['Show related projects', 'Show certificates', 'Generate interview answer'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
        suggestedFollowups: followups
      };

      set((state) => ({ chatMessages: [...(state.chatMessages || []), aiMsg] }));
    }, 400);
  },

  updatePortfolioConfig: (config) => set((state) => ({
    portfolioConfig: { ...state.portfolioConfig, ...config }
  }))
}));
