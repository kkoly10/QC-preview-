'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@/lib/site/types';
import styles from '../../admin.module.css';

type SettingsFormProps = {
  initialSettings: SiteSettings;
};

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(initialSettings);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField<Key extends keyof SiteSettings>(key: Key, value: SiteSettings[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setStatus('Saving settings...');

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Unable to save settings.');
      setStatus('');
      setSaving(false);
      return;
    }

    setStatus('Settings saved.');
    setSaving(false);
    router.refresh();
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="site_title">Site title</label>
          <input id="site_title" className={styles.input} value={form.site_title} onChange={(e) => updateField('site_title', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="short_title">Short title</label>
          <input id="short_title" className={styles.input} value={form.short_title} onChange={(e) => updateField('short_title', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="mobile_title">Mobile title</label>
          <input id="mobile_title" className={styles.input} value={form.mobile_title} onChange={(e) => updateField('mobile_title', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="monogram">Monogram</label>
          <input id="monogram" className={styles.input} value={form.monogram} onChange={(e) => updateField('monogram', e.target.value)} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="tagline">Tagline</label>
        <input id="tagline" className={styles.input} value={form.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="footer_title">Footer title</label>
          <input id="footer_title" className={styles.input} value={form.footer_title} onChange={(e) => updateField('footer_title', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="footer_subtitle">Footer subtitle</label>
          <input id="footer_subtitle" className={styles.input} value={form.footer_subtitle} onChange={(e) => updateField('footer_subtitle', e.target.value)} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="seo_title">SEO title</label>
        <input id="seo_title" className={styles.input} value={form.seo_title} onChange={(e) => updateField('seo_title', e.target.value)} />
      </div>

      <div className={styles.field}>
        <label htmlFor="seo_description">SEO description</label>
        <textarea id="seo_description" className={styles.textarea} value={form.seo_description} onChange={(e) => updateField('seo_description', e.target.value)} />
      </div>

      <div className={styles.toolbar}>
        <button className={styles.button} type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save settings'}
        </button>
        {status ? <span className={styles.success}>{status}</span> : null}
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>
    </form>
  );
}
