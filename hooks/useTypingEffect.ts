'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypingEffectOptions {
  speed?: number;
  delay?: number;
}

export function useTypingEffect(
  text: string,
  options: UseTypingEffectOptions = {}
) {
  const { speed = 25, delay = 0 } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 타이머 핸들을 훅 스코프에 둔다.
  // useEffect 지역 변수로 두면 skipTyping이 인터벌을 멈출 수 없어,
  // 스킵 직후 다음 틱이 짧은 슬라이스로 다시 덮어써버린다.
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);

    if (!text) return;

    // 모션 감소를 선호하면 타이핑 없이 전문을 바로 보여준다.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;

    // 딜레이 후 타이핑 시작
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearTimers();
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return clearTimers;
  }, [text, speed, delay, clearTimers]);

  // 타이핑 스킵 — 타이머를 먼저 정리해야 스킵 상태가 유지된다.
  const skipTyping = useCallback(() => {
    clearTimers();
    setDisplayedText(text);
    setIsTyping(false);
    setIsComplete(true);
  }, [text, clearTimers]);

  return {
    displayedText,
    isTyping,
    isComplete,
    skipTyping,
  };
}
