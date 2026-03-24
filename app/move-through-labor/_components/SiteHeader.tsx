'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../site.module.css';

const navItems = [
  { href: '/move-through-labor', label: 'Home' },
  { href: '/move-through-labor/evidence', label: 'Evidence' },
  { href: '/move-through-labor/positions', label: 'Positions' },
  { href: '/move-through-labor/media', label: 'Media' },
  { href: '/move-through-labor/resources', label: 'Resources' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link href="/move-through-labor" className={styles.brand}>
          <span className={styles.brandDot} aria-hidden="true" />
          <span className={styles.brandText}>
            Move Through Labor
            <small>Positioning and the effect on labor</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink}${isActive ? ` ${styles.active}` : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
