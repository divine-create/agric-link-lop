import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

export function adminClient() {
  return createClient(SUPABASE_URL, SERVICE_ROLE);
}

export interface AuthContext {
  role: 'client' | 'provider' | 'admin';
  clientId?: string;
  providerId?: string;
}

/**
 * Verify Bearer JWT and extract role claims.
 * Returns null if token is missing or invalid.
 */
export async function verifyJwt(req: Request): Promise<AuthContext | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const meta = user.user_metadata;
  return {
    role: meta.role ?? 'client',
    clientId: meta.client_id,
    providerId: meta.provider_id,
  };
}

/**
 * Verify incoming X-API-Key for external clients (AgriLink integration).
 * Checks the hashed key against the clients table.
 */
export async function verifyApiKey(req: Request): Promise<{ clientId: string } | null> {
  const apiKey = req.headers.get('X-API-Key');
  if (!apiKey) return null;

  const { createHash } = await import('node:crypto');
  const hash = createHash('sha256').update(apiKey).digest('hex');

  const db = adminClient();
  const { data } = await db
    .from('clients')
    .select('id')
    .eq('api_key_hash', hash)
    .eq('is_active', true)
    .single();

  return data ? { clientId: data.id } : null;
}
