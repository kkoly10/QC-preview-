'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReferenceRecord } from '@/lib/site/types';
import styles from '../../admin.module.css';

type ReferencesFormProps = {
  initialReferences: ReferenceRecord[];
};

export function ReferencesForm({ initialReferences }: ReferencesFormProps) {
  const router = useRouter();
  const initialJson = useMemo(() => JSON.stringify(initialReferences, null, 2), [initialReferences]);
  const [json, setJson] = useState(initialJson);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setStatus('Saving references...');

    try {
      const references = JSON.parse(json);
      const response = await fetch('/api/admin/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ references }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? 'Unable to save references.');
        setStatus('');
        setSaving(false);
        return;
      }

      setStatus('References saved.');
      setSaving(false);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Invalid JSON.');
      setStatus('');
      setSaving(false);
    }
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <p className={styles.p}>Edit references as JSON. Keep citation keys stable so existing page citations do not break.</p>
      <div className={styles.field}>
        <label htmlFor="references_json">References JSON</label>
        <textarea id="references_json" className={styles.textarea} value={json} onChange={(event) => setJson(event.target.value)} style={{ minHeight: 420 }} />
      </div>

      <div className={styles.toolbar}>
        <button className={styles.button} type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save references'}
        </button>
        {status ? <span className={styles.success}>{status}</span> : null}
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>
    </form>
  );
}
