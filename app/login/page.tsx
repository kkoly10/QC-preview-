import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{ padding: 24, maxWidth: 640, margin: '0 auto' }}>
      <h1>ResultRail QC</h1>
      <p>Sign in to continue to the protected QC prep workspace.</p>
      <p>
        Configure Supabase Auth providers, then implement your preferred sign-in flow.
      </p>
      <p>
        After successful authentication, users are redirected to{' '}
        <code>/dashboard</code>.
      </p>
      <Link href="/dashboard">Go to dashboard</Link>
    </main>
  );
}
