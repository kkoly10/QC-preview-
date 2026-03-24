import styles from '../../admin.module.css';
import { getAdminSettings } from '@/lib/site/cms';
import { SettingsForm } from './SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div className={styles.stack}>
      <div>
        <p className={styles.eyebrow}>Global settings</p>
        <h1 className={styles.h1}>Site settings</h1>
        <p className={styles.p}>Edit the site title, mobile label, monogram, footer copy, and SEO metadata.</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
