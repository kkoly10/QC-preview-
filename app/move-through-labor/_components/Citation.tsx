import { defaultReferenceMap } from '@/lib/site/defaults';
import type { ReferenceMap } from '@/lib/site/types';
import styles from '../site.module.css';

type CitationProps = {
  ids: readonly string[];
  referenceMap?: ReferenceMap;
};

export function Citation({ ids, referenceMap }: CitationProps) {
  const activeMap = referenceMap ?? defaultReferenceMap;

  return (
    <sup className={styles.citationGroup} aria-label="Citations">
      {ids.map((id) => {
        const reference = activeMap[id];

        if (!reference) {
          return null;
        }

        return (
          <a key={id} href={`#ref-${id}`} className={styles.citationLink}>
            [{reference.number}]
          </a>
        );
      })}
    </sup>
  );
}
