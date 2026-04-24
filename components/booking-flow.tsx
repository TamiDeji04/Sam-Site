'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { BookingPackage, PaymentMethod } from '@/lib/site-config';
import styles from './booking-flow.module.css';

type BookingFlowProps = {
  sectionLabel: string;
  sectionId: string;
  pkg: BookingPackage;
  paymentMethods: PaymentMethod[];
  calendarEmbedUrl: string;
  depositNote: string;
  email: string;
  businessName: string;
  policies: string[];
};

const isPlaceholder = (url: string) =>
  !url || url.startsWith('PLACEHOLDER');

export function BookingFlow({
  sectionLabel,
  sectionId,
  pkg,
  paymentMethods,
  calendarEmbedUrl,
  depositNote,
  email,
  businessName,
  policies,
}: BookingFlowProps) {
  const [timeSelected, setTimeSelected] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const paymentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.data === 'object' && e.data?.event === 'calendly.event_scheduled') {
        setTimeSelected(true);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const scrollToPayment = useCallback(() => {
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (timeSelected) scrollToPayment();
  }, [timeSelected, scrollToPayment]);

  const chosenMethod = paymentMethods.find((m) => m.id === selectedPayment);
  const canConfirm = timeSelected && selectedPayment;

  function handleConfirm() {
    setConfirmed(true);
    const subject = encodeURIComponent(
      `Booking Confirmation: ${sectionLabel} ${pkg.title}`,
    );
    const body = encodeURIComponent(
      `Hi Samuel,\n\nI've scheduled my ${sectionLabel} ${pkg.title} (${pkg.price}) session and sent the deposit${pkg.depositDue ? ` of ${pkg.depositDue}` : ''} via ${chosenMethod?.label}.\n\nPlease confirm my appointment.\n\nThank you!`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <main className={styles.shell}>
      <header className={styles.topBar}>
        <Link className={styles.backLink} href={`/book#${sectionId}`}>
          &larr; Back to packages
        </Link>
        <span className={styles.wordmark}>{businessName}</span>
      </header>

      <section className={styles.summaryCard}>
        <p className={styles.label}>{sectionLabel}</p>
        <h1 className={styles.packageTitle}>{pkg.title}</h1>
        <p className={styles.price}>{pkg.price}</p>
        {pkg.depositDue ? (
          <div className={styles.depositBadge}>
            <span className={styles.depositLabel}>Non-refundable deposit</span>
            <span className={styles.depositValue}>{pkg.depositDue}</span>
          </div>
        ) : null}
        <ul className={styles.features}>
          {pkg.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {/* Step 1 */}
      <section className={styles.stepSection}>
        <div className={styles.stepHeader}>
          <span className={styles.stepNumber}>1</span>
          <div>
            <h2 className={styles.stepTitle}>Pick a date &amp; time</h2>
            <p className={styles.stepDesc}>
              {isPlaceholder(calendarEmbedUrl)
                ? 'Calendar scheduling is being set up. Check back soon or email to book.'
                : 'Choose an available slot below.'}
            </p>
          </div>
        </div>

        {isPlaceholder(calendarEmbedUrl) ? (
          <div className={styles.calendarPlaceholder}>
            <p>Scheduling calendar coming soon</p>
            <a className={styles.secondaryButton} href={`mailto:${email}`}>
              Email to schedule
            </a>
            <button
              className={styles.textButton}
              onClick={() => setTimeSelected(true)}
              type="button"
            >
              I&rsquo;ve already scheduled via email &mdash; continue
            </button>
          </div>
        ) : (
          <>
            <iframe
              className={styles.calendarEmbed}
              src={calendarEmbedUrl}
              title="Schedule your session"
            />
            <button
              className={styles.textButton}
              onClick={() => setTimeSelected(true)}
              type="button"
            >
              I&rsquo;ve already scheduled &mdash; continue
            </button>
          </>
        )}

        {timeSelected ? (
          <p className={styles.stepDone}>Time selected</p>
        ) : null}
      </section>

      {/* Step 2 */}
      <section
        ref={paymentRef}
        className={`${styles.stepSection} ${!timeSelected ? styles.locked : ''}`}
        aria-disabled={!timeSelected}
      >
        <div className={styles.stepHeader}>
          <span className={styles.stepNumber}>2</span>
          <div>
            <h2 className={styles.stepTitle}>Choose payment method</h2>
            <p className={styles.stepDesc}>
              {pkg.depositDue
                ? `Select how you'd like to send the ${pkg.depositDue} deposit.`
                : 'Select how you\'d like to pay.'}
            </p>
          </div>
        </div>

        <div className={styles.paymentGrid}>
          {paymentMethods.map((method) => {
            const isActive = selectedPayment === method.id;
            return (
              <button
                key={method.id}
                className={`${styles.paymentCard} ${isActive ? styles.paymentCardActive : ''}`}
                disabled={!timeSelected}
                onClick={() => setSelectedPayment(method.id)}
                type="button"
              >
                <span className={styles.paymentLabel}>{method.label}</span>
              </button>
            );
          })}
        </div>

        {chosenMethod ? (
          <div className={styles.paymentDetail}>
            <p className={styles.paymentDetailLabel}>
              Send {pkg.depositDue ?? pkg.price} to:
            </p>
            <p className={styles.paymentHandle}>
              {isPlaceholder(chosenMethod.handle)
                ? `${chosenMethod.label} info coming soon`
                : chosenMethod.handle}
            </p>
            <p className={styles.depositNote}>{depositNote}</p>
          </div>
        ) : null}
      </section>

      {/* Step 3 */}
      <section className={styles.confirmSection}>
        {confirmed ? (
          <div className={styles.confirmedCard}>
            <h2 className={styles.stepTitle}>Booking submitted</h2>
            <p className={styles.stepDesc}>
              Your confirmation email should be opening now. We will follow
              up once the deposit is received.
            </p>
            <Link className={styles.secondaryButton} href="/book">
              Back to packages
            </Link>
          </div>
        ) : (
          <button
            className={styles.confirmButton}
            disabled={!canConfirm}
            onClick={handleConfirm}
            type="button"
          >
            Confirm Booking
          </button>
        )}
      </section>

      <section className={styles.policiesSection}>
        <h3 className={styles.policiesHeading}>Booking policies</h3>
        <ul className={styles.policyList}>
          {policies.map((p) => (
            <li key={p} className={styles.policyPill}>{p}</li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>{businessName}</p>
        <p>{new Date().getFullYear()} Photography by Samuel Oluwasanmi</p>
      </footer>
    </main>
  );
}
