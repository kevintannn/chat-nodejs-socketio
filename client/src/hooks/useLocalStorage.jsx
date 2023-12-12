import { useEffect, useState } from "react";

const PREFIX = "wds-whatsapp-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const json = localStorage.getItem(prefixedKey);

    if (json != null && json != "undefined") return JSON.parse(json);

    if (typeof initialValue === "function") {
      return initialValue();
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}
