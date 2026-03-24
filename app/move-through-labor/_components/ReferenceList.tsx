import { defaultReferenceMap } from '@/lib/site/defaults';
import type { ReferenceMap } from '@/lib/site/types';
import styles from '../site.module.css';

type ReferenceListProps = {
  ids: readonly string[];
  title: string;
  referenceMap?: ReferenceMap;
};

export function ReferenceList({ ids, title, referenceMap }: ReferenceListProps) {
  const activeMap = referenceMap ?? defaultReferenceMap;

  return (
    <section className={styles.referencePanel}>
      <h2 className={styles.h2}>{title}</h2>
      <ol>
        {ids.map((id) => {
          const reference = activeMap[id];

          if (!reference) {
            return null;
          }

          return (
            <li id={`ref-${id}`} key={id}>
              <strong>[{reference.number}] {reference.label}</strong>
              <p>{reference.citation}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
