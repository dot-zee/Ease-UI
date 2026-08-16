import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <aside
        className={`
          w-64 p-6 flex flex-col
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
        style={{
          backgroundColor: "var(--bg-color)",
          borderRight: `1px solid ${isDark ? "#3f3f46" : "#e5e7eb"}`,
        }}
      >
        <h2 className="text-md font-bold mb-6">Components</h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => {
            const isActive =
              location.pathname === `/components/${item.toLowerCase()}`;

            return (
              <li
                onClick={() => navigate(item.toLowerCase())}
                key={item}
                className={`cursor-pointer text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${
                  isActive
                    ? isDark
                      ? "text-white"
                      : "text-black"
                    : isDark
                      ? "text-zinc-400 hover:text-white"
                      : "text-gray-400 hover:text-black"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="flex-1 ml-0 overflow-auto h-screen p-6 md:ml-10">
        <button
          className={`md:hidden mb-4 ${isDark ? "text-zinc-100" : "text-gray-700"}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
