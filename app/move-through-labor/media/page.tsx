import styles from '../site.module.css';
import { MediaEmbed } from '../_components/MediaEmbed';
import { PageIntro } from '../_components/PageIntro';

export default function MediaPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PageIntro
          eyebrow="Media"
          title="Videos that support movement and positioning education"
          description="These embedded videos match the media items selected for this project and provide public-facing demonstrations of labor movement and positioning."
        />

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
