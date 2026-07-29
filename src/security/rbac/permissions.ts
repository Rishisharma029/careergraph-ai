/**
 * RBAC Permission Matrix
 * Principle of Least Privilege — each role has only what it needs.
 * Modelled after real-world IAM systems (AWS IAM, GitHub Teams, Stripe RBAC).
 */

export type Role = 'admin' | 'recruiter' | 'candidate' | 'guest';

export type Permission =
  | 'read:graph'
  | 'write:graph'
  | 'delete:graph'
  | 'read:documents'
  | 'write:documents'
  | 'delete:documents'
  | 'read:candidates'
  | 'shortlist:candidates'
  | 'export:resume'
  | 'export:report'
  | 'view:audit_logs'
  | 'manage:users'
  | 'manage:sessions'
  | 'read:analytics'
  | 'view:security_center'
  | 'manage:mfa'
  | 'read:ai_search'
  | 'read:demo';

export const PERMISSION_MATRIX: Record<Role, Permission[]> = {
  admin: [
    'read:graph', 'write:graph', 'delete:graph',
    'read:documents', 'write:documents', 'delete:documents',
    'read:candidates', 'shortlist:candidates',
    'export:resume', 'export:report',
    'view:audit_logs', 'manage:users', 'manage:sessions',
    'read:analytics', 'view:security_center', 'manage:mfa',
    'read:ai_search',
  ],
  recruiter: [
    'read:graph', 'read:documents',
    'read:candidates', 'shortlist:candidates',
    'export:report', 'read:analytics',
  ],
  candidate: [
    'read:graph', 'write:graph',
    'read:documents', 'write:documents',
    'export:resume', 'read:analytics',
    'manage:mfa', 'manage:sessions',
    'read:ai_search', 'view:security_center',
  ],
  guest: [
    'read:demo',
  ],
};

/**
 * Check whether a role has a given permission.
 * Use this for runtime permission checks — never trust client-side alone;
 * mirror this matrix on the backend FastAPI middleware.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSION_MATRIX[role]?.includes(permission) ?? false;
}
