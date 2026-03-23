import styles from '../site.module.css';
import { references } from '../data';

type CitationProps = {
  ids: readonly (keyof typeof references)[];
};

export function Citation({ ids }: CitationProps) {
  return (
    <sup className={styles.citationGroup} aria-label="Citations">
      {ids.map((id) => (
        <a key={id} href={`#ref-${id}`} className={styles.citationLink}>
          [{references[id].number}]
        </a>
      ))}
    </sup>
  );
}
