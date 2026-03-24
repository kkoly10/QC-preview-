import styles from '../site.module.css';

type MediaEmbedProps = {
  title: string;
  sourceLabel: string;
  embedUrl: string;
  description: string;
};

export function MediaEmbed({ title, sourceLabel, embedUrl, description }: MediaEmbedProps) {
  return (
    <article className={styles.mediaCard}>
      <p className={styles.eyebrow}>{sourceLabel}</p>
      <h2 className={styles.h2}>{title}</h2>
      <iframe
        className={styles.mediaFrame}
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <p className={styles.p}>{description}</p>
    </article>
  );
}
