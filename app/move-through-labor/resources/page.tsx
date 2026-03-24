import styles from '../site.module.css';
import { PageIntro } from '../_components/PageIntro';
import { ReferenceList } from '../_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'] as const;

export default function ResourcesPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.pageLeadShell}>
          <div className={styles.pageLeadCard}>
            <PageIntro
              eyebrow="Resources"
              title="References and practical use"
              description="This page gathers the selected references in one place and explains how readers can use the information responsibly."
            />
          </div>

          <aside className={styles.pageLeadAside}>
            <p className={styles.eyebrow}>Use responsibly</p>
            <h2 className={styles.h2}>What readers should do with this information</h2>
            <ul className={styles.sideList}>
              <li>Use the material to prepare questions and understand options.</li>
              <li>Keep clinical decisions grounded in individualized medical care.</li>
              <li>Return to the reference list when a claim matters enough to verify directly.</li>
            </ul>
          </aside>
        </div>

        <div className={styles.noteGrid}>
          <article className={styles.noteCard}>
            <p className={styles.cardEyebrow}>Practical use</p>
            <h2 className={styles.h3}>How to use this website</h2>
            <p className={styles.p}>
              This site is educational. It is designed to help the public understand that labor
              positioning can affect comfort, mechanics, and the use of intervention. It is not a
              substitute for individualized medical judgment.
            </p>
            <p className={styles.p}>
              A practical takeaway from the selected evidence is simple: ask whether movement,
              upright positioning, or a non-lithotomy option is possible before assuming there is
              only one way to labor or push.
            </p>
          </article>

          <article className={styles.noteCard}>
            <p className={styles.cardEyebrow}>Policy angle</p>
            <h2 className={styles.h3}>Why fiscal responsibility appears here</h2>
            <p className={styles.p}>
              This project frames mobility and supportive care as a low-cost strategy with the
              potential to improve outcomes while reducing avoidable intervention. That is a
              reasonable policy-facing implication of the selected literature, but it should still
              be presented as an argument grounded in supportive-care logic rather than as a
              standalone cost-effectiveness trial.
            </p>
          </article>

          <article className={styles.noteCard}>
            <p className={styles.cardEyebrow}>Reference set</p>
            <h2 className={styles.h3}>Current literature base</h2>
            <p className={styles.p}>The current public version of the site is built from five selected sources and is designed to expand later as more references are added.</p>
          </article>
        </div>

        <div className={styles.innerSection}>
          <ReferenceList ids={pageRefs} title="Full reference list" />
        </div>
      </div>
    </section>
  );
}
