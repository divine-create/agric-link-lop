'use client';
// ALS-221: Self-service business client registration — generates API key shown once

import { useState } from 'react';
import { FUNCTIONS_URL } from '../../../lib/supabase';

type Tier = 'starter' | 'growth' | 'enterprise';

const TIERS: { id: Tier; label: string; rpm: number; daily: number; price: string }[] = [
  { id: 'starter',    label: 'Starter',    rpm: 30,  daily: 500,   price: '₦25,000/mo' },
  { id: 'growth',     label: 'Growth',     rpm: 150, daily: 5000,  price: '₦85,000/mo' },
  { id: 'enterprise', label: 'Enterprise', rpm: 0,   daily: 0,     price: 'Custom' },
];

export default function BusinessRegistrationPage() {
  const [form, setForm] = useState({ company_name: '', email: '', use_case: '', tier: 'starter' as Tier });
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    const res = await fetch(`${FUNCTIONS_URL}/external-api/v1/clients/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErr(data.message ?? 'Registration failed — try again');
      return;
    }

    setApiKey(data.api_key);
  }

  async function copyKey() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (apiKey) {
    return (
      <main style={{ maxWidth: 540, margin: '60px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#15803d', margin: '0 0 8px' }}>Registration complete</h2>
          <p style={{ color: '#166534', margin: '0 0 20px' }}>
            Your API key is shown below. <strong>Copy it now — it will not be shown again.</strong>
          </p>

          <div style={{
            background: '#1e293b', color: '#a7f3d0', fontFamily: 'monospace', fontSize: 13,
            padding: '12px 16px', borderRadius: 8, wordBreak: 'break-all', marginBottom: 12,
          }}>
            {apiKey}
          </div>

          <button
            onClick={copyKey}
            style={{
              padding: '10px 20px', background: copied ? '#16a34a' : '#1e293b', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
            }}
          >
            {copied ? 'Copied!' : 'Copy API Key'}
          </button>

          <div style={{ marginTop: 24, padding: 16, background: '#fff', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14 }}>Quick start</h3>
            <pre style={{ fontSize: 12, color: '#374151', margin: 0, whiteSpace: 'pre-wrap' }}>{`curl -X POST https://xvhxepnqqvhqnbwlbxfi.supabase.co/functions/v1/external-api/v1/deliveries \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"pickup":{"address":"Lagos","latitude":6.5,"longitude":3.3},"dropoff":{"address":"Ibadan","latitude":7.4,"longitude":3.9}}'`}</pre>
          </div>
        </div>
      </main>
    );
  }

  const inp = (name: string, placeholder: string, type = 'text') => (
    <input
      type={type}
      placeholder={placeholder}
      value={(form as any)[name]}
      onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
      required={name !== 'use_case'}
      style={{
        width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d1d5db',
        borderRadius: 8, boxSizing: 'border-box' as const, marginBottom: 16,
      }}
    />
  );

  return (
    <main style={{ maxWidth: 540, margin: '60px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Get API Access</h1>
      <p style={{ color: '#6b7280', margin: '0 0 28px' }}>
        Connect AgriLink Logistics to your platform in minutes.
      </p>

      <form onSubmit={submit}>
        {inp('company_name', 'Company name')}
        {inp('email', 'Work email', 'email')}
        {inp('use_case', 'What will you use it for? (optional)')}

        {/* Tier selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {TIERS.map((t) => (
            <div
              key={t.id}
              onClick={() => setForm((f) => ({ ...f, tier: t.id }))}
              style={{
                padding: '12px', border: `2px solid ${form.tier === t.id ? '#16a34a' : '#e5e7eb'}`,
                borderRadius: 8, cursor: 'pointer', textAlign: 'center' as const,
                background: form.tier === t.id ? '#f0fdf4' : '#fff',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{t.label}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
                {t.rpm > 0 ? `${t.rpm} rpm · ${t.daily.toLocaleString()}/day` : 'Unlimited'}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#16a34a', marginTop: 4 }}>{t.price}</div>
            </div>
          ))}
        </div>

        {err && <p style={{ color: '#dc2626', marginBottom: 12, fontSize: 14 }}>{err}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: 14, fontSize: 15, fontWeight: 700,
            background: loading ? '#e5e7eb' : '#16a34a', color: loading ? '#9ca3af' : '#fff',
            border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating account…' : 'Get API Key'}
        </button>
      </form>
    </main>
  );
}
