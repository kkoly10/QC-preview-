import styles from '../site.module.css';
import { PageIntro } from '../_components/PageIntro';
import { ReferenceList } from '../_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'] as const;

export default function ResourcesPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PageIntro
          eyebrow="Resources"
          title="References and practical use"
          description="This page gathers the selected references in one place and explains how readers can use the information responsibly."
        />

        <div className={styles.split}>
          <div className={styles.card}>
            <h2 className={styles.h2}>How to use this website</h2>
            <p className={styles.p}>
              This site is educational. It is designed to help the public understand that labor positioning can affect comfort, mechanics, and the use of intervention. It is not a substitute for individualized medical judgment.
            </p>
            <p className={styles.p}>
              A practical takeaway from the selected evidence is simple: ask whether movement, upright positioning, or a non-lithotomy option is possible before assuming there is only one way to labor or push.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.h2}>Why fiscal responsibility appears in this project</h2>
            <p className={styles.p}>
              This project frames mobility and supportive care as a low-cost strategy with the potential to improve outcomes while reducing avoidable intervention. That is a reasonable policy-facing implication of the selected literature, but it should still be presented as an argument grounded in supportive-care logic rather than as a standalone cost-effectiveness trial.
            </p>
          </div>
        </div>

        <div className={styles.innerSection}>
          <ReferenceList ids={pageRefs} title="Full reference list" />
        </div>
      </div>
    </section>
  );
}
