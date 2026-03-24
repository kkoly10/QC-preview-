import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import styles from './site.module.css';
import { SiteFooter } from './_components/SiteFooter';
import { SiteHeader } from './_components/SiteHeader';

export const metadata: Metadata = {
  title: 'Positioning and the Effect on Labor',
  description:
    'An evidence-based educational website about maternal positioning during labor, birth options, and why movement matters.',
};

export default function LaborSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
