'use client'

import { useState, useRef } from 'react'
import { registerProvider, uploadKycDocument } from '../lib/api'

const VEHICLE_OPTIONS = [
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'tricycle', label: 'Tricycle (Keke)' },
  { value: 'van', label: 'Van' },
  { value: 'truck', label: 'Truck' },
  { value: 'refrigerated_van', label: 'Refrigerated Van' },
]

type Step = 'form' | 'kyc' | 'success'

export function ProviderRegistrationForm() {
  const [step, setStep] = useState<Step>('form')
  const [providerId, setProviderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [kycFiles, setKycFiles] = useState<File[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle_types: [] as string[],
    bank_account_number: '',
    bank_code: '',
    cold_chain_certified: false,
  })

  function toggleVehicle(v: string) {
    setForm(f => ({
      ...f,
      vehicle_types: f.vehicle_types.includes(v)
        ? f.vehicle_types.filter(x => x !== v)
        : [...f.vehicle_types, v],
    }))
  }

  async function handleRegistration(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.vehicle_types.length === 0) {
      setError('Select at least one vehicle type.')
      return
    }
    setLoading(true)
    try {
      const result = await registerProvider({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        vehicle_types: form.vehicle_types,
        bank_account_number: form.bank_account_number || undefined,
        bank_code: form.bank_code || undefined,
      })
      if (result.error) throw new Error(result.error.message)
      setProviderId(result.provider_id)
      setStep('kyc')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleKycUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!providerId) return
    setLoading(true)
    setError(null)
    try {
      await Promise.all(kycFiles.map(f => uploadKycDocument(providerId, f)))
      setStep('success')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>Application Submitted</h2>
        <p style={styles.subtext}>
          Your application is under review. Our ops team will verify your documents
          and notify you via SMS within 24–48 hours.
        </p>
        <p style={{ ...styles.subtext, fontWeight: 600 }}>Provider ID: {providerId}</p>
      </div>
    )
  }

  if (step === 'kyc') {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>Upload KYC Documents</h2>
        <p style={styles.subtext}>
          Upload your ID, driver's licence, and vehicle papers (PDF or image).
        </p>
        <form onSubmit={handleKycUpload} style={styles.form}>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={e => setKycFiles(Array.from(e.target.files ?? []))}
            style={styles.fileInput}
          />
          {kycFiles.length > 0 && (
            <ul style={styles.fileList}>
              {kycFiles.map(f => <li key={f.name}>{f.name}</li>)}
            </ul>
          )}
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.row}>
            <button type="button" onClick={() => setStep('success')} style={styles.secondaryBtn}>
              Skip for now
            </button>
            <button type="submit" disabled={loading || kycFiles.length === 0} style={styles.primaryBtn}>
              {loading ? 'Uploading…' : 'Upload & Submit'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Join AgriLink Logistics</h2>
      <p style={styles.subtext}>Register as a delivery provider and start earning.</p>
      <form onSubmit={handleRegistration} style={styles.form}>
        <label style={styles.label}>Full Name *</label>
        <input style={styles.input} required value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

        <label style={styles.label}>Phone Number *</label>
        <input style={styles.input} required type="tel" placeholder="+234..."
          value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />

        <label style={styles.label}>Email (optional)</label>
        <input style={styles.input} type="email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

        <label style={styles.label}>Vehicle Types *</label>
        <div style={styles.checkGroup}>
          {VEHICLE_OPTIONS.map(opt => (
            <label key={opt.value} style={styles.checkLabel}>
              <input type="checkbox" checked={form.vehicle_types.includes(opt.value)}
                onChange={() => toggleVehicle(opt.value)} />
              {opt.label}
            </label>
          ))}
        </div>

        <label style={styles.label}>Bank Account Number</label>
        <input style={styles.input} value={form.bank_account_number}
          onChange={e => setForm(f => ({ ...f, bank_account_number: e.target.value }))} />

        <label style={styles.label}>Bank Code (e.g. 058 for GTB)</label>
        <input style={styles.input} value={form.bank_code} maxLength={3}
          onChange={e => setForm(f => ({ ...f, bank_code: e.target.value }))} />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={{ ...styles.primaryBtn, width: '100%' }}>
          {loading ? 'Submitting…' : 'Register as Provider'}
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: { maxWidth: 480, margin: '40px auto', padding: 32, border: '1px solid #e5e7eb', borderRadius: 12, fontFamily: 'sans-serif' },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 6, color: '#111827' },
  subtext: { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: { padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none' },
  checkGroup: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' },
  fileInput: { border: '1px dashed #d1d5db', padding: 12, borderRadius: 8, cursor: 'pointer' },
  fileList: { fontSize: 13, color: '#374151', paddingLeft: 16 },
  error: { color: '#dc2626', fontSize: 13 },
  row: { display: 'flex', gap: 12, justifyContent: 'flex-end' },
  primaryBtn: { padding: '10px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  secondaryBtn: { padding: '10px 20px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, cursor: 'pointer' },
}
