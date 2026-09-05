import { isSupabaseConfigured } from '../supabase/config';

export type ElevaAuthenticatedUser = {
  id: string;
  email?: string;
};

export type ElevaAccessState =
  | { kind: 'preview'; reason: 'supabase_not_configured' }
  | { kind: 'unauthenticated' }
  | { kind: 'pending_purchase' }
  | { kind: 'active' }
  | { kind: 'suspended' };

export function resolveElevaAccess(user?: ElevaAuthenticatedUser): ElevaAccessState {
  if (!isSupabaseConfigured()) {
    return { kind: 'preview', reason: 'supabase_not_configured' };
  }

  if (!user || !user.id) {
    return { kind: 'unauthenticated' };
  }

  // A consulta de entitlement será conectada ao fulfillment comercial em uma fase posterior.
  // Enquanto isso, o produto permanece visível como preparação, sem simular uma compra.
  return { kind: 'pending_purchase' };
}
