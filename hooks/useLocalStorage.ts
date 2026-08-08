'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  // 초기값 설정 (SSR 호환)
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // 최신 값을 ref로 들고 있어야 setValue가 stale 클로저를 잡지 않는다.
  // (ref를 쓰지 않고 storedValue를 deps에 넣으면 setValue의 identity가 매번 바뀌어,
  //  이를 의존하는 useEffect가 불필요하게 재실행된다.)
  const valueRef = useRef(storedValue);

  // 클라이언트에서 localStorage 읽기
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item) as T;
        valueRef.current = parsed;
        setStoredValue(parsed);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsInitialized(true);
  }, [key]);

  // 값 설정 함수 — identity가 [key]에만 의존하므로 안정적이다.
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const valueToStore =
        value instanceof Function ? value(valueRef.current) : value;

      valueRef.current = valueToStore;
      setStoredValue(valueToStore);

      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue, isInitialized];
}
