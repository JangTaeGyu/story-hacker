import { test, expect } from '@playwright/test';

/**
 * NOCTURNE 팔레트의 명암비를 고정한다.
 *
 * 전경 토큰은 배경 3종 위에서 모두 WCAG AA 본문 기준(4.5:1)을 넘어야 한다.
 * 특히 noct-ink-faint는 10px 라벨("미해결", "Turns 0/3" 등)에 쓰이므로
 * 값을 낮추면 그 라벨들이 읽히지 않는다.
 *
 * CSS 변수를 페이지에서 직접 읽으므로 globals.css와 tailwind.config.ts가
 * 어긋나면 여기서 잡히지는 않는다 — 그건 typing-skip.spec.ts가 본다.
 */

const FOREGROUNDS = ['--noct-ink', '--noct-ink-dim', '--noct-ink-faint', '--noct-gold', '--noct-gold-dim'];
const BACKGROUNDS = ['--noct-black', '--noct-page', '--noct-black-2'];

const AA_NORMAL_TEXT = 4.5;

test('전경 토큰이 배경 3종에서 모두 AA 기준을 넘는다', async ({ page }) => {
  await page.goto('/story/1');

  const results = await page.evaluate(
    ({ foregrounds, backgrounds }) => {
      const root = getComputedStyle(document.documentElement);
      const read = (name: string) => root.getPropertyValue(name).trim();

      const toRgb = (hex: string) =>
        [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

      const luminance = (rgb: number[]) => {
        const channel = (v: number) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return (
          0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2])
        );
      };

      const ratio = (a: string, b: string) => {
        const [hi, lo] = [luminance(toRgb(a)), luminance(toRgb(b))].sort((x, y) => y - x);
        return (hi + 0.05) / (lo + 0.05);
      };

      const out: { pair: string; ratio: number }[] = [];
      for (const bg of backgrounds) {
        for (const fg of foregrounds) {
          const bgValue = read(bg);
          const fgValue = read(fg);
          if (!bgValue || !fgValue) {
            out.push({ pair: `${fg} on ${bg}`, ratio: -1 });
            continue;
          }
          out.push({
            pair: `${fg} on ${bg}`,
            ratio: Math.round(ratio(fgValue, bgValue) * 100) / 100,
          });
        }
      }
      return out;
    },
    { foregrounds: FOREGROUNDS, backgrounds: BACKGROUNDS }
  );

  expect(results).toHaveLength(FOREGROUNDS.length * BACKGROUNDS.length);

  const failing = results.filter((r) => r.ratio < AA_NORMAL_TEXT);
  expect(
    failing,
    `AA 미달: ${failing.map((f) => `${f.pair} = ${f.ratio}:1`).join(', ')}`
  ).toEqual([]);
});
