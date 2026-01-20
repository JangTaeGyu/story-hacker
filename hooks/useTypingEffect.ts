'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);

    if (!text) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    // 딜레이 후 타이핑 시작
    timeoutId = setTimeout(() => {
      setIsTyping(true);

      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          setIsComplete(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  // 타이핑 스킵 기능
  const skipTyping = () => {
    setDisplayedText(text);
    setIsTyping(false);
    setIsComplete(true);
  };

  return {
    displayedText,
    isTyping,
    isComplete,
    skipTyping,
  };
}
