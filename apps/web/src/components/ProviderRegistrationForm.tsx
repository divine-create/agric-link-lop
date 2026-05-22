'use client'

import { useState } from 'react'
import { registerProvider, uploadKycDocument } from '../lib/api'

const VEHICLE_OPTIONS = [
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'tricycle', label: 'Tricycle (Keke)' },
  { value: 'van', label: 'Van' },
  { value: 'truck', label: 'Truck' },
  { value: 'refrigerated_van', label: 'Refrigerated Van' },
]

const STEPS = ['Personal Info', 'Vehicle Info', 'Coverage Zone', 'Documents'] as const
type Step = 0 | 1 | 2 | 3 | 'success'

export function ProviderRegistrationForm() {
  const [step, setStep] = useState<Step>(0)
  const [providerId, setProviderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [kycFiles, setKycFiles] = useState<File[]>([])

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    vehicle_types: [] as string[],
    cold_chain_certified: false,
    bank_account_number: '', bank_code: '',
    coverage_description: '',
  })

  function toggleVehicle(v: string) {
    setForm(f => ({
      ...f,
      vehicle_types: f.vehicle_types.includes(v)
        ? f.vehicle_types.filter(x => x !== v)
        : [...f.vehicle_types, v],
    }))
  }

  async function submitRegistration() {
    setFormError(null)
    setLoading(true)
    try {
      const coverageZones = form.coverage_description
        ? { description: form.coverage_description }
        : undefined
      const result = await registerProvider({
        name: form.name, phone: form.phone,
        email: form.email || undefined,
        vehicle_types: form.vehicle_types,
        cold_chain_certified: form.cold_chain_certified,
        bank_account_number: form.bank_account_number || undefined,
        bank_code: form.bank_code || undefined,
        coverage_zones: coverageZones,
      })
      if (result.error) throw new Error(result.error.message)
      setProviderId(result.provider_id)
      setStep(3)
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleKycUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!providerId) return
    setLoading(true)
    setFormError(null)
    try {
      await Promise.all(kycFiles.map(f => uploadKycDocument(providerId, f)))
      setStep('success')
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div style={s.card}>
        <div style={s.successIcon}>✓</div>
        <h2 style={s.heading}>Application Submitted</h2>
        <p style={s.subtext}>
          Your application is under review. Our team will verify your documents
          and notify you via SMS within 24–48 hours.
        </p>
        <p style={{ fontSize: 12, color: '#9ca3af' }}>Reference: <code>{providerId}</code></p>
      </div>
    )
  }

  return (
    <div style={s.card}>
      {/* Progress indicator */}
      <div style={s.stepper}>
        {STEPS.map((label, i) => (
          <div key={label} style={s.stepItem}>
            <div style={{
              ...s.stepDot,
              background: i <= (step as number) ? '#16a34a' : '#e5e7eb',
              color: i <= (step as number) ? '#fff' : '#9ca3af',
            }}>
              {i < (step as number) ? '✓' : i + 1}
            </div>
            <span style={{ ...s.stepLabel, color: i === step ? '#111827' : '#9ca3af' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step 0: Personal Info */}
      {step === 0 && (
        <form style={s.form} onSubmit={e => { e.preventDefault(); setStep(1) }}>
          <h2 style={s.heading}>Personal Information</h2>
          <label style={s.label}>Full Name *</label>
          <input style={s.input} required value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <label style={s.label}>Phone Number *</label>
          <input style={s.input} required type="tel" placeholder="+234..."
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <label style={s.label}>Email (optional)</label>
          <input style={s.input} type="email" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <button type="submit" style={s.primaryBtn}>Next →</button>
        </form>
      )}

      {/* Step 1: Vehicle Info */}
      {step === 1 && (
        <form style={s.form} onSubmit={e => {
          e.preventDefault()
          if (!form.vehicle_types.length) { setFormError('Select at least one vehicle type.'); return }
          setFormError(null); setStep(2)
        }}>
          <h2 style={s.heading}>Vehicle Information</h2>
          <label style={s.label}>Vehicle Types *</label>
          <div style={s.checkGroup}>
            {VEHICLE_OPTIONS.map(opt => (
              <label key={opt.value} style={s.checkLabel}>
                <input type="checkbox" checked={form.vehicle_types.includes(opt.value)}
                  onChange={() => toggleVehicle(opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>
          <label style={{ ...s.checkLabel, marginTop: 8 }}>
            <input type="checkbox" checked={form.cold_chain_certified}
              onChange={e => setForm(f => ({ ...f, cold_chain_certified: e.target.checked }))} />
            Cold Chain Certified (refrigerated transport)
          </label>
          <label style={s.label}>Bank Account Number</label>
          <input style={s.input} value={form.bank_account_number}
            onChange={e => setForm(f => ({ ...f, bank_account_number: e.target.value }))} />
          <label style={s.label}>Bank Code (e.g. 058 for GTB)</label>
          <input style={s.input} value={form.bank_code} maxLength={3}
            onChange={e => setForm(f => ({ ...f, bank_code: e.target.value }))} />
          {formError && <p style={s.error}>{formError}</p>}
          <div style={s.row}>
            <button type="button" onClick={() => setStep(0)} style={s.secondaryBtn}>← Back</button>
            <button type="submit" style={s.primaryBtn}>Next →</button>
          </div>
        </form>
      )}

      {/* Step 2: Coverage Zone */}
      {step === 2 && (
        <form style={s.form} onSubmit={e => { e.preventDefault(); submitRegistration() }}>
          <h2 style={s.heading}>Coverage Zone</h2>
          <p style={s.subtext}>Describe the areas you can cover for deliveries.</p>
          <label style={s.label}>Coverage Area *</label>
          <textarea
            style={{ ...s.input, minHeight: 100, resize: 'vertical' }}
            required
            placeholder="e.g. Lagos Island, Victoria Island, Ikoyi — within 20km of Lagos CBD"
            value={form.coverage_description}
            onChange={e => setForm(f => ({ ...f, coverage_description: e.target.value }))}
          />
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: -4 }}>
            List the neighbourhoods, cities, or regions you serve.
          </p>
          {formError && <p style={s.error}>{formError}</p>}
          <div style={s.row}>
            <button type="button" onClick={() => setStep(1)} style={s.secondaryBtn}>← Back</button>
            <button type="submit" disabled={loading} style={s.primaryBtn}>
              {loading ? 'Submitting…' : 'Submit →'}
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Documents */}
      {step === 3 && (
        <form onSubmit={handleKycUpload} style={s.form}>
          <h2 style={s.heading}>Upload Documents</h2>
          <p style={s.subtext}>
            Upload your government ID and vehicle registration (PDF or image).
          </p>
          <input
            type="file" multiple accept=".pdf,.jpg,.jpeg,.png"
            onChange={e => setKycFiles(Array.from(e.target.files ?? []))}
            style={s.fileInput}
          />
          {kycFiles.length > 0 && (
            <ul style={s.fileList}>
              {kycFiles.map(f => <li key={f.name}>{f.name}</li>)}
            </ul>
          )}
          {formError && <p style={s.error}>{formError}</p>}
          <div style={s.row}>
            <button type="button" onClick={() => setStep('success')} style={s.secondaryBtn}>
              Skip for now
            </button>
            <button type="submit" disabled={loading || kycFiles.length === 0} style={s.primaryBtn}>
              {loading ? 'Uploading…' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  card: { maxWidth: 520, margin: '40px auto', padding: 32, border: '1px solid #e5e7eb', borderRadius: 12, fontFamily: 'sans-serif', background: '#fff' },
  successIcon: { width: 56, height: 56, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#16a34a', margin: '0 auto 16px' },
  stepper: { display: 'flex', justifyContent: 'space-between', marginBottom: 28 },
  stepItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 },
  stepDot: { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 },
  stepLabel: { fontSize: 10, textAlign: 'center', fontWeight: 500 },
  heading: { fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#111827' },
  subtext: { fontSize: 13, color: '#6b7280', marginBottom: 12 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: { padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' },
  checkGroup: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' },
  fileInput: { border: '1px dashed #d1d5db', padding: 12, borderRadius: 8, cursor: 'pointer' },
  fileList: { fontSize: 13, color: '#374151', paddingLeft: 20, margin: '4px 0' },
  error: { color: '#dc2626', fontSize: 13, margin: 0 },
  row: { display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 4 },
  primaryBtn: { padding: '10px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', flex: 1 },
  secondaryBtn: { padding: '10px 20px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, cursor: 'pointer' },
}
