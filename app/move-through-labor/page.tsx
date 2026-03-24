import Link from 'next/link';
import styles from './site.module.css';
import { Citation } from './_components/Citation';
import { PageIntro } from './_components/PageIntro';
import { ReferenceList } from './_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'] as const;

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroShell}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Evidence-informed birth education</p>
            <p className={styles.heroSubline}>Positioning and the effect on labor</p>
            <h1 className={styles.displayTitle}>Move Through Labor</h1>
            <p className={styles.heroLead}>
              Positioning during labor is not just a comfort preference. The literature selected for
              this project consistently points to the value of walking, changing positions, and using
              upright or non-supine options when clinically appropriate
              <Citation ids={['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022']} />.
            </p>

            <div className={styles.heroActions}>
              <Link href="/move-through-labor/evidence" className={styles.button}>
                Explore the evidence
              </Link>
              <Link href="/move-through-labor/positions" className={styles.buttonSecondary}>
                Compare labor positions
              </Link>
            </div>

            <div className={styles.heroStats}>
              <article className={styles.statCard}>
                <p className={styles.statLabel}>Mobility</p>
                <p className={styles.statText}>
                  Walking, changing positions, and laboring upright are presented as meaningful
                  supportive-care practices
                  <Citation ids={['ondeck2019', 'gimovsky2022']} />.
                </p>
              </article>

              <article className={styles.statCard}>
                <p className={styles.statLabel}>Mechanics</p>
                <p className={styles.statText}>
                  Upright positions are associated in the selected evidence with fetal descent,
                  pelvic opening, and more efficient labor mechanics
                  <Citation ids={['zang2020', 'liu2025', 'satone2023']} />.
                </p>
              </article>

              <article className={styles.statCard}>
                <p className={styles.statLabel}>Choice</p>
                <p className={styles.statText}>
                  The point is not one mandatory posture. The point is informed, supported choice
                  rather than default lithotomy
                  <Citation ids={['satone2023', 'gimovsky2022']} />.
                </p>
              </article>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.sidePanel}>
              <p className={styles.eyebrow}>Why this matters</p>
              <h2 className={styles.h2}>A clearer first impression for readers</h2>
              <ul className={styles.sideList}>
                <li>
                  Alternative positions may support physiologic labor progression, fetal descent,
                  and more efficient pushing mechanics
                  <Citation ids={['zang2020', 'liu2025', 'satone2023']} />.
                </li>
                <li>
                  Selected reviews describe drawbacks of routine supine or lithotomy positioning,
                  including greater discomfort and higher risk of episiotomy or perineal injury in
                  some comparisons
                  <Citation ids={['satone2023']} />.
                </li>
                <li>
                  Walking, moving around, and changing positions throughout labor are presented as a
                  healthy birth practice
                  <Citation ids={['ondeck2019']} />.
                </li>
              </ul>
            </div>

            <div className={styles.sourcePanel}>
              <p className={styles.sourceLabel}>Current source base</p>
              <div className={styles.sourceGrid}>
                <span className={styles.sourceChip}>Ondeck (2019)</span>
                <span className={styles.sourceChip}>Zang et al. (2020)</span>
                <span className={styles.sourceChip}>Liu et al. (2025)</span>
                <span className={styles.sourceChip}>Satone et al. (2023)</span>
                <span className={styles.sourceChip}>Gimovsky &amp; Berghella (2022)</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <PageIntro
            eyebrow="Overview"
            title="Positioning can influence labor experience and delivery outcomes"
            description="This educational site translates the selected research into clear, public-facing language. The goal is not to prescribe one universal position, but to show that birthing people should know they have options."
            titleAs="h2"
          />

          <div className={styles.featureGrid}>
            <article className={`${styles.card} ${styles.featureCardWide}`}>
              <p className={styles.cardEyebrow}>Context</p>
              <h3 className={styles.h3}>Historical routine vs. current evidence</h3>
              <p className={styles.p}>
                Hospitals have often encouraged supine or recumbent positioning for monitoring and
                clinician convenience. The selected literature argues that upright, kneeling,
                squatting, sitting, walking, or otherwise mobile positions can better support
                physiologic labor
                <Citation ids={['ondeck2019', 'satone2023', 'liu2025']} />.
              </p>
            </article>

            <article className={styles.card}>
              <p className={styles.cardEyebrow}>First births</p>
              <h3 className={styles.h3}>Important for nulliparous women</h3>
              <p className={styles.p}>
                The project focuses in part on women giving birth for the first time, who often
                experience longer labor. The selected reviews examine whether second-stage positions
                can improve outcomes and reduce the need for more intervention-heavy delivery
                <Citation ids={['liu2025', 'gimovsky2022']} />.
              </p>
            </article>

            <article className={styles.card}>
              <p className={styles.cardEyebrow}>Systems view</p>
              <h3 className={styles.h3}>Why cost and resource use matter</h3>
              <p className={styles.p}>
                Promoting mobility and position choice is a comparatively low-cost supportive-care
                strategy. Ondeck’s discussion of movement during labor supports the argument that
                avoiding unnecessary intervention has both clinical and operational value
                <Citation ids={['ondeck2019']} />.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={`${styles.container} ${styles.argumentLayout}`}>
          <div>
            <PageIntro
              eyebrow="Key takeaways"
              title="What this website argues"
              description="The position a woman uses in labor can affect comfort, mechanics, and the overall birth process."
              titleAs="h2"
            />

            <div className={styles.takeawayStack}>
              <div className={styles.takeawayCard}>
                <strong>Mobility should be supported.</strong>
                <p className={styles.p}>
                  Laboring women benefit from being encouraged to move, walk, sway, kneel, sit,
                  squat, or rest in non-supine positions when it is safe to do so
                  <Citation ids={['ondeck2019', 'gimovsky2022']} />.
                </p>
              </div>

              <div className={styles.takeawayCard}>
                <strong>Lithotomy should not be treated as the automatic default.</strong>
                <p className={styles.p}>
                  The selected reviews suggest the conventional supine or lithotomy approach may
                  come with tradeoffs, especially when compared with positions that use gravity and
                  increase pelvic space
                  <Citation ids={['satone2023', 'zang2020']} />.
                </p>
              </div>

              <div className={styles.takeawayCard}>
                <strong>Patient choice is part of quality care.</strong>
                <p className={styles.p}>
                  Evidence-based labor management includes respecting maternal preferences and
                  recognizing that more than one position may be appropriate during the second stage
                  of labor
                  <Citation ids={['gimovsky2022', 'liu2025']} />.
                </p>
              </div>
            </div>
          </div>

          <aside className={styles.audienceCard}>
            <p className={styles.eyebrow}>Who this is for</p>
            <h2 className={styles.h2}>General public first, citations still visible</h2>
            <p className={styles.p}>
              This site is written for the general public, but it keeps citations visible so that
              readers can trace each major point back to the selected articles.
            </p>
            <p className={styles.p}>
              It can also serve as a discussion starter for childbirth education, shared
              decision-making, and conversations with clinicians about labor mobility.
            </p>
            <Link href="/move-through-labor/resources" className={styles.textLink}>
              See full references →
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <ReferenceList ids={pageRefs} title="References used on this page" />
        </div>
      </section>
    </>
  );
}
