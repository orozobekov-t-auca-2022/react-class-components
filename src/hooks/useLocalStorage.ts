import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      if (typeof initialValue === 'string') {
        return item as T;
      }

      return JSON.parse(item) as T;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (nextValue: T) => {
    setValue(nextValue);

    try {
      const serializedValue =
        typeof nextValue === 'string' ? nextValue : JSON.stringify(nextValue);

      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setValue, saveValue] as const;
};

export default useLocalStorage;
