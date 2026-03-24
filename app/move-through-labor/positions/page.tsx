import styles from '../site.module.css';
import { Citation } from '../_components/Citation';
import { PageIntro } from '../_components/PageIntro';
import { ReferenceList } from '../_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'] as const;

const positions = [
  {
    title: 'Walking and standing',
    body: 'Walking and standing keep labor active, encourage mobility, and allow gravity to assist fetal descent. In this project’s source set, movement itself is treated as an important supportive practice rather than something incidental.',
    refs: ['ondeck2019', 'satone2023'],
  },
  {
    title: 'Kneeling or hands-and-knees',
    body: 'Kneeling positions can help some women stay mobile, reduce discomfort, and shift pelvic mechanics during labor. They also fit the larger argument that women should be free to change positions instead of remaining flat on their backs.',
    refs: ['ondeck2019', 'liu2025'],
  },
  {
    title: 'Squatting',
    body: 'The selected review by Satone and colleagues describes squatting as a position that uses gravity well, improves pushing efficiency, and increases pelvic space by flexing the legs.',
    refs: ['satone2023', 'zang2020'],
  },
  {
    title: 'Sitting or birthing stool',
    body: 'Sitting upright or using a birthing stool may preserve the advantages of an upright posture while offering support and rest. In the selected literature, these positions are discussed as alternatives to the conventional lithotomy setup.',
    refs: ['satone2023', 'liu2025'],
  },
  {
    title: 'Side-lying or other recumbent positions',
    body: 'This project does not treat upright positions as the only acceptable option. Evidence-based management also recognizes recumbent positioning as a valid choice in some circumstances, especially when the woman’s comfort and clinical situation call for it.',
    refs: ['gimovsky2022'],
  },
  {
    title: 'Lithotomy or flat supine positioning',
    body: 'Lithotomy remains common in hospital settings, but the selected literature suggests it should not be the automatic default. Compared with some alternatives, it may involve more pain, less physiologic use of gravity, and greater risk of intervention-related tradeoffs.',
    refs: ['satone2023', 'ondeck2019'],
  },
] as const;

export default function PositionsPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.pageLeadShell}>
          <div className={styles.pageLeadCard}>
            <PageIntro
              eyebrow="Labor positions"
              title="Birth positions are options, not rules"
              description="The best public-facing message is not that everyone should labor the same way. It is that women should know the likely benefits and tradeoffs of different positions so they can make informed choices with their care teams."
            />
          </div>

          <aside className={styles.pageLeadAside}>
            <p className={styles.eyebrow}>Featured alternatives</p>
            <h2 className={styles.h2}>The page is built around movement</h2>
            <ul className={styles.sideList}>
              <li>Walking and standing</li>
              <li>Kneeling and hands-and-knees</li>
              <li>Squatting and birthing stool options</li>
              <li>Side-lying and other supported recumbent positions</li>
            </ul>
          </aside>
        </div>

        <div className={styles.positionGrid}>
          {positions.map((position) => (
            <article className={styles.positionCard} key={position.title}>
              <p className={styles.cardEyebrow}>Position option</p>
              <h2 className={styles.h3}>{position.title}</h2>
              <p className={styles.p}>
                {position.body}
                <Citation ids={position.refs} />.
              </p>
            </article>
          ))}
        </div>

        <section className={styles.innerSection}>
          <div className={styles.split}> 
            <div className={styles.pageLeadCard}>
              <p className={styles.cardEyebrow}>Public takeaway</p>
              <h2 className={styles.h2}>What the public should remember</h2>
              <ul className={styles.list}>
                <li>
                  Position can be changed during labor. One posture does not need to be used from
                  start to finish
                  <Citation ids={['ondeck2019']} />.
                </li>
                <li>
                  Upright options are especially relevant to discussions of the second stage of
                  labor and non-epidural births in the selected evidence base
                  <Citation ids={['zang2020', 'gimovsky2022']} />.
                </li>
                <li>Comfort, monitoring needs, fatigue, and safety all matter. This is about informed choice, not rigid ideology.</li>
              </ul>
            </div>

            <aside className={styles.audienceCard}>
              <p className={styles.cardEyebrow}>Conversation starters</p>
              <h2 className={styles.h2}>Questions to ask your care team</h2>
              <ul className={styles.plainList}>
                <li>Can I walk and change positions during labor?</li>
                <li>What position options do you support in the second stage?</li>
                <li>Under what circumstances would I need to stay in bed?</li>
                <li>How can we avoid making lithotomy the default unless it is truly needed?</li>
              </ul>
            </aside>
          </div>
        </section>

        <ReferenceList ids={pageRefs} title="References used on this page" />
      </div>
    </section>
  );
}
