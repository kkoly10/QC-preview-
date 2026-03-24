import { buildReferenceMap, getPublicReferences } from '@/lib/site/cms';
import styles from '../site.module.css';
import { Citation } from '../_components/Citation';
import { PageIntro } from '../_components/PageIntro';
import { ReferenceList } from '../_components/ReferenceList';

const pageRefs = ['ondeck2019', 'zang2020', 'liu2025', 'satone2023', 'gimovsky2022'];

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

export default async function PositionsPage() {
  const referenceMap = buildReferenceMap(await getPublicReferences());

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PageIntro
          eyebrow="Labor positions"
          title="Birth positions are options, not rules"
          description="The best public-facing message is not that everyone should labor the same way. It is that women should know the likely benefits and tradeoffs of different positions so they can make informed choices with their care teams."
        />

        <div className={styles.grid3}>
          {positions.map((position) => (
            <article className={styles.card} key={position.title}>
              <h2 className={styles.h3}>{position.title}</h2>
              <p className={styles.p}>
                {position.body}
                <Citation ids={position.refs} referenceMap={referenceMap} />.
              </p>
            </article>
          ))}
        </div>

        <section className={styles.innerSection}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.h2}>What the public should remember</h2>
              <ul className={styles.list}>
                <li>Position can be changed during labor. One posture does not need to be used from start to finish<Citation ids={['ondeck2019']} referenceMap={referenceMap} />.</li>
                <li>Upright options are especially relevant to discussions of the second stage of labor and non-epidural births in the selected evidence base<Citation ids={['zang2020', 'gimovsky2022']} referenceMap={referenceMap} />.</li>
                <li>Comfort, monitoring needs, fatigue, and safety all matter. This is about informed choice, not rigid ideology.</li>
              </ul>
            </div>

            <aside className={styles.highlight}>
              <h2 className={styles.h2}>Suggested conversation starters</h2>
              <p className={styles.p}>Ask your care team:</p>
              <ul className={styles.plainList}>
                <li>Can I walk and change positions during labor?</li>
                <li>What position options do you support in the second stage?</li>
                <li>Under what circumstances would I need to stay in bed?</li>
                <li>How can we avoid making lithotomy the default unless it is truly needed?</li>
              </ul>
            </aside>
          </div>
        </section>

        <ReferenceList ids={pageRefs} title="References used on this page" referenceMap={referenceMap} />
      </div>
    </section>
  );
}
