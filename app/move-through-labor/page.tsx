import Link from 'next/link';
import { buildReferenceMap, getPublicHomePage, getPublicReferences } from '@/lib/site/cms';
import styles from './site.module.css';
import { Citation } from './_components/Citation';
import { PageIntro } from './_components/PageIntro';
import { ReferenceList } from './_components/ReferenceList';

export default async function HomePage() {
  const [content, references] = await Promise.all([getPublicHomePage(), getPublicReferences()]);
  const referenceMap = buildReferenceMap(references);
  const pageRefs = content.featuredReferenceKeys;

  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroShell}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <p className={styles.heroSubline}>{content.hero.subline}</p>
            <h1 className={styles.displayTitle}>{content.hero.title}</h1>
            <p className={styles.heroLead}>
              {content.hero.lead}
              <Citation ids={pageRefs} referenceMap={referenceMap} />.
            </p>

            <div className={styles.heroActions}>
              <Link href={content.hero.primaryCta.href} className={styles.button}>
                {content.hero.primaryCta.label}
              </Link>
              <Link href={content.hero.secondaryCta.href} className={styles.buttonSecondary}>
                {content.hero.secondaryCta.label}
              </Link>
            </div>

            <div className={styles.heroStats}>
              {content.heroCards.map((card) => (
                <article className={styles.statCard} key={card.label ?? card.title}>
                  <p className={styles.statLabel}>{card.label ?? card.title}</p>
                  <p className={styles.statText}>
                    {card.text}
                    {card.citations?.length ? (
                      <Citation ids={card.citations} referenceMap={referenceMap} />
                    ) : null}
                    .
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.sidePanel}>
              <p className={styles.eyebrow}>{content.heroSidebar.eyebrow}</p>
              <h2 className={styles.h2}>{content.heroSidebar.title}</h2>
              <ul className={styles.sideList}>
                {content.heroSidebar.bullets.map((bullet, index) => (
                  <li key={`${bullet.text}-${index}`}>
                    {bullet.text}
                    {bullet.citations?.length ? (
                      <Citation ids={bullet.citations} referenceMap={referenceMap} />
                    ) : null}
                    .
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.sourcePanel}>
              <p className={styles.sourceLabel}>Current source base</p>
              <div className={styles.sourceGrid}>
                {content.featuredReferenceKeys.map((key) => (
                  <span className={styles.sourceChip} key={key}>
                    {referenceMap[key]?.label ?? key}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <PageIntro
            eyebrow={content.overview.eyebrow}
            title={content.overview.title}
            description={content.overview.description}
            titleAs="h2"
          />

          <div className={styles.featureGrid}>
            {content.overview.cards.map((card, index) => (
              <article
                className={`${styles.card}${index === 0 ? ` ${styles.featureCardWide}` : ''}`}
                key={`${card.title}-${index}`}
              >
                {card.eyebrow ? <p className={styles.cardEyebrow}>{card.eyebrow}</p> : null}
                <h3 className={styles.h3}>{card.title}</h3>
                <p className={styles.p}>
                  {card.text}
                  {card.citations?.length ? (
                    <Citation ids={card.citations} referenceMap={referenceMap} />
                  ) : null}
                  .
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={`${styles.container} ${styles.argumentLayout}`}>
          <div>
            <PageIntro
              eyebrow={content.takeaways.eyebrow}
              title={content.takeaways.title}
              description={content.takeaways.description}
              titleAs="h2"
            />

            <div className={styles.takeawayStack}>
              {content.takeaways.cards.map((card, index) => (
                <div className={styles.takeawayCard} key={`${card.title}-${index}`}>
                  <strong>{card.title}</strong>
                  <p className={styles.p}>
                    {card.text}
                    {card.citations?.length ? (
                      <Citation ids={card.citations} referenceMap={referenceMap} />
                    ) : null}
                    .
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.audienceCard}>
            <p className={styles.eyebrow}>{content.audienceBox.eyebrow}</p>
            <h2 className={styles.h2}>{content.audienceBox.title}</h2>
            <p className={styles.p}>{content.audienceBox.body1}</p>
            <p className={styles.p}>{content.audienceBox.body2}</p>
            <Link href={content.audienceBox.cta.href} className={styles.textLink}>
              {content.audienceBox.cta.label} →
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <ReferenceList ids={pageRefs} title="References used on this page" referenceMap={referenceMap} />
        </div>
      </section>
    </>
  );
}
