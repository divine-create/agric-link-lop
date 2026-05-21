import { ProviderRegistrationForm } from '../../../components/ProviderRegistrationForm'

export const metadata = { title: 'Provider Registration — AgriLink LOP' }

export default function ProviderRegisterPage() {
  return (
    <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '24px 16px' }}>
      <ProviderRegistrationForm />
    </main>
  )
}
