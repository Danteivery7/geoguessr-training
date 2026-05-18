import { useCallback, useEffect, useState } from "react";

const readStoredValue = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const useLocalStorage = <T,>(key: string, fallback: T) => {
  const [value, setValue] = useState<T>(() => readStoredValue(key, fallback));

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ key: string }>;
      if (custom.detail?.key === key) {
        setValue(readStoredValue(key, fallback));
      }
    };

    window.addEventListener("geomastery-storage", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("geomastery-storage", handler);
      window.removeEventListener("storage", handler);
    };
  }, [fallback, key]);

  const updateValue = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
        localStorage.setItem(key, JSON.stringify(resolved));
        window.dispatchEvent(new CustomEvent("geomastery-storage", { detail: { key } }));
        return resolved;
      });
    },
    [key]
  );

  return [value, updateValue] as const;
};
