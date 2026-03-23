import styles from '../site.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <p className={styles.p}>Move Through Labor</p>
        <p className={styles.p}>
          Educational content only. This website supports informed conversations and does not replace
          individualized medical care.
        </p>
      </div>
    </footer>
  );
}
