import Link from 'next/link';
import styles from '../admin.module.css';
import { requireAdmin } from '@/lib/admin/auth';
import { getAdminReferences, getAdminSettings } from '@/lib/site/cms';

const pageCards = [
  { href: '/admin/pages/home', title: 'Home page', status: 'Editable now' },
  { href: '/admin/pages/evidence', title: 'Evidence page', status: 'Scaffolded next' },
  { href: '/admin/pages/positions', title: 'Positions page', status: 'Scaffolded next' },
  { href: '/admin/pages/media', title: 'Media page', status: 'Scaffolded next' },
  { href: '/admin/pages/resources', title: 'Resources page', status: 'Scaffolded next' },
];

export default async function AdminDashboardPage() {
  await requireAdmin();
  const settings = await getAdminSettings();
  const references = await getAdminReferences();

  return (
    <div className={styles.stack}>
      <div className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>Overview</p>
          <h1 className={styles.h1}>Admin dashboard</h1>
          <p className={styles.p}>Manage live site settings, references, and editable page content.</p>
        </div>

        <span className={styles.badge}>Active brand: {settings.short_title}</span>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Site settings</p>
          <h2 className={styles.h3}>{settings.site_title}</h2>
          <p className={styles.p}>{settings.tagline}</p>
          <Link href="/admin/settings" className={styles.buttonSecondary}>
            Edit settings
          </Link>
        </div>

        <div className={styles.card}>
          <p className={styles.eyebrow}>References</p>
          <h2 className={styles.h3}>{references.length} references loaded</h2>
          <p className={styles.p}>Edit citations, labels, links, and sort order for the site reference base.</p>
          <Link href="/admin/references" className={styles.buttonSecondary}>
            Manage references
          </Link>
        </div>

        <div className={styles.card}>
          <p className={styles.eyebrow}>Public site</p>
          <h2 className={styles.h3}>Live editorial website</h2>
          <p className={styles.p}>Use the public site link to verify content after publishing updates.</p>
          <Link href="/move-through-labor" className={styles.buttonSecondary}>
            Open live site
          </Link>
        </div>
      </div>

      <div className={styles.panel}>
        <p className={styles.eyebrow}>Page editors</p>
        <div className={styles.cardGrid}>
          {pageCards.map((card) => (
            <div className={styles.card} key={card.href}>
              <h2 className={styles.h3}>{card.title}</h2>
              <div className={styles.cardMeta}>
                <span>{card.status}</span>
              </div>
              <Link href={card.href} className={styles.buttonSecondary}>
                Open editor
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
