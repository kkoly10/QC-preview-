'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { HomePageContent } from '@/lib/site/types';
import styles from '../../../admin.module.css';

type HomeEditorFormProps = {
  initialDraft: HomePageContent;
};

function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function HomeEditorForm({ initialDraft }: HomeEditorFormProps) {
  const router = useRouter();
  const [heroEyebrow, setHeroEyebrow] = useState(initialDraft.hero.eyebrow);
  const [heroSubline, setHeroSubline] = useState(initialDraft.hero.subline);
  const [heroTitle, setHeroTitle] = useState(initialDraft.hero.title);
  const [heroLead, setHeroLead] = useState(initialDraft.hero.lead);
  const [primaryLabel, setPrimaryLabel] = useState(initialDraft.hero.primaryCta.label);
  const [primaryHref, setPrimaryHref] = useState(initialDraft.hero.primaryCta.href);
  const [secondaryLabel, setSecondaryLabel] = useState(initialDraft.hero.secondaryCta.label);
  const [secondaryHref, setSecondaryHref] = useState(initialDraft.hero.secondaryCta.href);
  const [heroCardsJson, setHeroCardsJson] = useState(pretty(initialDraft.heroCards));
  const [heroSidebarTitle, setHeroSidebarTitle] = useState(initialDraft.heroSidebar.title);
  const [heroSidebarEyebrow, setHeroSidebarEyebrow] = useState(initialDraft.heroSidebar.eyebrow);
  const [heroSidebarJson, setHeroSidebarJson] = useState(pretty(initialDraft.heroSidebar.bullets));
  const [featuredReferenceKeys, setFeaturedReferenceKeys] = useState(
    initialDraft.featuredReferenceKeys.join(', ')
  );
  const [overviewEyebrow, setOverviewEyebrow] = useState(initialDraft.overview.eyebrow);
  const [overviewTitle, setOverviewTitle] = useState(initialDraft.overview.title);
  const [overviewDescription, setOverviewDescription] = useState(initialDraft.overview.description);
  const [overviewCardsJson, setOverviewCardsJson] = useState(pretty(initialDraft.overview.cards));
  const [takeawaysEyebrow, setTakeawaysEyebrow] = useState(initialDraft.takeaways.eyebrow);
  const [takeawaysTitle, setTakeawaysTitle] = useState(initialDraft.takeaways.title);
  const [takeawaysDescription, setTakeawaysDescription] = useState(initialDraft.takeaways.description);
  const [takeawayCardsJson, setTakeawayCardsJson] = useState(pretty(initialDraft.takeaways.cards));
  const [audienceEyebrow, setAudienceEyebrow] = useState(initialDraft.audienceBox.eyebrow);
  const [audienceTitle, setAudienceTitle] = useState(initialDraft.audienceBox.title);
  const [audienceBody1, setAudienceBody1] = useState(initialDraft.audienceBox.body1);
  const [audienceBody2, setAudienceBody2] = useState(initialDraft.audienceBox.body2);
  const [audienceCtaLabel, setAudienceCtaLabel] = useState(initialDraft.audienceBox.cta.label);
  const [audienceCtaHref, setAudienceCtaHref] = useState(initialDraft.audienceBox.cta.href);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const tips = useMemo(
    () => [
      'Use valid JSON for structured sections like hero cards and overview cards.',
      'Keep citation keys exactly as they exist in the references table.',
      'Use Save draft first, then Publish when you are ready to update the live page.',
    ],
    []
  );

  async function submit(mode: 'draft' | 'publish') {
    setSaving(true);
    setError('');
    setStatus(mode === 'publish' ? 'Publishing home page...' : 'Saving home draft...');

    try {
      const content: HomePageContent = {
        hero: {
          eyebrow: heroEyebrow,
          subline: heroSubline,
          title: heroTitle,
          lead: heroLead,
          primaryCta: { label: primaryLabel, href: primaryHref },
          secondaryCta: { label: secondaryLabel, href: secondaryHref },
        },
        heroCards: JSON.parse(heroCardsJson),
        heroSidebar: {
          eyebrow: heroSidebarEyebrow,
          title: heroSidebarTitle,
          bullets: JSON.parse(heroSidebarJson),
        },
        featuredReferenceKeys: featuredReferenceKeys
          .split(',')
          .map((key) => key.trim())
          .filter(Boolean),
        overview: {
          eyebrow: overviewEyebrow,
          title: overviewTitle,
          description: overviewDescription,
          cards: JSON.parse(overviewCardsJson),
        },
        takeaways: {
          eyebrow: takeawaysEyebrow,
          title: takeawaysTitle,
          description: takeawaysDescription,
          cards: JSON.parse(takeawayCardsJson),
        },
        audienceBox: {
          eyebrow: audienceEyebrow,
          title: audienceTitle,
          body1: audienceBody1,
          body2: audienceBody2,
          cta: { label: audienceCtaLabel, href: audienceCtaHref },
        },
      };

      const response = await fetch('/api/admin/pages/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, publish: mode === 'publish' }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? 'Unable to save home page.');
        setStatus('');
        setSaving(false);
        return;
      }

      setStatus(mode === 'publish' ? 'Home page published.' : 'Home page draft saved.');
      setSaving(false);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Invalid content data.');
      setStatus('');
      setSaving(false);
    }
  }

  return (
    <div className={styles.stack}>
      <div className={styles.notice}>
        <p className={styles.h3}>Editing tips</p>
        <ul className={styles.list}>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className={styles.formCard}>
        <p className={styles.eyebrow}>Hero</p>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Eyebrow</label>
            <input className={styles.input} value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Subline</label>
            <input className={styles.input} value={heroSubline} onChange={(e) => setHeroSubline(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Hero title</label>
            <input className={styles.input} value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Featured reference keys</label>
            <input className={styles.input} value={featuredReferenceKeys} onChange={(e) => setFeaturedReferenceKeys(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Hero lead</label>
          <textarea className={styles.textarea} value={heroLead} onChange={(e) => setHeroLead(e.target.value)} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Primary CTA label</label>
            <input className={styles.input} value={primaryLabel} onChange={(e) => setPrimaryLabel(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Primary CTA href</label>
            <input className={styles.input} value={primaryHref} onChange={(e) => setPrimaryHref(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Secondary CTA label</label>
            <input className={styles.input} value={secondaryLabel} onChange={(e) => setSecondaryLabel(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Secondary CTA href</label>
            <input className={styles.input} value={secondaryHref} onChange={(e) => setSecondaryHref(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.eyebrow}>Structured sections</p>
        <div className={styles.field}>
          <label>Hero cards JSON</label>
          <textarea className={styles.textarea} value={heroCardsJson} onChange={(e) => setHeroCardsJson(e.target.value)} style={{ minHeight: 220 }} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Hero sidebar eyebrow</label>
            <input className={styles.input} value={heroSidebarEyebrow} onChange={(e) => setHeroSidebarEyebrow(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Hero sidebar title</label>
            <input className={styles.input} value={heroSidebarTitle} onChange={(e) => setHeroSidebarTitle(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Hero sidebar bullets JSON</label>
          <textarea className={styles.textarea} value={heroSidebarJson} onChange={(e) => setHeroSidebarJson(e.target.value)} style={{ minHeight: 220 }} />
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.eyebrow}>Overview</p>
        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>Eyebrow</label>
            <input className={styles.input} value={overviewEyebrow} onChange={(e) => setOverviewEyebrow(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Title</label>
            <input className={styles.input} value={overviewTitle} onChange={(e) => setOverviewTitle(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <input className={styles.input} value={overviewDescription} onChange={(e) => setOverviewDescription(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Overview cards JSON</label>
          <textarea className={styles.textarea} value={overviewCardsJson} onChange={(e) => setOverviewCardsJson(e.target.value)} style={{ minHeight: 260 }} />
        </div>
      </div>

      <div className={styles.formCard}>
        <p className={styles.eyebrow}>Takeaways and audience</p>
        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>Takeaways eyebrow</label>
            <input className={styles.input} value={takeawaysEyebrow} onChange={(e) => setTakeawaysEyebrow(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Takeaways title</label>
            <input className={styles.input} value={takeawaysTitle} onChange={(e) => setTakeawaysTitle(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Takeaways description</label>
            <input className={styles.input} value={takeawaysDescription} onChange={(e) => setTakeawaysDescription(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Takeaway cards JSON</label>
          <textarea className={styles.textarea} value={takeawayCardsJson} onChange={(e) => setTakeawayCardsJson(e.target.value)} style={{ minHeight: 240 }} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Audience eyebrow</label>
            <input className={styles.input} value={audienceEyebrow} onChange={(e) => setAudienceEyebrow(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Audience title</label>
            <input className={styles.input} value={audienceTitle} onChange={(e) => setAudienceTitle(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Audience body 1</label>
          <textarea className={styles.textarea} value={audienceBody1} onChange={(e) => setAudienceBody1(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Audience body 2</label>
          <textarea className={styles.textarea} value={audienceBody2} onChange={(e) => setAudienceBody2(e.target.value)} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Audience CTA label</label>
            <input className={styles.input} value={audienceCtaLabel} onChange={(e) => setAudienceCtaLabel(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Audience CTA href</label>
            <input className={styles.input} value={audienceCtaHref} onChange={(e) => setAudienceCtaHref(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <button className={styles.buttonSecondary} type="button" disabled={saving} onClick={() => submit('draft')}>
          {saving ? 'Working...' : 'Save draft'}
        </button>
        <button className={styles.button} type="button" disabled={saving} onClick={() => submit('publish')}>
          {saving ? 'Working...' : 'Publish home page'}
        </button>
        {status ? <span className={styles.success}>{status}</span> : null}
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>
    </div>
  );
}
