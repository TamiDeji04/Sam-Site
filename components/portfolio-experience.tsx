'use client';

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image, { type StaticImageData } from 'next/image';
import type { SiteConfig } from '@/lib/site-config';
import styles from './portfolio-experience.module.css';

type Orientation = 'portrait' | 'landscape' | 'square';

export type PortfolioImage = {
  id: string;
  src: StaticImageData;
  alt: string;
  featured: boolean;
  orientation: Orientation;
  label?: string;
};

type PortfolioExperienceProps = {
  images: PortfolioImage[];
  siteConfig: SiteConfig;
};

const galleryPanelId = 'gallery-panel';
const galleryCategoryOrder = [
  'Studio',
  'Beauty',
  'Editorial',
  'Portrait',
  'Street',
  'Celebration',
  'Monochrome',
  'Landscape',
] as const;

export function PortfolioExperience({
  images,
  siteConfig,
}: PortfolioExperienceProps) {
  const galleryExitDurationMs = 150;
  const galleryEnterDurationMs = 220;
  const mainId = useId().replace(/:/g, '');
  const galleryStatusId = useId();
  const selectedCategoryHeadingId = useId().replace(/:/g, '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [galleryTransitionState, setGalleryTransitionState] = useState<
    'idle' | 'exiting' | 'entering'
  >('idle');
  const [activePreviewCategory, setActivePreviewCategory] = useState<string | null>(null);
  const [activePreviewFrame, setActivePreviewFrame] = useState(0);
  const [lightboxState, setLightboxState] = useState<{
    index: number;
    items: PortfolioImage[];
  } | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const galleryTransitionTimeoutRef = useRef<number | null>(null);
  const previewIntervalRef = useRef<number | null>(null);
  const activePreviewCategoryRef = useRef<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxFrameRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const heroImage =
    images.find((image) => image.id === siteConfig.heroImageId) ?? images[0];
  const isLightboxOpen = lightboxState !== null;
  const instagramUrl = siteConfig.instagramUrl;

  const galleryCategories = useMemo(() => {
    const categoryMap = new Map<string, PortfolioImage[]>();

    images.forEach((image) => {
      if (!image.label) {
        return;
      }

      const existingImages = categoryMap.get(image.label);

      if (existingImages) {
        existingImages.push(image);
      } else {
        categoryMap.set(image.label, [image]);
      }
    });

    const orderedLabels = [
      ...galleryCategoryOrder.filter((label) => categoryMap.has(label)),
      ...Array.from(categoryMap.keys()).filter(
        (label) => !galleryCategoryOrder.includes(label as (typeof galleryCategoryOrder)[number]),
      ),
    ];

    return orderedLabels.map((label) => {
      const items = categoryMap.get(label) ?? [];

      return {
        coverImage: items[0],
        count: items.length,
        items,
        label,
      };
    });
  }, [images]);

  const selectedCategoryData =
    selectedCategory === null
      ? null
      : galleryCategories.find((category) => category.label === selectedCategory) ?? null;

  const categoryImages = selectedCategoryData?.items ?? [];
  const isGalleryTransitioning = galleryTransitionState !== 'idle';

  const clearGalleryTransitionTimer = () => {
    if (galleryTransitionTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(galleryTransitionTimeoutRef.current);
    galleryTransitionTimeoutRef.current = null;
  };

  const clearCategoryPreviewTimer = () => {
    if (previewIntervalRef.current === null) {
      return;
    }

    window.clearInterval(previewIntervalRef.current);
    previewIntervalRef.current = null;
  };

  const resetCategoryPreview = () => {
    clearCategoryPreviewTimer();
    activePreviewCategoryRef.current = null;
    setActivePreviewCategory(null);
    setActivePreviewFrame(0);
  };

  const transitionGalleryView = (nextCategory: string | null) => {
    if (isGalleryTransitioning) {
      return;
    }

    resetCategoryPreview();
    clearGalleryTransitionTimer();
    setGalleryTransitionState('exiting');

    galleryTransitionTimeoutRef.current = window.setTimeout(() => {
      setSelectedCategory(nextCategory);
      setGalleryTransitionState('entering');

      galleryTransitionTimeoutRef.current = window.setTimeout(() => {
        setGalleryTransitionState('idle');
        galleryTransitionTimeoutRef.current = null;
      }, galleryEnterDurationMs);
    }, galleryExitDurationMs);
  };

  const openCategory = (label: string) => {
    transitionGalleryView(label);
  };

  const closeCategoryView = () => {
    transitionGalleryView(null);
  };

  const startCategoryPreview = (label: string, frameCount: number) => {
    if (frameCount < 2 || isGalleryTransitioning) {
      return;
    }

    if (activePreviewCategoryRef.current === label) {
      return;
    }

    clearCategoryPreviewTimer();
    activePreviewCategoryRef.current = label;
    setActivePreviewCategory(label);
    setActivePreviewFrame(0);

    previewIntervalRef.current = window.setInterval(() => {
      setActivePreviewFrame((current) => (current + 1) % frameCount);
    }, 2000);
  };

  const stopCategoryPreview = (label: string) => {
    if (activePreviewCategoryRef.current !== label) {
      return;
    }

    resetCategoryPreview();
  };

  const openLightbox = (items: PortfolioImage[], index: number) => {
    setLightboxState({
      items,
      index,
    });
  };

  const closeLightbox = () => {
    setLightboxState(null);
  };

  const goToPreviousImage = () => {
    setLightboxState((current) =>
      current
        ? {
            ...current,
            index: (current.index - 1 + current.items.length) % current.items.length,
          }
        : current,
    );
  };

  const goToNextImage = () => {
    setLightboxState((current) =>
      current
        ? {
            ...current,
            index: (current.index + 1) % current.items.length,
          }
        : current,
    );
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const resetScrollPosition = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    };

    resetScrollPosition();
    window.addEventListener('pageshow', resetScrollPosition);

    return () => {
      window.removeEventListener('pageshow', resetScrollPosition);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(
    () => () => {
      clearGalleryTransitionTimer();
      clearCategoryPreviewTimer();
    },
    [],
  );

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxState(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setLightboxState((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % current.items.length,
              }
            : current,
        );
        return;
      }

      if (event.key === 'ArrowLeft') {
        setLightboxState((current) =>
          current
            ? {
                ...current,
                index: (current.index - 1 + current.items.length) % current.items.length,
              }
            : current,
        );
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = lightboxFrameRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);

      const lastFocusedElement = lastFocusedElementRef.current;

      if (lastFocusedElement) {
        window.requestAnimationFrame(() => {
          lastFocusedElement.focus();
        });
      }

      lastFocusedElementRef.current = null;
    };
  }, [isLightboxOpen]);

  const lightboxIndex =
    lightboxState === null || lightboxState.items.length === 0
      ? 0
      : lightboxState.index % lightboxState.items.length;
  const lightboxImage =
    lightboxState === null ? null : lightboxState.items[lightboxIndex];
  const lightboxCount = lightboxState?.items.length ?? 0;

  return (
    <>
      <a className={styles.skipLink} href={`#${mainId}`}>
        Skip to content
      </a>
      <main className={styles.pageShell} id={mainId} tabIndex={-1}>
        <header className={styles.header}>
          <a className={styles.wordmark} href="#top">
            {siteConfig.businessName}
          </a>
          <nav aria-label="Primary navigation" className={styles.nav}>
            <a href="#gallery">Gallery</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section aria-labelledby="hero-heading" className={styles.hero} id="top">
          <div className={styles.heroBackdrop}>
            <Image
              fill
              priority
              alt={heroImage.alt}
              className={styles.heroImage}
              sizes="100vw"
              src={heroImage.src}
            />
          </div>
          <div className={styles.heroGradient} />
          <div className={styles.heroContent}>
            <h1 id="hero-heading">{siteConfig.heroHeadline}</h1>
            <p className={styles.heroSupporting}>{siteConfig.heroSupporting}</p>
            <p className={styles.heroIdentity}>{siteConfig.heroIdentity}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#gallery">
                View gallery
              </a>
              <a className={styles.secondaryButton} href="#contact">
                Email Samuel
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="gallery-heading"
          className={styles.section}
          id="gallery"
        >
          <div className={styles.galleryHeader}>
            <div className={styles.sectionIntro}>
              <h2 id="gallery-heading">Gallery</h2>
              <p>{siteConfig.galleryIntro}</p>
            </div>
          </div>

          <div
            aria-busy={isGalleryTransitioning}
            className={[
              styles.galleryStage,
              galleryTransitionState === 'entering' ? styles.galleryStageEntering : '',
              galleryTransitionState === 'exiting' ? styles.galleryStageExiting : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {selectedCategoryData ? (
              <>
              <div className={styles.selectedCategoryHeader}>
                <button
                  className={styles.backButton}
                  disabled={isGalleryTransitioning}
                  onClick={closeCategoryView}
                  type="button"
                >
                  Back to categories
                </button>
                <div className={styles.selectedCategoryCopy}>
                  <h3 id={selectedCategoryHeadingId}>{selectedCategoryData.label}</h3>
                  <p>
                    {selectedCategoryData.count} photo
                    {selectedCategoryData.count === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              <div
                aria-describedby={galleryStatusId}
                aria-labelledby={selectedCategoryHeadingId}
                className={styles.photoGrid}
                id={galleryPanelId}
                role="region"
              >
                {categoryImages.map((image, index) => (
                  <button
                    aria-label={`Open ${image.alt}`}
                    className={styles.masonryCard}
                    disabled={isGalleryTransitioning}
                    key={image.id}
                    onClick={() => openLightbox(categoryImages, index)}
                    type="button"
                  >
                    <span className={styles.imageBadge}>{image.label ?? 'Portfolio'}</span>
                    <span className={styles.masonryImageWrap}>
                      <Image
                        alt={image.alt}
                        className={styles.masonryImage}
                        loading={index < 6 ? 'eager' : 'lazy'}
                        sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 28vw"
                        src={image.src}
                      />
                    </span>
                  </button>
                ))}
              </div>
              </>
            ) : (
              <div
              aria-describedby={galleryStatusId}
              aria-labelledby="gallery-heading"
              className={styles.categoryGrid}
              id={galleryPanelId}
              role="region"
            >
                {galleryCategories.map((category, index) =>
                  category.coverImage ? (
                    <button
                      aria-label={`Open ${category.label}, ${category.count} photo${
                        category.count === 1 ? '' : 's'
                      }`}
                      className={styles.categoryCard}
                      disabled={isGalleryTransitioning}
                      key={category.label}
                      onBlur={() => stopCategoryPreview(category.label)}
                      onFocus={() =>
                        startCategoryPreview(
                          category.label,
                          Math.min(category.items.length, 3),
                        )
                      }
                      onMouseEnter={() =>
                        startCategoryPreview(
                          category.label,
                          Math.min(category.items.length, 3),
                        )
                      }
                      onMouseLeave={() => stopCategoryPreview(category.label)}
                      onClick={() => openCategory(category.label)}
                      type="button"
                    >
                      <span className={styles.categoryImageWrap}>
                        {category.items.slice(0, 3).map((image, previewIndex) => {
                          const isVisible =
                            activePreviewCategory === category.label
                              ? activePreviewFrame === previewIndex
                              : previewIndex === 0;

                          return (
                            <span className={styles.categoryImageLayer} key={image.id}>
                              <Image
                                fill
                                alt={image.alt}
                                className={[
                                  styles.categoryImage,
                                  isVisible ? styles.categoryImageVisible : '',
                                ]
                                  .filter(Boolean)
                                  .join(' ')}
                                loading={
                                  index < 4 && previewIndex === 0 ? 'eager' : 'lazy'
                                }
                                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 28vw"
                                src={image.src}
                              />
                            </span>
                          );
                        })}
                      </span>
                      <span className={styles.categoryMeta}>
                        <span className={styles.categoryName}>{category.label}</span>
                        <span className={styles.categoryCount}>
                          {category.count} photo{category.count === 1 ? '' : 's'}
                        </span>
                      </span>
                    </button>
                  ) : null,
                )}
              </div>
            )}
          </div>
          <p
            aria-live="polite"
            className={styles.srOnly}
            id={galleryStatusId}
            role="status"
          >
            {selectedCategoryData
              ? `Showing ${selectedCategoryData.count} image${
                  selectedCategoryData.count === 1 ? '' : 's'
                } in ${selectedCategoryData.label}.`
              : `Showing ${galleryCategories.length} categories. Select a category to view the photos.`}
          </p>
        </section>

        <section aria-labelledby="services-heading" className={styles.section} id="services">
          <div className={styles.sectionIntro}>
            <h2 id="services-heading">{siteConfig.servicesHeading}</h2>
            <p>{siteConfig.servicesIntro}</p>
          </div>
          <div className={styles.serviceGrid}>
            {siteConfig.services.map((service) => (
              <article className={styles.serviceCard} key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
          <div className={styles.processGrid}>
            {siteConfig.process.map((step) => (
              <article className={styles.processCard} key={step.step}>
                <p className={styles.processStep}>{step.step}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-heading" className={styles.section} id="about">
          <div className={styles.aboutCard}>
            <div className={styles.sectionIntro}>
              <h2 id="about-heading">{siteConfig.aboutHeading}</h2>
            </div>
            <div className={styles.aboutCopy}>
              <p>{siteConfig.aboutBody}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-heading" className={styles.section} id="contact">
          <div className={styles.contactPanel}>
            <div>
              <h2 id="contact-heading">{siteConfig.contactHeading}</h2>
              <p className={styles.contactCopy}>{siteConfig.contactCopy}</p>
            </div>
            <div className={styles.contactLinks}>
              <a className={styles.primaryButton} href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              {instagramUrl ? (
                <a
                  className={styles.secondaryButton}
                  href={instagramUrl}
                  rel="me noreferrer"
                  target="_blank"
                >
                  {siteConfig.instagramLabel}
                </a>
              ) : (
                <span className={styles.secondaryBadge}>{siteConfig.instagramLabel}</span>
              )}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>{siteConfig.businessName}</p>
          <p>{new Date().getFullYear()} Photography by {siteConfig.fullName}</p>
        </footer>

        {lightboxImage ? (
          <div
            aria-label="Image lightbox"
            aria-modal="true"
            className={styles.lightbox}
            onClick={closeLightbox}
            role="dialog"
          >
            <div
              className={styles.lightboxFrame}
              onClick={(event) => event.stopPropagation()}
              onTouchEnd={(event) => {
                if (touchStartX === null) {
                  return;
                }

                const delta = event.changedTouches[0].clientX - touchStartX;

                if (delta > 40) {
                  goToPreviousImage();
                }

                if (delta < -40) {
                  goToNextImage();
                }

                setTouchStartX(null);
              }}
              onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
              ref={lightboxFrameRef}
            >
              <button
                aria-label="Close lightbox"
                className={styles.closeButton}
                onClick={closeLightbox}
                ref={closeButtonRef}
                type="button"
              >
                Close
              </button>
              <button
                aria-label="Previous image"
                className={styles.navButtonLeft}
                onClick={goToPreviousImage}
                type="button"
              >
                Prev
              </button>
              <div className={styles.lightboxImageWrap} key={lightboxImage.id}>
                <Image
                  alt={lightboxImage.alt}
                  className={styles.lightboxImage}
                  sizes="100vw"
                  src={lightboxImage.src}
                />
                <div className={styles.lightboxMeta}>
                  <p>{lightboxImage.label ?? 'Portfolio study'}</p>
                  <span>
                    {lightboxIndex + 1} / {lightboxCount}
                  </span>
                </div>
              </div>
              <button
                aria-label="Next image"
                className={styles.navButtonRight}
                onClick={goToNextImage}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}
