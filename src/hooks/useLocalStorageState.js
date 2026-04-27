import { useEffect, useState } from "react";

function resolveInitialValue(initialValue) {
  return typeof initialValue === "function" ? initialValue() : initialValue;
}

export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const fallbackValue = resolveInitialValue(initialValue);

    if (typeof window === "undefined") {
      return fallbackValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue === null) {
        return fallbackValue;
      }

      return JSON.parse(storedValue);
    } catch {
      return window.localStorage.getItem(key) ?? fallbackValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      window.localStorage.setItem(key, String(value));
    }
  }, [key, value]);

  return [value, setValue];
}
