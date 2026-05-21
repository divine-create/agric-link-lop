import { AdminProviderPanel } from '../../../components/AdminProviderPanel'

export const metadata = { title: 'Provider Approvals — AgriLink LOP Admin' }

export default function AdminProvidersPage() {
  return (
    <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '24px 16px' }}>
      <AdminProviderPanel />
    </main>
  )
}
