import { test, expect } from '@playwright/test';
import { locales } from '../lib/i18n';
import { getDeductionEpisodes } from '../data/deductionEpisodes';
import { getPinLength } from '../lib/utils';

/**
 * 추리 모드 단서의 논리 검산.
 *
 * 여기서 막으려는 사고는 실제로 있었던 것이다. 정답을 `155595`에서 `159357`로
 * 바꾸면서 단서를 함께 고치지 않아, 여섯 단서 중 셋이 정답에 대해 **거짓**인
 * 채로 배포돼 있었다. 단서를 다 읽어도 논리적으로 답에 닿을 수 없는 스테이지가
 * 세 곳 있었고, 사람이 눈으로 읽어서는 잘 걸리지 않는다.
 *
 * 그래서 단서를 **기계가 검산할 수 있는 술어로 따로 적어 둔다.** 데이터의 단서
 * 문장과 여기 술어는 같은 내용을 두 번 쓴 것이고, 둘이 어긋나면 이 스펙이 깨진다.
 * 단서를 고치면 술어도 함께 고쳐야 한다 — 그게 이 검사의 값이다.
 *
 * 브라우저를 쓰지 않는 순수 데이터 검사다.
 */

/** 자릿수 배열을 받아 참/거짓을 내는 술어 */
type Rule = (d: number[]) => boolean;

/** 두 자리를 하나의 수로 */
const two = (d: number[], i: number) => d[i] * 10 + d[i + 1];
/** 세 자리를 하나의 수로 */
const three = (d: number[], i: number) => d[i] * 100 + d[i + 1] * 10 + d[i + 2];
const sum = (d: number[]) => d.reduce((a, b) => a + b, 0);
/** 자릿수 배열 전체를 하나의 수로 */
const value = (d: number[]) => Number(d.join(''));

/**
 * `${episodeId}-${stageId}` → 단서 순서와 1:1로 대응하는 술어 목록.
 * 항상 참인 안내 문구(형식 설명 등)는 `() => true`로 둔다.
 */
