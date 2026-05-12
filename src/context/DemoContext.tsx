import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DemoContextValue = {
  appliedIds: string[];
  toggleApplied: (id: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const toggleApplied = useCallback((id: string) => {
    setAppliedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo(
    () => ({ appliedIds, toggleApplied }),
    [appliedIds, toggleApplied],
  );

  return (
    <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
