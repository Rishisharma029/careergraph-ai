import { create } from 'zustand';

export interface UserSession {
  userId: string;
  fullName: string;
  email: string;
  persona: 'student' | 'jobseeker' | 'recruiter';
  workspaceSlug: string;
  avatar: string;
}

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, fullName?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    userId: 'user-rishi-001',
    fullName: 'Rishi Sharma',
    email: 'rishi.sharma@careergraph.ai',
    persona: 'student',
    workspaceSlug: 'rishisharma',
    avatar: 'RS'
  },
  isAuthenticated: true,

  login: (email, fullName) => set({
    isAuthenticated: true,
    user: {
      userId: `user-${Date.now()}`,
      fullName: fullName || 'Rishi Sharma',
      email,
      persona: 'student',
      workspaceSlug: (fullName || 'rishi').toLowerCase().replace(/\s+/g, ''),
      avatar: (fullName || 'Rishi Sharma').split(' ').map(n => n[0]).join('')
    }
  }),

  logout: () => set({ isAuthenticated: false, user: null })
}));
