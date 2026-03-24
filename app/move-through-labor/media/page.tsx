import styles from '../site.module.css';
import { MediaEmbed } from '../_components/MediaEmbed';
import { PageIntro } from '../_components/PageIntro';

export default function MediaPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.pageLeadShell}>
          <div className={styles.pageLeadCard}>
            <PageIntro
              eyebrow="Media"
              title="Videos that support movement and positioning education"
              description="These embedded videos match the media items selected for this project and provide public-facing demonstrations of labor movement and positioning."
            />
          </div>

          <aside className={styles.pageLeadAside}>
            <p className={styles.eyebrow}>How to use this page</p>
            <h2 className={styles.h2}>Start with visuals, then return to the evidence</h2>
            <ul className={styles.sideList}>
              <li>Use these videos as visual orientation, not as standalone medical guidance.</li>
              <li>Pair movement demonstrations with the evidence and positions pages for context.</li>
              <li>Share them as conversation starters before birth planning discussions.</li>
            </ul>
          </aside>
        </div>

        <div className={styles.mediaGrid}>
          <MediaEmbed
            title="8 positions to ease labor pain"
            sourceLabel="BabyCenter"
            embedUrl="https://www.youtube.com/embed/rpzBPqKgvGk"
            description="A short visual overview of labor positions that may improve comfort and help people think beyond a single default hospital posture."
          />

          <MediaEmbed
            title="Pain Management Series: Positions and Movement"
            sourceLabel="Evidence Based Birth®"
            embedUrl="https://www.youtube.com/embed/B1yhB68JirA"
            description="A public education video focused on the evidence around movement, upright positions, birth balls, and labor coping strategies."
          />
        </div>
      </div>
    </section>
  );
}
