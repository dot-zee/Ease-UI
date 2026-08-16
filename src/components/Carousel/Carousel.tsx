import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

/* ============================================================
   TYPES
   ============================================================ */

type CarouselProps = {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
};

/* ============================================================
   CAROUSEL COMPONENT
   ============================================================ */

export function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  loop = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = children.length;

  const nextSlide = () => {
    setCurrentIndex((current) => {
      if (current >= totalSlides - 1) {
        return loop ? 0 : current;
      }

      return current + 1;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((current) => {
      if (current <= 0) {
        return loop ? totalSlides - 1 : current;
      }

      return current - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((current) => {
        if (current >= totalSlides - 1) {
          return loop ? 0 : current;
        }

        return current + 1;
      });
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlay, interval, loop, totalSlides]);

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {children.map((child, index) => (
            <div className="carousel-slide" key={index}>
              {child}
            </div>
          ))}
        </div>

        {showArrows && totalSlides > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              onClick={previousSlide}
              disabled={!loop && currentIndex === 0}
              aria-label="Previous slide"
            >
              ‹
            </button>

            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              onClick={nextSlide}
              disabled={!loop && currentIndex === totalSlides - 1}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && totalSlides > 1 && (
        <div className="carousel-dots">
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-dot ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   REUSABLE DEMO CARD
   ============================================================ */

function CarouselDemo({
  title,
  description,
  children,
  code,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <div
      className="carousel-demo"
      style={{
        backgroundColor: isDark ? "#18181b" : "#e5e7eb",
        borderColor: isDark ? "#3f3f46" : "#dfe3e8",
      }}
    >
      <div
        className="carousel-demo-header"
        style={{
          backgroundColor: isDark ? "#27272a" : "#f8fafc",
          borderColor: isDark ? "#3f3f46" : "#e5e7eb",
        }}
      >
        <div>
          <span
            className="carousel-demo-title"
            style={{ color: isDark ? "#e4e4e7" : "#334155" }}
          >
            {title}
          </span>

          {description && (
            <span
              className="carousel-demo-description"
              style={{ color: isDark ? "#a1a1aa" : "#64748b" }}
            >
              {description}
            </span>
          )}
        </div>

        <button
          type="button"
          className="carousel-view-code"
          onClick={() => setShowCode((value) => !value)}
          aria-expanded={showCode}
          style={{
            backgroundColor: isDark ? "#3f3f46" : "#f1f3f5",
            color: isDark ? "#e4e4e7" : "#374151",
          }}
        >
          <span className="carousel-code-icon">{"<>"}</span>

          {showCode ? "Hide Code" : "View Code"}
        </button>
      </div>

      {!showCode ? (
        <div className="carousel-demo-preview">{children}</div>
      ) : (
        <div className="carousel-code">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DEMO SLIDE
   ============================================================ */

function DemoSlide({
  number,
  title,
  description,
  className = "",
}: {
  number: number;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`demo-slide ${className}`}>
      <div className="demo-slide-number">{number}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

/* ============================================================
   IMAGE PLACEHOLDER
   ============================================================ */

function ImageSlide({
  number,
  title,
  className,
}: {
  number: number;
  title: string;
  className: string;
}) {
  return (
    <div className={`image-slide ${className}`}>
      <div className="image-slide-overlay">
        <span>Slide {number}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

/* ============================================================
   CARD
   ============================================================ */

function ProductCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <span>{number}</span>
      </div>

      <div className="product-card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <button type="button">Explore</button>
      </div>
    </div>
  );
}

/* ============================================================
   API ROW
   ============================================================ */

function ApiRow({
  prop,
  type,
  defaultValue,
  description,
}: {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}) {
  return (
    <tr>
      <td>
        <code className="api-prop">{prop}</code>
      </td>

      <td>
        <code>{type}</code>
      </td>

      <td>
        <code>{defaultValue}</code>
      </td>

      <td className="api-description">{description}</td>
    </tr>
  );
}

/* ============================================================
   DOCUMENTATION PAGE
   ============================================================ */

export default function CarouselDocumentation() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <div className="carousel-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        /* ======================================================
           PAGE
           ====================================================== */

        .carousel-page {
          min-height: 100vh;
          background: ${isDark ? "#18181b" : "#ffffff"};
          color: ${isDark ? "#e4e4e7" : "#111827"};
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
        }

        .carousel-main {
          width: min(940px, calc(100% - 48px));
          margin: 0 auto;
          padding: 34px 0 80px;
        }

        .carousel-title {
          margin: 0;
          color: ${isDark ? "#fafafa" : "#050505"};
          font-size: 40px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .carousel-subtitle {
          margin: 12px 0 0;
          color: ${isDark ? "#a1a1aa" : "#4b5563"};
          font-size: 20px;
          line-height: 1.5;
        }

        .carousel-section {
          margin-top: 56px;
        }

        .section-title {
          margin: 0 0 18px;
          color: ${isDark ? "#e4e4e7" : "#111827"};
          font-size: 28px;
          line-height: 1.25;
          font-weight: 500;
        }

        /* ======================================================
           DEMO CARD
           ====================================================== */

        .carousel-demo {
          margin-bottom: 20px;
          border: 1px solid ${isDark ? "#3f3f46" : "#dfe3e8"};
          border-radius: 9px;
          background: ${isDark ? "#18181b" : "#e5e7eb"};
          box-shadow: 0 2px 4px ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"};
          overflow: hidden;
        }

        .carousel-demo:last-child {
          margin-bottom: 0;
        }

        .carousel-demo-header {
          min-height: 49px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 9px 18px;
          background: ${isDark ? "#27272a" : "#f8fafc"};
          border-bottom: 1px solid ${isDark ? "#3f3f46" : "#e5e7eb"};
        }

        .carousel-demo-title {
          display: block;
          color: ${isDark ? "#e4e4e7" : "#334155"};
          font-size: 16px;
        }

        .carousel-demo-description {
          display: block;
          margin-top: 2px;
          color: ${isDark ? "#a1a1aa" : "#64748b"};
          font-size: 12px;
        }

        .carousel-view-code {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 7px 12px;
          border: 0;
          border-radius: 6px;
          background: ${isDark ? "#3f3f46" : "#f1f3f5"};
          color: ${isDark ? "#e4e4e7" : "#374151"};
          font-size: 14px;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .carousel-view-code:hover {
          background: ${isDark ? "#52525b" : "#e5e7eb"};
        }

        .carousel-code-icon {
          font-family: monospace;
          font-size: 15px;
        }

        /* ======================================================
           DEMO PREVIEW
           ====================================================== */

        .carousel-demo-preview {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          background: #e5e7eb;
        }

        /* ======================================================
           CAROUSEL COMPONENT
           ====================================================== */

        .carousel {
          width: 100%;
          max-width: 680px;
        }

        .carousel-viewport {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 12px;
        }

        .carousel-track {
          display: flex;
          width: 100%;
          transition: transform 350ms ease;
        }

        .carousel-slide {
          width: 100%;
          min-width: 100%;
          flex-shrink: 0;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          z-index: 5;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-50%);
          border: 0;
          border-radius: 50%;
          background: rgba(17, 24, 39, 0.8);
          color: #ffffff;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          transition:
            background 150ms ease,
            transform 150ms ease;
        }

        .carousel-arrow:hover:not(:disabled) {
          background: rgba(17, 24, 39, 0.95);
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .carousel-arrow-left {
          left: 12px;
        }

        .carousel-arrow-right {
          right: 12px;
        }

        .carousel-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 14px;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #b7bec8;
          cursor: pointer;
          transition:
            width 150ms ease,
            background 150ms ease;
        }

        .carousel-dot.active {
          width: 22px;
          border-radius: 10px;
          background: #5038f5;
        }

        /* ======================================================
           BASIC SLIDES
           ====================================================== */

        .demo-slide {
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          background: #5038f5;
          color: #ffffff;
          text-align: center;
        }

        .demo-slide:nth-child(2) {
          background: #615cf5;
        }

        .demo-slide:nth-child(3) {
          background: #111827;
        }

        .demo-slide:nth-child(4) {
          background: #059669;
        }

        .demo-slide-number {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          font-size: 15px;
          font-weight: 700;
        }

        .demo-slide h3 {
          margin: 0 0 8px;
          font-size: 21px;
        }

        .demo-slide p {
          max-width: 420px;
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 14px;
          line-height: 1.5;
        }

        /* ======================================================
           IMAGE CAROUSEL
           ====================================================== */

        .image-slide {
          height: 250px;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          overflow: hidden;
        }

        .image-slide::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 30% 30%,
              rgba(255,255,255,0.2),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #4f46e5,
              #7c3aed
            );
        }

        .image-slide:nth-child(2)::before {
          background:
            radial-gradient(
              circle at 70% 20%,
              rgba(255,255,255,0.2),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #0891b2,
              #2563eb
            );
        }

        .image-slide:nth-child(3)::before {
          background:
            radial-gradient(
              circle at 40% 40%,
              rgba(255,255,255,0.2),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #059669,
              #0d9488
            );
        }

        .image-slide-overlay {
          position: relative;
          z-index: 1;
          color: #ffffff;
        }

        .image-slide-overlay span {
          font-size: 12px;
          opacity: 0.8;
        }

        .image-slide-overlay h3 {
          margin: 5px 0 0;
          font-size: 24px;
        }

        /* ======================================================
           CARD CAROUSEL
           ====================================================== */

        .product-card {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .product-card-image {
          height: 135px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              135deg,
              #eef2ff,
              #ddd6fe
            );
          color: #4f46e5;
          font-size: 30px;
          font-weight: 700;
        }

        .product-card-content {
          padding: 18px;
        }

        .product-card-content h3 {
          margin: 0 0 6px;
          font-size: 18px;
        }

        .product-card-content p {
          margin: 0 0 14px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }

        .product-card-content button {
          padding: 8px 14px;
          border: 0;
          border-radius: 6px;
          background: #5038f5;
          color: #ffffff;
          cursor: pointer;
        }

        /* ======================================================
           AUTOPLAY
           ====================================================== */

        .autoplay-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
          color: #64748b;
          font-size: 12px;
        }

        .autoplay-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
        }

        /* ======================================================
           CODE
           ====================================================== */

        .carousel-code {
          padding: 24px;
          overflow-x: auto;
          background: #111827;
        }

        .carousel-code pre {
          margin: 0;
          color: #e5e7eb;
          font-size: 13px;
          line-height: 1.65;
          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;
        }

        /* ======================================================
           API
           ====================================================== */

        .api-section {
          margin-top: 54px;
        }

        .api-container {
          overflow: hidden;
          border: 1px solid #dfe3e8;
          border-radius: 9px;
          background: #ffffff;
        }

        .api-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 14px;
        }

        .api-table th {
          padding: 17px 18px;
          text-align: left;
          color: #111827;
          font-weight: 500;
        }

        .api-table td {
          padding: 14px 18px;
          border-top: 1px solid #e5e7eb;
          vertical-align: top;
        }

        .api-table code {
          color: #4b5563;
          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;
          font-size: 13px;
        }

        .api-prop {
          color: #155eef !important;
        }

        .api-description {
          color: #374151;
          line-height: 1.5;
        }

        /* ======================================================
           RESPONSIVE
           ====================================================== */

        @media (max-width: 700px) {
          .carousel-main {
            width: calc(100% - 32px);
          }

          .carousel-title {
            font-size: 34px;
          }

          .carousel-subtitle {
            font-size: 17px;
          }

          .carousel-demo-preview {
            padding-left: 16px;
            padding-right: 16px;
          }

          .carousel-demo-header {
            align-items: flex-start;
          }

          .carousel {
            max-width: 100%;
          }

          .api-container {
            overflow-x: auto;
          }

          .api-table {
            min-width: 760px;
          }
        }
      `}</style>

      <main className="carousel-main">
        {/* ======================================================
            HEADER
            ====================================================== */}

        <header>
          <h1 className="carousel-title">Carousel</h1>

          <p className="carousel-subtitle">
            A slideshow component for cycling through content, images, cards,
            and other elements.
          </p>
        </header>

        {/* ======================================================
            USAGE
            ====================================================== */}

        <section className="carousel-section">
          <h2 className="section-title">Usage</h2>

          {/* ====================================================
              BASIC CAROUSEL
              ==================================================== */}

          <CarouselDemo
            title="Basic Carousel"
            description="A simple carousel with navigation arrows and dots."
            code={`import { Carousel } from "./Carousel";

<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
          >
            <Carousel>
              <DemoSlide
                number={1}
                title="First Slide"
                description="This is the first slide of the carousel."
              />

              <DemoSlide
                number={2}
                title="Second Slide"
                description="Move through the carousel using the arrows."
              />

              <DemoSlide
                number={3}
                title="Third Slide"
                description="You can also use the navigation dots."
              />
            </Carousel>
          </CarouselDemo>

          {/* ====================================================
              ARROWS ONLY
              ==================================================== */}

          <CarouselDemo
            title="Arrows Only"
            description="A carousel without pagination dots."
            code={`import { Carousel } from "./Carousel";

<Carousel
  showArrows={true}
  showDots={false}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
          >
            <Carousel showArrows={true} showDots={false}>
              <DemoSlide
                number={1}
                title="Arrow Navigation"
                description="Use the left and right arrows to navigate."
              />

              <DemoSlide
                number={2}
                title="No Dots"
                description="Pagination dots have been disabled."
              />

              <DemoSlide
                number={3}
                title="Simple Controls"
                description="Only arrow controls are visible."
              />
            </Carousel>
          </CarouselDemo>

          {/* ====================================================
              DOTS ONLY
              ==================================================== */}

          <CarouselDemo
            title="Dots Only"
            description="A minimal carousel using pagination dots."
            code={`import { Carousel } from "./Carousel";

<Carousel
  showArrows={false}
  showDots={true}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
          >
            <Carousel showArrows={false} showDots={true}>
              <DemoSlide
                number={1}
                title="Minimal Carousel"
                description="Navigate using the dots below."
              />

              <DemoSlide
                number={2}
                title="Clean Interface"
                description="Arrow controls are hidden."
              />

              <DemoSlide
                number={3}
                title="Pagination"
                description="The active slide is shown by the indicator."
              />
            </Carousel>
          </CarouselDemo>

          {/* ====================================================
              IMAGE CAROUSEL
              ==================================================== */}

          <CarouselDemo
            title="Image Carousel"
            description="A carousel designed for visual content."
            code={`import { Carousel } from "./Carousel";

<Carousel>
  <img
    src="/images/image-1.jpg"
    alt="Image 1"
  />

  <img
    src="/images/image-2.jpg"
    alt="Image 2"
  />

  <img
    src="/images/image-3.jpg"
    alt="Image 3"
  />
</Carousel>`}
          >
            <Carousel>
              <ImageSlide number={1} title="Mountain" className="image-one" />

              <ImageSlide number={2} title="Ocean" className="image-two" />

              <ImageSlide number={3} title="Forest" className="image-three" />
            </Carousel>
          </CarouselDemo>

          {/* ====================================================
              CARD CAROUSEL
              ==================================================== */}

          <CarouselDemo
            title="Card Carousel"
            description="Display cards inside a carousel."
            code={`import { Carousel } from "./Carousel";

<Carousel>
  <ProductCard
    title="Product One"
    description="Product description"
  />

  <ProductCard
    title="Product Two"
    description="Product description"
  />

  <ProductCard
    title="Product Three"
    description="Product description"
  />
</Carousel>`}
          >
            <Carousel>
              <ProductCard
                number="01"
                title="Product One"
                description="A beautiful product card inside the carousel."
              />

              <ProductCard
                number="02"
                title="Product Two"
                description="Another product displayed in the carousel."
              />

              <ProductCard
                number="03"
                title="Product Three"
                description="Create interactive card-based carousels."
              />
            </Carousel>
          </CarouselDemo>

          {/* ====================================================
              AUTOPLAY
              ==================================================== */}

          <CarouselDemo
            title="Auto Play"
            description="Automatically advances to the next slide."
            code={`import { Carousel } from "./Carousel";

<Carousel
  autoPlay={true}
  interval={2500}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
          >
            <div style={{ width: "100%" }}>
              <Carousel autoPlay={true} interval={2500}>
                <DemoSlide
                  number={1}
                  title="Auto Play"
                  description="This slide changes automatically."
                />

                <DemoSlide
                  number={2}
                  title="2.5 Seconds"
                  description="The carousel advances every 2.5 seconds."
                />

                <DemoSlide
                  number={3}
                  title="Automatic Navigation"
                  description="No interaction is required."
                />
              </Carousel>

              <div className="autoplay-label">
                <span className="autoplay-indicator" />
                Auto play enabled
              </div>
            </div>
          </CarouselDemo>

          {/* ====================================================
              NON LOOPING
              ==================================================== */}

          <CarouselDemo
            title="Non-looping Carousel"
            description="Stops at the first and last slide."
            code={`import { Carousel } from "./Carousel";

<Carousel
  loop={false}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
          >
            <Carousel loop={false}>
              <DemoSlide
                number={1}
                title="First Slide"
                description="The previous button is disabled here."
              />

              <DemoSlide
                number={2}
                title="Middle Slide"
                description="Navigate normally through the carousel."
              />

              <DemoSlide
                number={3}
                title="Last Slide"
                description="The next button stops at this slide."
              />
            </Carousel>
          </CarouselDemo>
        </section>

        {/* ======================================================
            API REFERENCE
            ====================================================== */}

        <section className="api-section">
          <h2 className="section-title">API Reference</h2>

          <div className="api-container">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                <ApiRow
                  prop="children"
                  type="ReactNode[]"
                  defaultValue="—"
                  description="The slides displayed inside the carousel."
                />

                <ApiRow
                  prop="autoPlay"
                  type="boolean"
                  defaultValue="false"
                  description="Automatically moves to the next slide."
                />

                <ApiRow
                  prop="interval"
                  type="number"
                  defaultValue="3000"
                  description="Time in milliseconds between automatic slide changes."
                />

                <ApiRow
                  prop="showArrows"
                  type="boolean"
                  defaultValue="true"
                  description="Controls whether previous and next navigation arrows are displayed."
                />

                <ApiRow
                  prop="showDots"
                  type="boolean"
                  defaultValue="true"
                  description="Controls whether pagination dots are displayed."
                />

                <ApiRow
                  prop="loop"
                  type="boolean"
                  defaultValue="true"
                  description="Allows navigation to continue from the last slide back to the first slide."
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
