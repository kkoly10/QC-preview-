import Link from 'next/link';
import styles from '../admin.module.css';
import { requireAdmin } from '@/lib/admin/auth';

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <div className={styles.stack}>
      <div className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>Overview</p>
          <h1 className={styles.h1}>Admin dashboard</h1>
          <p className={styles.p}>
            Manage live site settings, references, and editable page content.
          </p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Site settings</p>
          <h2 className={styles.h3}>Global brand and SEO</h2>
          <Link href="/admin/settings" className={styles.buttonSecondary}>
            Edit settings
          </Link>
        </div>

        <div className={styles.card}>
          <p className={styles.eyebrow}>References</p>
          <h2 className={styles.h3}>Global citations</h2>
          <Link href="/admin/references" className={styles.buttonSecondary}>
            Manage references
          </Link>
        </div>

        <div className={styles.card}>
          <p className={styles.eyebrow}>Home page</p>
          <h2 className={styles.h3}>Draft + publish</h2>
          <Link href="/admin/pages/home" className={styles.buttonSecondary}>
            Edit home page
          </Link>
        </div>
      </div>
    </div>
  );
}