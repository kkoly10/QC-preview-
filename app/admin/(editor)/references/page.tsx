import styles from '../../admin.module.css';
import { getAdminReferences } from '@/lib/site/cms';
import { ReferencesForm } from './ReferencesForm';

export default async function AdminReferencesPage() {
  const references = await getAdminReferences();

  return (
    <div className={styles.stack}>
      <div>
        <p className={styles.eyebrow}>Reference manager</p>
        <h1 className={styles.h1}>References</h1>
        <p className={styles.p}>Edit global references used across the public site. Citation keys like <code>ondeck2019</code> should remain stable.</p>
      </div>

      <ReferencesForm initialReferences={references} />
    </div>
  );
}
