import { redirect } from 'next/navigation';
import styles from '../admin.module.css';
import { getAdminContext } from '@/lib/admin/auth';
import { LoginForm } from './LoginForm';

export default async function AdminLoginPage() {
  const { profile } = await getAdminContext();

  if (profile) {
    redirect('/admin');
  }

  return (
    <div className={styles.page}>
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <p className={styles.eyebrow}>Editor access</p>
          <h1 className={styles.h1}>Sign in to manage the site</h1>
          <p className={styles.p}>
            This admin area controls editable content for Positioning and the Effect on Labor.
          </p>

          <LoginForm />

          <div className={styles.notice}>
            <p className={styles.h3}>First-time setup note</p>
            <p className={styles.p}>
              Create the editor user in Supabase Auth, then add that user to the{' '}
              <code>admin_profiles</code> table after running the migration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
