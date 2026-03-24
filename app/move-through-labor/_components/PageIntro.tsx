import styles from '../site.module.css';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  titleAs?: 'h1' | 'h2';
};

export function PageIntro({ eyebrow, title, description, titleAs = 'h1' }: PageIntroProps) {
  const TitleTag = titleAs;

  return (
    <div className={styles.sectionIntro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <TitleTag className={titleAs === 'h1' ? styles.h1 : styles.h2}>{title}</TitleTag>
      <p className={styles.sectionIntroText}>{description}</p>
    </div>
  );
}
