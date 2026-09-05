import { test, expect } from '@playwright/test';
import { locales, type Locale } from '../lib/i18n';
import { getStoryEpisodes } from '../data/storyEpisodes';
import { getDeductionEpisodes } from '../data/deductionEpisodes';
import { getPinLength } from '../lib/utils';

/**
 * 언어판은 **글만 다르고 판은 같아야 한다.**
 *
 * 진행도(`story-hacker-progress`)·이어하기·클리어 증표는 전부 에피소드 id에
 * 묶여 있고, EP.11–20은 앞 화의 정답을 다음 화의 재료로 쓴다. 어느 한 언어에서
 * 정답이나 스테이지 수가 어긋나면, 언어를 바꾼 순간 기록이 뒤섞이거나 풀 수
 * 없는 스테이지가 생긴다.
 *
 * 특히 EP.13 스테이지 2는 원래 한글 초성에 기대던 퍼즐이라 번역판에서 장치를
 * 통째로 바꿨다 — 그래도 정답은 8034로 같아야 한다는 것을 여기서 못 박는다.
 *
 * 브라우저를 쓰지 않는 순수 데이터 검사다.
 */

const otherLocales = locales.filter((locale) => locale !== 'ko') as Locale[];

test.describe('에피소드 언어판 정합성', () => {
  test('스토리: id·난이도·자물쇠·정답·턴 수가 세 언어에서 같다', () => {
    const ko = getStoryEpisodes('ko');

    for (const locale of otherLocales) {
      const other = getStoryEpisodes(locale);
      expect(other.map((ep) => ep.id), `${locale} 에피소드 id 목록`).toEqual(
        ko.map((ep) => ep.id)
      );

      for (const [index, episode] of ko.entries()) {
        const target = other[index];
        const where = `${locale} EP.${episode.id}`;

        expect(target.difficulty, `${where} 난이도`).toBe(episode.difficulty);
        expect(target.stages.length, `${where} 스테이지 수`).toBe(episode.stages.length);

        for (const [stageIndex, stage] of episode.stages.entries()) {
          const targetStage = target.stages[stageIndex];
          const stageWhere = `${where} 스테이지 ${stage.id}`;

          expect(targetStage.id, `${stageWhere} id`).toBe(stage.id);
          expect(targetStage.lockType, `${stageWhere} lockType`).toBe(stage.lockType);
          expect(targetStage.maxTurns, `${stageWhere} maxTurns`).toBe(stage.maxTurns);
          expect(targetStage.answers, `${stageWhere} 정답`).toEqual(stage.answers);
        }
      }
    }
  });

  test('추리: id·정답·단서 공개 순서가 세 언어에서 같다', () => {
    const ko = getDeductionEpisodes('ko');

    for (const locale of otherLocales) {
      const other = getDeductionEpisodes(locale);
      expect(other.map((ep) => ep.id), `${locale} 에피소드 id 목록`).toEqual(
        ko.map((ep) => ep.id)
      );

      for (const [index, episode] of ko.entries()) {
        const target = other[index];
        const where = `${locale} EP.${episode.id - 100}`;

        expect(target.difficulty, `${where} 난이도`).toBe(episode.difficulty);
        expect(target.stages.length, `${where} 스테이지 수`).toBe(episode.stages.length);

        for (const [stageIndex, stage] of episode.stages.entries()) {
          const targetStage = target.stages[stageIndex];
          const stageWhere = `${where} 스테이지 ${stage.id}`;

          expect(targetStage.answer, `${stageWhere} 정답`).toBe(stage.answer);
          expect(targetStage.lockType, `${stageWhere} lockType`).toBe(stage.lockType);
          expect(targetStage.maxTurns, `${stageWhere} maxTurns`).toBe(stage.maxTurns);
          expect(
            targetStage.clues.map((clue) => clue.turn),
            `${stageWhere} 단서 공개 턴`
          ).toEqual(stage.clues.map((clue) => clue.turn));
        }
      }
    }
  });

  test('모든 언어에서 정답 길이가 PIN 자릿수와 일치한다', () => {
    for (const locale of locales) {
      for (const episode of getStoryEpisodes(locale)) {
        for (const stage of episode.stages) {
          const expected = getPinLength(stage.lockType);
          for (const answer of stage.answers) {
            expect(
              answer.length,
              `${locale} EP.${episode.id} 스테이지 ${stage.id}: "${answer}"`
            ).toBe(expected);
          }
        }
      }

      for (const episode of getDeductionEpisodes(locale)) {
        for (const stage of episode.stages) {
          expect(
            stage.answer.length,
            `${locale} 추리 EP.${episode.id - 100} 스테이지 ${stage.id}`
          ).toBe(getPinLength(stage.lockType));
        }
      }
    }
  });

  test('번역판에 원문이 그대로 남아 있지 않다', () => {
    // 번역이 누락되면 en/ja 화면에 한글 본문이 그대로 뜬다.
    const hangul = /[가-힣]/;

    for (const locale of otherLocales) {
      for (const episode of getStoryEpisodes(locale)) {
        expect(hangul.test(episode.title), `${locale} EP.${episode.id} 제목`).toBe(false);
        for (const stage of episode.stages) {
          const where = `${locale} EP.${episode.id} 스테이지 ${stage.id}`;
          expect(hangul.test(stage.title), `${where} 제목`).toBe(false);
          expect(hangul.test(stage.story), `${where} 본문`).toBe(false);
          expect(hangul.test(stage.clue), `${where} 단서`).toBe(false);
          expect(hangul.test(stage.hint), `${where} 힌트`).toBe(false);
        }
      }

      for (const episode of getDeductionEpisodes(locale)) {
        for (const stage of episode.stages) {
          const where = `${locale} 추리 EP.${episode.id - 100} 스테이지 ${stage.id}`;
          expect(hangul.test(stage.situation), `${where} 상황`).toBe(false);
          for (const clue of stage.clues) {
            expect(hangul.test(clue.text), `${where} 단서 T${clue.turn}`).toBe(false);
          }
        }
      }
    }
  });
});
