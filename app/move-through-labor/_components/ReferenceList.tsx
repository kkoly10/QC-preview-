import styles from '../site.module.css';
import { references } from '../data';

type ReferenceId = keyof typeof references;

type ReferenceListProps = {
  ids: readonly ReferenceId[];
  title: string;
};

export function ReferenceList({ ids, title }: ReferenceListProps) {
  return (
    <section className={styles.referencePanel}>
      <h2 className={styles.h2}>{title}</h2>
      <ol>
        {ids.map((id) => {
          const reference = references[id];
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