const RULES: Record<string, Rule[]> = {
  '101-1': [
    (d) => new Set(d).size === 4,
    (d) => d[0] % 2 === 1,
    (d) => sum(d) === 18,
    (d) => d[1] === 7,
    (d) => d[3] === 2 * d[0],
    (d) => d[2] === Math.min(...d),
  ],
  '101-2': [
    () => true,
    (d) => d[0] === 4,
    (d) => d[1] === 2 * d[0],
    (d) => two(d, 2) === 2 * d[1],
    (d) => d[0] + d[1] + two(d, 2) === 28,
  ],
  '101-3': [
    () => true,
    (d) => d.every((x) => x % 2 === 1),
    (d) => d[1] - d[0] === d[2] - d[1] && d[1] > d[0] && d[4] - d[3] === d[5] - d[4] && d[4] > d[3],
    (d) => d[0] === 1,
    (d) => d[1] === d[4],
    (d) => d[1] - d[0] === 2 * (d[4] - d[3]),
  ],
  '102-1': [
    (d) => d[0] === 0 && d[1] === 3,
    (d) => two(d, 2) > 10,
    (d) => two(d, 2) % 2 === 0,
    (d) => d[2] * d[3] === 4,
    (d) => sum(d) === 8,
  ],
  '102-2': [
    () => true,
    (d) => d[0] === 2,
    (d) => d[1] === d[0] + 2 && d[2] === d[1] + 2 && d[3] === d[2] + 2,
    (d) => two(d, 4) === d[3] + 2,
    (d) => [d[0], d[1], d[2], d[3], two(d, 4)].every((x) => x % 2 === 0),
    () => true,
  ],
  '102-3': [
    (d) => d.every((x) => x % 2 === 1),
    (d) => d[0] < d[1] && d[1] < d[2] && d[2] < d[3],
    (d) => !(d[1] - d[0] === 2 && d[2] - d[1] === 2 && d[3] - d[2] === 2),
    (d) => d[0] + d[3] === 10,
    (d) => d[1] + d[2] === 10,
  ],
  '103-1': [
    (d) => d.every((x) => x <= 6) && new Set(d).size === 4,
    (d) => d[0] * d[2] === 6,
    (d) => d[1] * d[3] === 24,
    (d) => d[3] > d[1],
    (d) => d[0] < d[2],
  ],
  '103-2': [
    (d) => d[0] > d[1] && d[1] > d[2] && d[2] > d[3],
    (d) => sum(d) === 15,
    (d) => Math.min(...d) === 1,
    (d) => [0, 1, 2].every((i) => d[i + 1] * 2 === d[i]),
    (d) => d[0] === 8 * d[3],
  ],
  '103-3': [
    () => true,
    (d) => d[0] === d[1],
    (d) => [2, 3, 4, 5].every((i) => d[i] === d[i - 1] + d[i - 2]),
    (d) => d[0] === 1,
    (d) => sum(d) === 20,
    (d) => d[5] === 8,
  ],
  '104-1': [
    (d) => two(d, 0) < 24 && two(d, 2) < 60,
    (d) => two(d, 0) >= 12,
    (d) => sum(d) === 6,
    (d) => d.filter((x) => x === 0).length === 1 && d[3] === 0,
    (d) => two(d, 0) === 12 && two(d, 2) === 30,
  ],
  '104-2': [
    () => true,
    (d) => d[0] === 2 && d[1] === 4,
    (d) => d[2] === 0 && d[3] === 2,
    (d) => two(d, 4) === 29,
    () => true,
    (d) => d[4] + d[5] === 11,
  ],
  '104-3': [
    (d) => two(d, 0) < 60 && two(d, 2) < 60,
    (d) => two(d, 0) === two(d, 2),
    (d) => sum(d) === 28,
    (d) => [...d].sort().join('') === '5599',
    (d) => two(d, 0) === 59 && two(d, 2) === 59,
  ],
  '105-1': [
    (d) => d.every((x) => x >= 1 && x <= 7),
    () => true,
    (d) => [0, 1, 2].every((i) => d[i + 1] === d[i] + 1),
    (d) => d.includes(1),
    (d) => sum(d) === 10,
  ],
  '105-2': [
    (d) => three(d, 0) <= 255 && three(d, 3) <= 255,
    (d) => three(d, 3) === 0,
    (d) => three(d, 0) !== 0,
    (d) => three(d, 0) === 255,
    () => true,
  ],
  '106-1': [
    (d) => d.every((x) => x >= 1 && x <= 7),
    () => true,
    (d) => d[0] === d[3],
    (d) => d[1] - d[0] === d[2] - d[1] && d[1] > d[0],
    (d) => sum(d) === 10,
  ],
  '106-2': [
    (d) => d[0] === 0,
    (d) => three(d, 1) >= 400 && three(d, 1) <= 450,
    (d) => three(d, 1) % 10 === 0,
    () => true,
    (d) => d[1] + d[2] + d[3] === 8,
  ],
  '107-1': [
    () => true,
    (d) => two(d, 0) === 37,
    (d) => two(d, 2) > 30 && two(d, 2) < 40,
    (d) => two(d, 2) % 3 === 0,
    (d) => d[2] === d[3],
  ],
  '107-2': [
    (d) => d[0] * 1000 + three(d, 1) > 5000,
    (d) => d[0] * 1000 + three(d, 1) < 6000,
    () => true,
    (d) => d[2] === 0 && d[3] === 0,
    (d) => sum(d) === 6,
  ],
  '108-1': [
    () => true,
    (d) => d[0] === 0 && d[1] === 0,
    (d) => d[2] === 7,
    (d) => d[2] + d[3] === 16,
    (d) => d[3] > d[2],
  ],
  '108-2': [
    () => true,
    (d) => d.slice(1).every((x) => x === 0),
    (d) => value(d) > 200000,
    (d) => value(d) < 400000,
    (d) => sum(d) === 3,
  ],
  '108-3': [
    () => true,
    (d) => d[0] === 0,
    (d) => three(d, 1) > 300 && three(d, 1) < 400,
    (d) => three(d, 1) === 373,
    (d) => sum(d) === 13,
  ],
};

