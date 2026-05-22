import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { withMetrics } from '../_shared/metrics.ts'

interface HookEvent {
  user_id: string
  claims: Record<string, unknown>
}

Deno.serve(withMetrics('auth-hook', async (req: Request) => {
  const event: HookEvent = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  const { data: user, error } = await supabase.auth.admin.getUserById(event.user_id)

  if (error || !user?.user) {
    return new Response(JSON.stringify(event), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const meta = user.user.app_metadata ?? {}
  const claims = {
    ...event.claims,
    app_metadata: {
      ...(event.claims.app_metadata as Record<string, unknown> ?? {}),
      role: meta.role ?? null,
      ...(meta.client_id   ? { client_id:   meta.client_id }   : {}),
      ...(meta.provider_id ? { provider_id: meta.provider_id } : {}),
    },
  }

  return new Response(
    JSON.stringify({ ...event, claims }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}))
