import React, { useState } from "react";

type TooltipSide = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
};

/* =========================================================
   BASIC TOOLTIP
   ========================================================= */

export function Tooltip({
  content,
  children,
  side = "top",
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const positionStyles: Record<TooltipSide, React.CSSProperties> = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}

      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            ...positionStyles[side],
            zIndex: 100,
            padding: "7px 10px",
            borderRadius: 6,
            background: "#111827",
            color: "#ffffff",
            fontSize: 13,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            pointerEvents: "none",
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

/* =========================================================
   REUSABLE DEMO CARD
   ========================================================= */

function TooltipDemo({
  title,
  children,
  code,
}: {
  title: string;
  children: React.ReactNode;
  code: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="tooltip-demo">
      <div className="tooltip-demo-header">
        <span className="tooltip-demo-title">{title}</span>

        <button
          type="button"
          className="tooltip-view-code"
          onClick={() => setShowCode((value) => !value)}
          aria-expanded={showCode}
        >
          <span className="code-icon">{"<>"}</span>
          {showCode ? "Hide Code" : "View Code"}
        </button>
      </div>

      {!showCode ? (
        <div className="tooltip-demo-preview">{children}</div>
      ) : (
        <div className="tooltip-code">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   UIVERSE TOOLTIP
   ========================================================= */

function UiverseTooltip() {
  return (
    <div className="uiverse-tooltip">
      <button type="button" className="uiverse-trigger">
        <span className="uiverse-trigger-glow" />

        <span className="uiverse-trigger-content">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          Hover for Info
        </span>
      </button>

      <div className="uiverse-tooltip-popup">
        <div className="uiverse-tooltip-card">
          <div className="uiverse-tooltip-header">
            <div className="uiverse-info-circle">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <h3>Important Information</h3>
          </div>

          <div className="uiverse-tooltip-body">
            <p>
              This is a tooltip with detailed information and custom styling.
            </p>

            <div className="uiverse-feature">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>

              <span>Premium Feature</span>
            </div>
          </div>

          <div className="uiverse-card-glow" />

          <div className="uiverse-tooltip-arrow" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   API ROW
   ========================================================= */

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

/* =========================================================
   DOCUMENTATION PAGE
   ========================================================= */

export default function TooltipDocumentation() {
  return (
    <div className="tooltip-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .tooltip-page {
          min-height: 100vh;
          background: #ffffff;
          color: #111827;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
        }

        .tooltip-main {
          width: min(940px, calc(100% - 48px));
          margin: 0 auto;
          padding: 34px 0 80px;
        }

        /* =====================================================
           PAGE HEADER
           ===================================================== */

        .tooltip-title {
          margin: 0;
          color: #050505;
          font-size: 40px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .tooltip-subtitle {
          margin: 12px 0 0;
          color: #4b5563;
          font-size: 20px;
          line-height: 1.5;
        }

        .tooltip-section {
          margin-top: 56px;
        }

        .section-title {
          margin: 0 0 18px;
          color: #111827;
          font-size: 28px;
          line-height: 1.25;
          font-weight: 500;
        }

        /* =====================================================
           INDIVIDUAL DEMO
           ===================================================== */

        .tooltip-demo {
          margin-bottom: 20px;
          border: 1px solid #dfe3e8;
          border-radius: 9px;
          background: #e5e7eb;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          overflow: visible;
        }

        .tooltip-demo:last-child {
          margin-bottom: 0;
        }

        .tooltip-demo-header {
          height: 49px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 9px 9px 0 0;
        }

        .tooltip-demo-title {
          color: #334155;
          font-size: 16px;
        }

        .tooltip-view-code {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border: 0;
          border-radius: 6px;
          background: #f1f3f5;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .tooltip-view-code:hover {
          background: #e5e7eb;
        }

        .code-icon {
          font-size: 15px;
          font-family: monospace;
        }

        .tooltip-demo-preview {
          min-height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 32px 50px;
          overflow: visible;
        }

        /* =====================================================
           BASIC TOOLTIP
           ===================================================== */

        .basic-tooltip {
          position: relative;
          display: inline-flex;
        }

        .basic-tooltip-content {
          position: absolute;
          z-index: 100;
          padding: 7px 10px;
          border-radius: 6px;
          background: #111827;
          color: #ffffff;
          font-size: 13px;
          line-height: 1.3;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
        }

        .basic-tooltip-top .basic-tooltip-content {
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .basic-tooltip-right .basic-tooltip-content {
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        .basic-tooltip-bottom .basic-tooltip-content {
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .basic-tooltip-left .basic-tooltip-content {
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        /* =====================================================
           DEMO BUTTONS
           ===================================================== */

        .demo-button {
          height: 60px;
          padding: 0 26px;
          border-radius: 7px;
          border: none;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            transform 150ms ease,
            filter 150ms ease;
        }

        .demo-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }

        .primary-button {
          background: #5038f5;
          color: #ffffff;
        }

        .secondary-button {
          background: #615cf5;
          color: #ffffff;
        }

        .outline-button {
          background: #e5e7eb;
          border: 1px solid #cbd1d9;
          color: #334155;
        }

        .dark-button {
          background: #111827;
          color: #ffffff;
        }

        /* =====================================================
           UIVERSE TOOLTIP
           ===================================================== */

        .uiverse-tooltip {
          position: relative;
          display: inline-block;
          z-index: 20;
        }

        .uiverse-trigger {
          position: relative;
          padding: 12px 24px;
          border: 0;
          border-radius: 12px;
          background: rgba(79, 70, 229, 0.9);
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          transition:
            background 300ms ease,
            transform 300ms ease;
        }

        .uiverse-trigger:hover {
          background: rgba(67, 56, 202, 0.95);
          transform: translateY(-1px);
        }

        .uiverse-trigger:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 2px #6366f1,
            0 0 0 4px #111827;
        }

        .uiverse-trigger-glow {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to right,
              rgba(168, 85, 247, 0.2),
              rgba(236, 72, 153, 0.2)
            );
          filter: blur(18px);
          opacity: 0.7;
          transition: opacity 300ms ease;
        }

        .uiverse-trigger:hover .uiverse-trigger-glow {
          opacity: 1;
        }

        .uiverse-trigger-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .uiverse-tooltip-popup {
          position: absolute;
          z-index: 100;
          left: 50%;
          bottom: calc(100% + 12px);
          width: 288px;
          transform: translateX(-50%) translateY(8px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 300ms ease,
            transform 300ms ease,
            visibility 300ms;
        }

        .uiverse-tooltip:hover .uiverse-tooltip-popup,
        .uiverse-tooltip:focus-within .uiverse-tooltip-popup {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .uiverse-tooltip-card {
          position: relative;
          padding: 16px;
          overflow: visible;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          background:
            linear-gradient(
              135deg,
              rgba(17, 24, 39, 0.97),
              rgba(31, 41, 55, 0.97)
            );
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 0 30px rgba(79, 70, 229, 0.15);
        }

        .uiverse-tooltip-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .uiverse-info-circle {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }

        .uiverse-tooltip-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }

        .uiverse-tooltip-body p {
          margin: 0 0 8px;
          color: #d1d5db;
          font-size: 14px;
          line-height: 1.5;
        }

        .uiverse-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9ca3af;
          font-size: 12px;
        }

        .uiverse-card-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background:
            linear-gradient(
              to right,
              rgba(99, 102, 241, 0.1),
              rgba(168, 85, 247, 0.1)
            );
          filter: blur(18px);
          opacity: 0.5;
          pointer-events: none;
        }

        .uiverse-tooltip-arrow {
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 12px;
          height: 12px;
          transform: translateX(-50%) rotate(45deg);
          background: #1b2331;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* =====================================================
           CODE
           ===================================================== */

        .tooltip-code {
          background: #111827;
          padding: 24px;
          overflow-x: auto;
          border-radius: 0 0 9px 9px;
        }

        .tooltip-code pre {
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

        /* =====================================================
           API
           ===================================================== */

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

        @media (max-width: 700px) {
          .tooltip-main {
            width: calc(100% - 32px);
          }

          .tooltip-title {
            font-size: 34px;
          }

          .tooltip-subtitle {
            font-size: 17px;
          }

          .tooltip-demo-preview {
            padding-left: 16px;
            padding-right: 16px;
          }

          .uiverse-tooltip-popup {
            width: 260px;
          }

          .api-container {
            overflow-x: auto;
          }

          .api-table {
            min-width: 760px;
          }
        }
      `}</style>

      <main className="tooltip-main">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <header>
          <h1 className="tooltip-title">Tooltip</h1>

          <p className="tooltip-subtitle">
            Displays additional information when a user hovers over or focuses
            an element.
          </p>
        </header>

        {/* =====================================================
            USAGE
            ===================================================== */}

        <section className="tooltip-section">
          <h2 className="section-title">Usage</h2>

          {/* ---------------------------------------------------
              TOOLTIP 1
              --------------------------------------------------- */}

          <TooltipDemo
            title="Basic Tooltip"
            code={`import { Tooltip } from "./ToolTip";

<Tooltip content="This is a tooltip">
  <button className="demo-button primary-button">
    Hover me
  </button>
</Tooltip>`}
          >
            <Tooltip content="This is a tooltip">
              <button className="demo-button primary-button">
                Hover me
              </button>
            </Tooltip>
          </TooltipDemo>

          {/* ---------------------------------------------------
              TOOLTIP 2
              --------------------------------------------------- */}

          <TooltipDemo
            title="Information Tooltip"
            code={`import { Tooltip } from "./ToolTip";

<Tooltip content="Helpful information">
  <button className="demo-button secondary-button">
    Information
  </button>
</Tooltip>`}
          >
            <Tooltip content="Helpful information">
              <button className="demo-button secondary-button">
                Information
              </button>
            </Tooltip>
          </TooltipDemo>

          {/* ---------------------------------------------------
              TOOLTIP 3
              --------------------------------------------------- */}

          <TooltipDemo
            title="Bottom Tooltip"
            code={`import { Tooltip } from "./ToolTip";

<Tooltip
  content="Tooltips can be used on any element"
  side="bottom"
>
  <button className="demo-button outline-button">
    Learn more
  </button>
</Tooltip>`}
          >
            <Tooltip
              content="Tooltips can be used on any element"
              side="bottom"
            >
              <button className="demo-button outline-button">
                Learn more
              </button>
            </Tooltip>
          </TooltipDemo>

          {/* ---------------------------------------------------
              TOOLTIP 4
              --------------------------------------------------- */}

          <TooltipDemo
            title="Right Tooltip"
            code={`import { Tooltip } from "./ToolTip";

<Tooltip
  content="Dark tooltip"
  side="right"
>
  <button className="demo-button dark-button">
    Help
  </button>
</Tooltip>`}
          >
            <Tooltip content="Dark tooltip" side="right">
              <button className="demo-button dark-button">
                Help
              </button>
            </Tooltip>
          </TooltipDemo>

          {/* ---------------------------------------------------
              TOOLTIP 5 - UIVERSE
              --------------------------------------------------- */}

          <TooltipDemo
            title="Advanced Tooltip"
            code={`function UiverseTooltip() {
  return (
    <div className="uiverse-tooltip">
      <button className="uiverse-trigger">
        <span className="uiverse-trigger-content">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M13 16h-1v-4h-1m1-4h.01
              M21 12a9 9 0 11-18 0
              9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Hover for Info
        </span>
      </button>

      <div className="uiverse-tooltip-popup">
        <div className="uiverse-tooltip-card">
          <div className="uiverse-tooltip-header">
            <div className="uiverse-info-circle">
              ⓘ
            </div>

            <h3>Important Information</h3>
          </div>

          <div className="uiverse-tooltip-body">
            <p>
              This is a tooltip with detailed
              information and custom styling.
            </p>

            <div className="uiverse-feature">
              ✓ Premium Feature
            </div>
          </div>

          <div className="uiverse-tooltip-arrow" />
        </div>
      </div>
    </div>
  );
}

<UiverseTooltip />`}
          >
            <UiverseTooltip />
          </TooltipDemo>
        </section>

        {/* =====================================================
            API REFERENCE
            ===================================================== */}

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
                  prop="content"
                  type="string | ReactNode"
                  defaultValue="—"
                  description="The content displayed inside the tooltip"
                />

                <ApiRow
                  prop="side"
                  type='"top" | "right" | "bottom" | "left"'
                  defaultValue='"top"'
                  description="The side where the tooltip appears"
                />

                <ApiRow
                  prop="delay"
                  type="number"
                  defaultValue="0"
                  description="Delay before showing the tooltip in milliseconds"
                />

                <ApiRow
                  prop="disabled"
                  type="boolean"
                  defaultValue="false"
                  description="Prevents the tooltip from being displayed"
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}