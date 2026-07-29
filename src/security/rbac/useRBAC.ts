import { hasPermission, Permission } from './permissions';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * RBAC hook — use this to gate UI elements and actions.
 *
 * Usage:
 *   const { can } = useRBAC();
 *   if (!can('view:audit_logs')) return <AccessDenied />;
 */
export function useRBAC() {
  const { user } = useAuthStore();
  const role = user?.persona ?? 'guest';

  // Map persona → Role
  const resolvedRole = (() => {
    if (role === 'recruiter') return 'recruiter' as const;
    if (role === 'student' || role === 'jobseeker') return 'candidate' as const;
    return 'candidate' as const;
  })();

  return {
    role: resolvedRole,
    can: (permission: Permission) => hasPermission(resolvedRole, permission),
    canAll: (permissions: Permission[]) => permissions.every(p => hasPermission(resolvedRole, p)),
    canAny: (permissions: Permission[]) => permissions.some(p => hasPermission(resolvedRole, p)),
  };
}
