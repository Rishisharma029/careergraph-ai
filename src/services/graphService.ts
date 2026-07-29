import { GraphNode } from '../types';

export interface Teammate {
  id: string;
  name: string;
  role: string;
  avatar: string;
  sharedProjects: string[];
  sharedSkills: string[];
  sharedCertifications: string[];
}

export const graphService = {
  // Returns collaborative team members for a given project
  getTeammatesForProject: (projectLabel: string): Teammate[] => {
    return [
      {
        id: 'user-aarav',
        name: 'Aarav Sharma',
        role: 'Frontend & UI Architect',
        avatar: 'AS',
        sharedProjects: ['HDRS', 'EvalSync'],
        sharedSkills: ['React', 'TypeScript', 'Tailwind CSS'],
        sharedCertifications: ['AWS Certified Cloud Practitioner']
      },
      {
        id: 'user-priya',
        name: 'Priya Patel',
        role: 'Computer Vision Researcher',
        avatar: 'PP',
        sharedProjects: ['HDRS', 'LeafSense AI'],
        sharedSkills: ['Python', 'OpenCV', 'PyTorch', 'TrOCR'],
        sharedCertifications: ['Deep Learning Specialization']
      }
    ];
  },

  // Generates Cypher Query String for Neo4j Visualization
  generateCypherForNode: (nodeLabel: string): string => {
    return `MATCH (p:Person {name: "Rishi Sharma"})-[:WORKED_ON]->(prj:Project {name: "${nodeLabel}"})-[:USES_SKILL]->(s:Skill) RETURN p, prj, s LIMIT 25;`;
  }
};
