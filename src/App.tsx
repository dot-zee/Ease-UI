import AppRouter from "./router/AppRouter";

type Props = {};

function App({}: Props) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.25s, color 0.25s",
      }}
    >
      <AppRouter />
    </div>
  );
}

export default App;
