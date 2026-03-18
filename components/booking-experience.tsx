import Link from 'next/link';
import type { SiteConfig } from '@/lib/site-config';
import styles from './booking-experience.module.css';

type BookingExperienceProps = {
  siteConfig: SiteConfig;
};

export function BookingExperience({ siteConfig }: BookingExperienceProps) {
  const { booking } = siteConfig;
  const hasUnavailablePackages = booking.sections.some((section) =>
    section.packages.some((pkg) => !pkg.honeyBookUrl),
  );
  const showFallbackPanel = hasUnavailablePackages || !booking.customInquiry.honeyBookUrl;

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
            <a href="#studio">Studio</a>
            <a href="#outdoor">Outdoor</a>
            <a href={`#${booking.customInquiry.id}`}>Custom</a>
          </nav>
        </header>

        <section className={styles.hero} id="top">
          <div className={styles.heroCard}>
            <p className={styles.heroLabel}>Online Booking</p>
            <h1>{booking.pageTitle}</h1>
            <p className={styles.heroIntro}>{booking.intro}</p>
            <p className={styles.heroSupporting}>{booking.supporting}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#studio">
                View studio sessions
              </a>
              <a
                className={styles.secondaryButton}
                href={`mailto:${siteConfig.email}`}
              >
                Email Samuel
              </a>
            </div>
          </div>

          {showFallbackPanel ? (
            <aside className={styles.noticeCard}>
              <p className={styles.noticeLabel}>Availability note</p>
              <p className={styles.noticeCopy}>{booking.fallbackCopy}</p>
              <a
                className={styles.secondaryButton}
                href={`mailto:${siteConfig.email}`}
              >
                {booking.fallbackButtonLabel}
              </a>
            </aside>
          ) : null}
        </section>

        {booking.sections.map((section) => {
          const sectionHasUnavailablePackages = section.packages.some(
            (pkg) => !pkg.honeyBookUrl,
          );

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

              <div className={styles.packageGrid}>
                {section.packages.map((pkg) => (
                  <article className={styles.packageCard} key={`${section.id}-${pkg.title}`}>
                    <div className={styles.packageHeader}>
                      <p className={styles.packageDuration}>{pkg.duration}</p>
                      <h3>{pkg.title}</h3>
                      <p className={styles.packagePrice}>{pkg.price}</p>
                    </div>

                    <div className={styles.depositPanel}>
                      <p className={styles.depositLabel}>Deposit due today</p>
                      <p className={styles.depositValue}>{pkg.depositDue}</p>
                    </div>

                    <ul className={styles.featureList}>
                      {pkg.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <div className={styles.cardActions}>
                      {pkg.honeyBookUrl ? (
                        <a
                          className={styles.primaryButton}
                          href={pkg.honeyBookUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {booking.packageButtonLabel}
                        </a>
                      ) : (
                        <button
                          className={styles.disabledButton}
                          disabled
                          type="button"
                        >
                          {booking.unavailableLabel}
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {sectionHasUnavailablePackages ? (
                <p className={styles.sectionNote}>{booking.fallbackCopy}</p>
              ) : null}
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
              {booking.customInquiry.honeyBookUrl ? (
                <a
                  className={styles.primaryButton}
                  href={booking.customInquiry.honeyBookUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {booking.customInquiry.buttonLabel}
                </a>
              ) : (
                <button
                  className={styles.disabledButton}
                  disabled
                  type="button"
                >
                  {booking.unavailableLabel}
                </button>
              )}
              <a
                className={styles.secondaryButton}
                href={`mailto:${siteConfig.email}`}
              >
                Email Samuel
              </a>
            </div>

            {!booking.customInquiry.honeyBookUrl ? (
              <p className={styles.sectionNote}>{booking.customInquiry.fallbackCopy}</p>
            ) : null}
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
