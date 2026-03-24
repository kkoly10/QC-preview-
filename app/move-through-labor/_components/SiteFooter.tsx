import styles from '../site.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerMark} aria-hidden="true">
            PL
          </span>
          <div className={styles.footerLockup}>
            <p className={styles.footerTitle}>Positioning and the Effect on Labor</p>
            <p className={styles.footerSubtitle}>Evidence-informed birth education</p>
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
