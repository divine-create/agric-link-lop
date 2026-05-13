import { supabase, FUNCTIONS_URL } from './supabase'

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function registerProvider(payload: {
  name: string
  phone: string
  email?: string
  vehicle_types: string[]
  bank_account_number?: string
  bank_code?: string
}) {
  const res = await fetch(`${FUNCTIONS_URL}/providers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function uploadKycDocument(providerId: string, file: File) {
  const path = `${providerId}/${file.name}`
  const { error } = await supabase.storage
    .from('provider-docs')
    .upload(path, file, { upsert: true })
  if (error) throw error
  return path
}

export async function listPendingProviders() {
  const headers = await authHeaders()
  const res = await fetch(`${FUNCTIONS_URL}/providers?status=pending_review`, {
    headers,
  })
  return res.json()
}

export async function verifyProvider(
  providerId: string,
  approved: boolean,
  reason?: string,
) {
  const headers = await authHeaders()
  const res = await fetch(`${FUNCTIONS_URL}/providers/${providerId}/verify`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ approved, reason }),
  })
  return res.json()
}
