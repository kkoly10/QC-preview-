import styles from '../../../admin.module.css';
import { getAdminHomePageDraft } from '@/lib/site/cms';
import { HomeEditorForm } from './HomeEditorForm';

export default async function AdminHomePageEditor() {
  const page = await getAdminHomePageDraft();

  return (
    <div className={styles.stack}>
      <div className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>Editable content</p>
          <h1 className={styles.h1}>Home page editor</h1>
          <p className={styles.p}>Edit the hero, overview cards, takeaways, and audience section for the home page.</p>
        </div>
        <div className={styles.cardMeta}>
          <span>Draft updated: {page.draft_updated_at ? new Date(page.draft_updated_at).toLocaleString() : 'Not yet saved'}</span>
          <span>Published: {page.published_at ? new Date(page.published_at).toLocaleString() : 'Not yet published'}</span>
        </div>
      </div>

      <HomeEditorForm initialDraft={page.draft_content} />
    </div>
  );
}
