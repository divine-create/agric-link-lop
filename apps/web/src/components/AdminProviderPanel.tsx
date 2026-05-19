'use client'

import { useState, useEffect, useCallback } from 'react'
import { listPendingProviders, verifyProvider } from '../lib/api'
import { supabase } from '../lib/supabase'

type Provider = {
  id: string
  name: string
  phone: string
  email?: string
  vehicle_types: string[]
  status: string
  reliability_score: number
  created_at: string
}

export function AdminProviderPanel() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({})
  const [authed, setAuthed] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await listPendingProviders()
    setProviders(data.providers ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const role = data.session?.user?.app_metadata?.role
      setAuthed(role === 'admin')
      if (role === 'admin') load()
    })
  }, [load])

  async function approve(id: string) {
    setActionId(id)
    await verifyProvider(id, true)
    await load()
    setActionId(null)
  }

  async function reject(id: string) {
    setActionId(id)
    await verifyProvider(id, false, rejectReason[id] || 'Application did not meet requirements')
    await load()
    setActionId(null)
  }

  if (!authed) {
    return (
      <div style={styles.card}>
        <p style={styles.warn}>Admin access required. Sign in with an admin account.</p>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Pending Provider Applications</h2>
      {loading ? (
        <p style={styles.muted}>Loading…</p>
      ) : providers.length === 0 ? (
        <p style={styles.muted}>No pending applications.</p>
      ) : (
        <div style={styles.list}>
          {providers.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <strong style={styles.name}>{p.name}</strong>
                  <span style={styles.badge}>{p.status.replace('_', ' ')}</span>
                </div>
                <span style={styles.date}>{new Date(p.created_at).toLocaleDateString()}</span>
              </div>
              <div style={styles.details}>
                <span>📞 {p.phone}</span>
                {p.email && <span>✉️ {p.email}</span>}
                <span>🚗 {p.vehicle_types.join(', ')}</span>
              </div>
              <div style={styles.kycNote}>
                KYC docs →{' '}
                <a
                  href={`https://supabase.com/dashboard/project/xvhxepnqqvhqnbwlbxfi/storage/buckets/provider-docs`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  provider-docs/{p.id}/
                </a>
              </div>
              <textarea
                style={styles.textarea}
                placeholder="Rejection reason (if rejecting)…"
                value={rejectReason[p.id] ?? ''}
                onChange={e => setRejectReason(r => ({ ...r, [p.id]: e.target.value }))}
              />
              <div style={styles.actions}>
                <button
                  style={styles.rejectBtn}
                  disabled={actionId === p.id}
                  onClick={() => reject(p.id)}
                >
                  {actionId === p.id ? '…' : 'Reject'}
                </button>
                <button
                  style={styles.approveBtn}
                  disabled={actionId === p.id}
                  onClick={() => approve(p.id)}
                >
                  {actionId === p.id ? '…' : 'Approve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { maxWidth: 720, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#111827' },
  list: { display: 'flex', flexDirection: 'column', gap: 16 },
  card: { border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, background: '#fff' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 700, color: '#111827', marginRight: 10 },
  badge: { fontSize: 11, padding: '2px 8px', background: '#fef3c7', color: '#92400e', borderRadius: 100, textTransform: 'capitalize' },
  date: { fontSize: 12, color: '#9ca3af' },
  details: { display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#374151', marginBottom: 10 },
  kycNote: { fontSize: 12, color: '#6b7280', marginBottom: 10 },
  link: { color: '#2563eb' },
  textarea: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, resize: 'vertical', minHeight: 56, boxSizing: 'border-box' },
  actions: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 },
  approveBtn: { padding: '8px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  rejectBtn: { padding: '8px 18px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  muted: { color: '#6b7280', fontSize: 14 },
  warn: { color: '#dc2626', fontSize: 14 },
}
