import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from '../admin.module.css';
import { requireAdmin } from '@/lib/admin/auth';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/references', label: 'References' },
  { href: '/admin/pages/home', label: 'Home page' },
  { href: '/move-through-labor', label: 'View live site' }
];

export default async function EditorLayout({
  children
}: {
  children: ReactNode;
}) {
  const { profile } = await requireAdmin();

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.editorShell}>
          <aside className={`${styles.panel} ${styles.sidebar}`}>
            <p className={styles.eyebrow}>Editor dashboard</p>
            <h2 className={styles.h2}>Welcome back</h2>
            <p className={styles.p}>{profile.display_name || profile.email}</p>

            <nav className={styles.sideNav}>
              {links.map((link) => (
                <Link key={link.href} href={link.href} className={styles.sideLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}