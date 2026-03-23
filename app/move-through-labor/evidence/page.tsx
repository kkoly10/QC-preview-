import styles from '../site.module.css';
import { Citation } from '../_components/Citation';
import { PageIntro } from '../_components/PageIntro';
import { ReferenceList } from '../_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'] as const;

export default function EvidencePage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PageIntro
          eyebrow="Evidence"
          title="What the selected literature shows"
          description="This page keeps the evidence visible and does not hide uncertainty. Some of the cited articles are reviews, one is a meta-analysis, one is a network meta-analysis, and one is a practice-oriented article. Together, they build the case for labor mobility and position choice."
        />

        <div className={styles.evidenceTable}>
          <div className={`${styles.evidenceRow} ${styles.evidenceHead}`}>
            <div>Claim or takeaway</div>
            <div>How it is supported in this project</div>
            <div>Source(s)</div>
          </div>

          <div className={styles.evidenceRow}>
            <div>Movement and position changes are a healthy labor practice.</div>
            <div>
              Ondeck emphasizes walking, moving around, and changing positions throughout labor as a
              healthy birth practice and frames mobility as part of physiologic birth support.
            </div>
            <div>
              Ondeck
              <Citation ids={['ondeck2019']} />
            </div>
          </div>

          <div className={styles.evidenceRow}>
            <div>Upright positions may improve labor mechanics.</div>
            <div>
              The selected review literature associates upright positions with gravity-assisted fetal
              descent, increased pelvic dimensions, and more effective pushing or contraction
              efficiency.
            </div>
            <div>
              Zang; Liu; Satone
              <Citation ids={['zang2020', 'liu2025', 'satone2023']} />
            </div>
          </div>

          <div className={styles.evidenceRow}>
            <div>Routine supine or lithotomy positioning has tradeoffs.</div>
            <div>
              The selected review by Satone and colleagues links conventional positioning with more
              pain during contractions and greater risk of episiotomy and/or perineal injury in some
              comparisons, while also discussing blood pressure and fetal heart rate concerns.
            </div>
            <div>
              Satone
              <Citation ids={['satone2023']} />
            </div>
          </div>

          <div className={styles.evidenceRow}>
            <div>Maternal positioning should remain flexible in the second stage.</div>
            <div>
              Gimovsky and Berghella’s evidence-based labor management review supports upright or
              recumbent positioning for women without epidural anesthesia rather than a single
              mandatory posture.
            </div>
            <div>
              Gimovsky &amp; Berghella
              <Citation ids={['gimovsky2022']} />
            </div>
          </div>

          <div className={styles.evidenceRow}>
            <div>Nulliparous women deserve focused attention.</div>
            <div>
              The selected 2025 systematic review and network meta-analysis specifically evaluates
              childbirth positions in nulliparous women during the second stage of labor, making it
              highly relevant to first births.
            </div>
            <div>
              Liu et al.
              <Citation ids={['liu2025']} />
            </div>
          </div>
        </div>

        <section className={styles.innerSection}>
          <div className={styles.grid3}>
            <article className={styles.card}>
              <h2 className={styles.h3}>Not every labor is identical</h2>
              <p className={styles.p}>
                This project does not argue that one position is always best. It argues that women
                should not be limited to lithotomy by default, especially when evidence supports
                movement and individualized positioning
                <Citation ids={['ondeck2019', 'gimovsky2022']} />.
              </p>
            </article>

            <article className={styles.card}>
              <h2 className={styles.h3}>Evidence strength varies by article type</h2>
              <p className={styles.p}>
                The source list includes a meta-analysis, a systematic review with network
                meta-analysis, a review article, and a management-focused article. That mix is
                useful for public education, but it also means conclusions should be framed
                carefully and not overstated.
              </p>
            </article>

            <article className={styles.card}>
              <h2 className={styles.h3}>Clinical meaning and fiscal meaning can overlap</h2>
              <p className={styles.p}>
                When a low-cost supportive strategy such as movement or position choice helps reduce
                unnecessary intervention, the result can be better patient experience alongside more
                responsible resource use
                <Citation ids={['ondeck2019']} />.
              </p>
            </article>
          </div>
        </section>

        <ReferenceList ids={pageRefs} title="References used on this page" />
      </div>
    </section>
  );
}
