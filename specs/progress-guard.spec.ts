import { test, expect, type Page } from '@playwright/test';
import { waitForStoryReady } from './helpers';

const PROGRESS_KEY = 'story-hacker-progress';

// EP.1의 스테이지별 정답 (4스테이지)
const EP1_ANSWERS = ['4673', '3764', '241225', '1208'];

function readProgress(page: Page) {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, PROGRESS_KEY);
}

test.describe('진행도 기록 가드', () => {
  test('완료 화면에 URL로 직접 들어가면 클리어가 기록되지 않는다', async ({ page }) => {
    await page.goto('/ko/story/1/complete?stars=3');

    // 저장 로직은 localStorage 초기화 이후 effect에서 돈다
    await expect(page.getByText('사건 해결')).toBeVisible();
    await page.waitForTimeout(500);

    const progress = await readProgress(page);
    expect(progress?.completedEpisodes?.['1']).toBeUndefined();
  });

  test('실제로 플레이해서 끝내면 클리어가 기록된다', async ({ page }) => {
    await page.goto('/ko/story/1');
    await waitForStoryReady(page);

    for (let index = 0; index < EP1_ANSWERS.length; index++) {
      for (const digit of EP1_ANSWERS[index]) {
        await page.keyboard.press(digit);
      }
      await page.keyboard.press('Enter');

      if (index < EP1_ANSWERS.length - 1) {
        await expect(page.getByText(`STAGE ${index + 2} / 4`)).toBeVisible();
      }
    }

    // 성공 오버레이 → 1.5초 후 완료 화면으로 이동
    await expect(page).toHaveURL(/\/story\/1\/complete/, { timeout: 10_000 });
    await page.waitForTimeout(500);

    const progress = await readProgress(page);
    expect(progress?.completedEpisodes?.['1']).toEqual({ stars: 3, completed: true });
  });

  test('완료 화면을 새로고침해도 토큰이 재사용되지 않는다', async ({ page }) => {
    // 토큰 없이 들어온 상태에서 새로고침을 반복해도 기록이 생기지 않아야 한다
    await page.goto('/ko/story/2/complete?stars=3');
    await page.reload();
    await expect(page.getByText('사건 해결')).toBeVisible();
    await page.waitForTimeout(500);

    const progress = await readProgress(page);
    expect(progress?.completedEpisodes?.['2']).toBeUndefined();
  });
});