/** 자릿수 n짜리 모든 후보를 술어로 걸러 남는 답 목록 */
function solve(length: number, rules: Rule[]): string[] {
  let candidates: number[][] = [[]];
  for (let i = 0; i < length; i += 1) {
    const next: number[][] = [];
    for (const c of candidates) for (let x = 0; x <= 9; x += 1) next.push([...c, x]);
    candidates = next;
  }
  return candidates.filter((d) => rules.every((r) => r(d))).map((d) => d.join(''));
}

test.describe('추리 모드 단서 논리', () => {
  test('모든 단서가 술어 목록과 1:1로 대응한다', () => {
    for (const episode of getDeductionEpisodes('ko')) {
      for (const stage of episode.stages) {
        const key = `${episode.id}-${stage.id}`;
        expect(RULES[key], `${key}의 술어가 정의되지 않았다`).toBeDefined();
        expect(RULES[key].length, `${key} 술어 개수`).toBe(stage.clues.length);
      }
    }
  });

  test('모든 단서가 정답에 대해 참이다', () => {
    // 예전에는 정답만 바꾸고 단서를 그대로 둬서, 거짓인 단서가 배포돼 있었다.
    for (const episode of getDeductionEpisodes('ko')) {
      for (const stage of episode.stages) {
        const key = `${episode.id}-${stage.id}`;
        const digits = stage.answer.split('').map(Number);
        RULES[key].forEach((rule, index) => {
          expect(rule(digits), `${key} 단서 T${stage.clues[index].turn}이 정답 ${stage.answer}에 대해 거짓`).toBe(true);
        });
      }
    }
  });

  test('단서를 모두 적용하면 정답이 유일하게 남는다', () => {
    for (const episode of getDeductionEpisodes('ko')) {
      for (const stage of episode.stages) {
        const key = `${episode.id}-${stage.id}`;
        const solutions = solve(getPinLength(stage.lockType), RULES[key]);
        expect(solutions, `${key}의 해`).toEqual([stage.answer]);
      }
    }
  });

  test('마지막 단서가 정답을 그대로 인쇄하지 않는다', () => {
    // 21스테이지 중 14곳이 "R=255, G=0, B=0 → 255000"처럼 답을 찍어 줬다.
    // 그러면 다섯 번 틀리기만 하면 되는 인내심 게임이 된다.
    for (const locale of locales) {
      for (const episode of getDeductionEpisodes(locale)) {
        for (const stage of episode.stages) {
          const last = stage.clues[stage.clues.length - 1].text;
          const digitsOnly = last.replace(/\D/g, '');
          expect(
            digitsOnly.includes(stage.answer),
            `${locale} ${episode.id}-${stage.id} 마지막 단서에 정답 ${stage.answer}이 그대로 있다: "${last}"`
          ).toBe(false);
        }
      }
    }
  });

  test('단서가 후보를 실제로 좁혀 나간다', () => {
    // 형식을 설명하는 첫 단서(“HHMM 형식입니다”)는 제약이 아니어도 된다.
    // 다만 **실제로 후보를 줄이는 단서가 충분히 있어야** 추리가 성립한다.
    for (const episode of getDeductionEpisodes('ko')) {
      for (const stage of episode.stages) {
        const key = `${episode.id}-${stage.id}`;
        const length = getPinLength(stage.lockType);
        const counts = RULES[key].map((_, i) => solve(length, RULES[key].slice(0, i + 1)).length);

        expect(counts[counts.length - 1], `${key}의 최종 후보`).toBe(1);

        const narrowing = counts.filter(
          (n, i) => n < (i === 0 ? 10 ** length : counts[i - 1])
        ).length;
        expect(narrowing, `${key}에서 후보를 줄이는 단서 수`).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
