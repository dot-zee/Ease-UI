import React, { useState } from "react";

/* ============================================================
   TYPES
   ============================================================ */

type LayoutDirection = "row" | "column";

type LayoutProps = {
  children: React.ReactNode;
  direction?: LayoutDirection;
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  className?: string;
};

/* ============================================================
   LAYOUT COMPONENT
   ============================================================ */

export function Layout({
  children,
  direction = "row",
  gap = 16,
  align = "stretch",
  justify = "start",
  wrap = false,
  className = "",
}: LayoutProps) {
  const alignMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
  };

  const justifyMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `${gap}px`,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? "wrap" : "nowrap",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   REUSABLE DEMO CARD
   ============================================================ */

function LayoutDemo({
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

  return (
    <div className="layout-demo">
      <div className="layout-demo-header">
        <div>
          <span className="layout-demo-title">{title}</span>

          {description && (
            <span className="layout-demo-description">
              {description}
            </span>
          )}
        </div>

        <button
          type="button"
          className="layout-view-code"
          onClick={() => setShowCode((value) => !value)}
          aria-expanded={showCode}
        >
          <span className="layout-code-icon">{"<>"}</span>

          {showCode ? "Hide Code" : "View Code"}
        </button>
      </div>

      {!showCode ? (
        <div className="layout-demo-preview">
          {children}
        </div>
      ) : (
        <div className="layout-code">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DEMO BOX
   ============================================================ */

function DemoBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`demo-box ${className}`}>
      {children}
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

export default function LayoutDocumentation() {
  return (
    <div className="layout-page">
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

        .layout-page {
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

        .layout-main {
          width: min(940px, calc(100% - 48px));
          margin: 0 auto;
          padding: 34px 0 80px;
        }

        .layout-title {
          margin: 0;
          color: #050505;
          font-size: 40px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .layout-subtitle {
          margin: 12px 0 0;
          color: #4b5563;
          font-size: 20px;
          line-height: 1.5;
        }

        .layout-section {
          margin-top: 56px;
        }

        .section-title {
          margin: 0 0 18px;
          color: #111827;
          font-size: 28px;
          line-height: 1.25;
          font-weight: 500;
        }

        /* ======================================================
           DEMO CARD
           ====================================================== */

        .layout-demo {
          margin-bottom: 20px;
          border: 1px solid #dfe3e8;
          border-radius: 9px;
          background: #e5e7eb;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .layout-demo:last-child {
          margin-bottom: 0;
        }

        .layout-demo-header {
          min-height: 49px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 9px 18px;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
        }

        .layout-demo-title {
          display: block;
          color: #334155;
          font-size: 16px;
        }

        .layout-demo-description {
          display: block;
          margin-top: 2px;
          color: #64748b;
          font-size: 12px;
        }

        .layout-view-code {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 7px 12px;
          border: 0;
          border-radius: 6px;
          background: #f1f3f5;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .layout-view-code:hover {
          background: #e5e7eb;
        }

        .layout-code-icon {
          font-family: monospace;
          font-size: 15px;
        }

        /* ======================================================
           DEMO PREVIEW
           ====================================================== */

        .layout-demo-preview {
          min-height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          background: #e5e7eb;
        }

        /* ======================================================
           DEMO BOXES
           ====================================================== */

        .demo-layout-container {
          width: min(700px, 100%);
        }

        .demo-box {
          min-width: 90px;
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          border-radius: 8px;
          background: #5038f5;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }

        .demo-box.secondary {
          background: #615cf5;
        }

        .demo-box.light {
          background: #eef0f4;
          border: 1px solid #cbd1d9;
          color: #334155;
        }

        .demo-box.dark {
          background: #111827;
        }

        .demo-box.pink {
          background: #db2777;
        }

        .demo-box.green {
          background: #059669;
        }

        /* ======================================================
           STACK
           ====================================================== */

        .stack-example {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 420px;
        }

        /* ======================================================
           ROW
           ====================================================== */

        .row-example {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          max-width: 600px;
        }

        /* ======================================================
           CENTER
           ====================================================== */

        .center-example {
          width: 100%;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ======================================================
           SPACE BETWEEN
           ====================================================== */

        .between-example {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 650px;
        }

        /* ======================================================
           GRID
           ====================================================== */

        .grid-example {
          width: 100%;
          max-width: 650px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        /* ======================================================
           SPLIT
           ====================================================== */

        .split-example {
          width: 100%;
          max-width: 650px;
          display: flex;
          align-items: stretch;
          gap: 16px;
        }

        .split-left {
          flex: 1;
        }

        .split-right {
          flex: 1;
        }

        /* ======================================================
           CODE
           ====================================================== */

        .layout-code {
          padding: 24px;
          overflow-x: auto;
          background: #111827;
        }

        .layout-code pre {
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
          .layout-main {
            width: calc(100% - 32px);
          }

          .layout-title {
            font-size: 34px;
          }

          .layout-subtitle {
            font-size: 17px;
          }

          .layout-demo-header {
            align-items: flex-start;
          }

          .layout-demo-preview {
            padding-left: 16px;
            padding-right: 16px;
          }

          .row-example,
          .between-example,
          .split-example {
            flex-wrap: wrap;
          }

          .grid-example {
            grid-template-columns: repeat(2, 1fr);
          }

          .api-container {
            overflow-x: auto;
          }

          .api-table {
            min-width: 760px;
          }
        }
      `}</style>

      <main className="layout-main">
        {/* ======================================================
            HEADER
            ====================================================== */}

        <header>
          <h1 className="layout-title">Layout</h1>

          <p className="layout-subtitle">
            A flexible layout component for arranging content with
            consistent spacing, alignment, and responsive behavior.
          </p>
        </header>

        {/* ======================================================
            USAGE
            ====================================================== */}

        <section className="layout-section">
          <h2 className="section-title">Usage</h2>

          {/* ====================================================
              STACK
              ==================================================== */}

          <LayoutDemo
            title="Stack"
            description="Arranges elements vertically with consistent spacing."
            code={`import { Layout } from "./Layout";

<Layout
  direction="column"
  gap={12}
>
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</Layout>`}
          >
            <div className="stack-example">
              <DemoBox>First item</DemoBox>
              <DemoBox className="secondary">Second item</DemoBox>
              <DemoBox className="dark">Third item</DemoBox>
            </div>
          </LayoutDemo>

          {/* ====================================================
              ROW
              ==================================================== */}

          <LayoutDemo
            title="Row"
            description="Places elements horizontally in a single row."
            code={`import { Layout } from "./Layout";

<Layout
  direction="row"
  gap={14}
  align="center"
>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Layout>`}
          >
            <div className="row-example">
              <DemoBox>First</DemoBox>
              <DemoBox className="secondary">Second</DemoBox>
              <DemoBox className="dark">Third</DemoBox>
            </div>
          </LayoutDemo>

          {/* ====================================================
              CENTER
              ==================================================== */}

          <LayoutDemo
            title="Center"
            description="Centers content horizontally and vertically."
            code={`import { Layout } from "./Layout";

<Layout
  align="center"
  justify="center"
>
  <div>Centered Content</div>
</Layout>`}
          >
            <div className="center-example">
              <DemoBox className="pink">
                Centered Content
              </DemoBox>
            </div>
          </LayoutDemo>

          {/* ====================================================
              SPACE BETWEEN
              ==================================================== */}

          <LayoutDemo
            title="Space Between"
            description="Places the first and last items at opposite edges."
            code={`import { Layout } from "./Layout";

<Layout
  direction="row"
  justify="between"
  align="center"
>
  <div>Logo</div>
  <div>Navigation</div>
</Layout>`}
          >
            <div className="between-example">
              <DemoBox>Logo</DemoBox>

              <DemoBox className="dark">
                Navigation
              </DemoBox>
            </div>
          </LayoutDemo>

          {/* ====================================================
              GRID
              ==================================================== */}

          <LayoutDemo
            title="Grid"
            description="Creates a responsive grid of equally sized items."
            code={`<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: 12,
  }}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</div>`}
          >
            <div className="grid-example">
              <DemoBox>Item 1</DemoBox>
              <DemoBox className="secondary">Item 2</DemoBox>
              <DemoBox className="dark">Item 3</DemoBox>
              <DemoBox className="green">Item 4</DemoBox>
              <DemoBox className="pink">Item 5</DemoBox>
              <DemoBox className="light">Item 6</DemoBox>
            </div>
          </LayoutDemo>

          {/* ====================================================
              SPLIT
              ==================================================== */}

          <LayoutDemo
            title="Split"
            description="Splits available space between two content areas."
            code={`<Layout
  direction="row"
  gap={16}
>
  <div style={{ flex: 1 }}>
    Main Content
  </div>

  <div style={{ flex: 1 }}>
    Sidebar
  </div>
</Layout>`}
          >
            <div className="split-example">
              <div className="split-left">
                <DemoBox>Main Content</DemoBox>
              </div>

              <div className="split-right">
                <DemoBox className="dark">Sidebar</DemoBox>
              </div>
            </div>
          </LayoutDemo>
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
                  type="ReactNode"
                  defaultValue="—"
                  description="The content rendered inside the layout."
                />

                <ApiRow
                  prop="direction"
                  type='"row" | "column"'
                  defaultValue='"row"'
                  description="Controls whether children are arranged horizontally or vertically."
                />

                <ApiRow
                  prop="gap"
                  type="number"
                  defaultValue="16"
                  description="Sets the spacing between child elements in pixels."
                />

                <ApiRow
                  prop="align"
                  type='"start" | "center" | "end" | "stretch"'
                  defaultValue='"stretch"'
                  description="Controls the cross-axis alignment of children."
                />

                <ApiRow
                  prop="justify"
                  type='"start" | "center" | "end" | "between"'
                  defaultValue='"start"'
                  description="Controls the distribution of children along the main axis."
                />

                <ApiRow
                  prop="wrap"
                  type="boolean"
                  defaultValue="false"
                  description="Allows children to wrap onto multiple lines."
                />

                <ApiRow
                  prop="className"
                  type="string"
                  defaultValue='""'
                  description="Optional custom CSS class applied to the layout."
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}