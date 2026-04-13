import Link from 'next/link';
import type { BookingSection, SiteConfig } from '@/lib/site-config';
import styles from './booking-experience.module.css';

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

type BookingExperienceProps = {
  siteConfig: SiteConfig;
};

export function BookingExperience({ siteConfig }: BookingExperienceProps) {
  const { booking } = siteConfig;
  const firstBookableSection = booking.sections.find((section) => section.mode !== 'reference');
  const getSectionActionLabel = (section: BookingSection) =>
    section.mode === 'inquiry'
      ? section.actionLabel ?? booking.customInquiry.buttonLabel
      : booking.packageButtonLabel;

  return (
    <>
      <a className={styles.skipLink} href="#book-main">
        Skip to content
      </a>
      <main className={styles.pageShell} id="book-main" tabIndex={-1}>
        <header className={styles.header}>
          <Link className={styles.wordmark} href="/">
            {siteConfig.businessName}
          </Link>
          <nav aria-label="Booking navigation" className={styles.nav}>
            <Link href="/">Home</Link>
            {booking.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.label}
              </a>
            ))}
            <a href={`#${booking.customInquiry.id}`}>{booking.customInquiry.label}</a>
          </nav>
        </header>

        <section className={styles.hero} id="top">
          <div className={styles.heroCard}>
            <p className={styles.heroLabel}>Online Booking</p>
            <h1>{booking.pageTitle}</h1>
            <p className={styles.heroIntro}>{booking.intro}</p>
            <p className={styles.heroSupporting}>{booking.supporting}</p>
            <div className={styles.heroActions}>
              {firstBookableSection ? (
                <a className={styles.primaryButton} href={`#${firstBookableSection.id}`}>
                  View packages
                </a>
              ) : null}
              <a
                className={styles.secondaryButton}
                href={`mailto:${siteConfig.email}`}
              >
                Email Samuel
              </a>
            </div>
          </div>

        </section>

        {booking.sections.map((section) => {
          const packages = section.packages ?? [];
          const sectionActionLabel = getSectionActionLabel(section);

          return (
            <section
              aria-labelledby={`${section.id}-heading`}
              className={styles.section}
              id={section.id}
              key={section.id}
            >
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>{section.label}</p>
                <h2 id={`${section.id}-heading`}>{section.heading}</h2>
                <p>{section.intro}</p>
              </div>

              {section.mode === 'reference' ? (
                <article className={styles.referenceCard}>
                  {section.note ? <p className={styles.referenceCopy}>{section.note}</p> : null}
                  {section.referenceHref && section.referenceLabel ? (
                    <a className={styles.secondaryButton} href={section.referenceHref}>
                      {section.referenceLabel}
                    </a>
                  ) : null}
                </article>
              ) : (
                <div className={styles.packageGrid}>
                  {packages.map((pkg) => (
                    <article className={styles.packageCard} key={`${section.id}-${pkg.title}`}>
                      <div className={styles.packageHeader}>
                        {pkg.duration ? (
                          <p className={styles.packageDuration}>{pkg.duration}</p>
                        ) : null}
                        <h3>{pkg.title}</h3>
                        <p className={styles.packagePrice}>{pkg.price}</p>
                      </div>

                      {pkg.depositDue ? (
                        <div className={styles.depositPanel}>
                          <p className={styles.depositLabel}>Non-refundable deposit</p>
                          <p className={styles.depositValue}>{pkg.depositDue}</p>
                        </div>
                      ) : null}

                      <ul className={styles.featureList}>
                        {pkg.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>

                      <div className={styles.cardActions}>
                        <Link
                          className={styles.primaryButton}
                          href={`/book/${section.id}/${toSlug(pkg.title)}`}
                        >
                          {sectionActionLabel}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <section aria-labelledby="policies-heading" className={styles.section}>
          <div className={styles.policiesCard}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Good to know</p>
              <h2 id="policies-heading">{booking.policiesHeading}</h2>
            </div>
            <ul className={styles.policyGrid}>
              {booking.policies.map((policy) => (
                <li className={styles.policyPill} key={policy}>
                  {policy}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby={`${booking.customInquiry.id}-heading`}
          className={styles.section}
          id={booking.customInquiry.id}
        >
          <div className={styles.customCard}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>{booking.customInquiry.label}</p>
              <h2 id={`${booking.customInquiry.id}-heading`}>
                {booking.customInquiry.heading}
              </h2>
              <p>{booking.customInquiry.body}</p>
            </div>

            <div className={styles.customActions}>
              <a
                className={styles.primaryButton}
                href={`mailto:${siteConfig.email}`}
              >
                {booking.customInquiry.buttonLabel}
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>{siteConfig.businessName}</p>
          <p>{new Date().getFullYear()} Photography by {siteConfig.fullName}</p>
        </footer>
      </main>
    </>
  );
}
