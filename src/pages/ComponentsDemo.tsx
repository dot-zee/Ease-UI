import { useState } from "react";
import { Code } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm"
      style={{
        backgroundColor: isDark ? "#18181b" : "#e5e7eb",
        border: `1px solid ${isDark ? "#3f3f46" : "#e5e7eb"}`,
        color: "var(--text-color)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: isDark ? "#27272a" : "#f9fafb",
          borderColor: isDark ? "#3f3f46" : "#e5e7eb",
        }}
      >
        <span
          className={`text-sm font-medium ${isDark ? "text-zinc-200" : "text-gray-700"}`}
        >
          Preview
        </span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
            isDark
              ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="py-20 px-4 flex items-center justify-center">
        {children}
      </div>

      {isCodeVisible && (
        <div
          className="border-t"
          style={{ borderColor: isDark ? "#3f3f46" : "#e5e7eb" }}
        >
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
