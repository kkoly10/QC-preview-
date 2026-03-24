import type { SiteSettings } from '@/lib/site/types';
import styles from '../site.module.css';

type SiteFooterProps = {
  settings: SiteSettings;
};

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerMark} aria-hidden="true">
            {settings.monogram}
          </span>
          <div className={styles.footerLockup}>
            <p className={styles.footerTitle}>{settings.footer_title}</p>
            <p className={styles.footerSubtitle}>{settings.footer_subtitle}</p>
          </div>
        </div>

        <p className={styles.p}>
          Educational content only. This website supports informed conversations and does not
          replace individualized medical care.
        </p>
      </div>
    </footer>
  );
}
