import { test, expect, type Page } from '@playwright/test';
import { waitForStoryReady } from './helpers';

const RUN_KEY = 'story-hacker-run';

function readRuns(page: Page) {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, RUN_KEY);
}

/** EP.1 스테이지 1을 풀어 스테이지 2로 넘어간다 */
async function clearFirstStage(page: Page) {
  await waitForStoryReady(page);
  for (const digit of '4673') {
    await page.keyboard.press(digit);
  }
  await page.keyboard.press('Enter');
  await expect(page.getByText('STAGE 2 / 4')).toBeVisible();
}

test.describe('이어하기', () => {
  test('스테이지를 넘기면 이어하기 지점이 저장된다', async ({ page }) => {
    await page.goto('/ko/story/1');
    await clearFirstStage(page);

    const runs = await readRuns(page);
    expect(runs?.['story-1']?.stageIndex).toBe(1);
  });

  test('다시 들어오면 이어하기를 묻고, 이어서 시작하면 그 스테이지로 간다', async ({ page }) => {
    await page.goto('/ko/story/1');
    await clearFirstStage(page);

    // 에피소드를 끝내지 않고 이탈했다가 다시 진입
    await page.goto('/ko/story');
    await expect(page.getByText('Stage 2 진행 중')).toBeVisible();

    await page.goto('/ko/story/1');
    await expect(page.getByText('이어하기')).toBeVisible();
    await page.getByRole('button', { name: '이어서 시작' }).click();

    await expect(page.getByText('STAGE 2 / 4')).toBeVisible();
  });

  test('처음부터를 고르면 이어하기 지점이 지워진다', async ({ page }) => {
    await page.goto('/ko/story/1');
    await clearFirstStage(page);

    await page.goto('/ko/story/1');
    await page.getByRole('button', { name: '처음부터' }).click();

    await expect(page.getByText('STAGE 1 / 4')).toBeVisible();
    const runs = await readRuns(page);
    expect(runs?.['story-1']).toBeUndefined();
  });

  test('에피소드를 끝내면 이어하기 지점이 사라진다', async ({ page }) => {
    await page.goto('/ko/story/1');
    await waitForStoryReady(page);

    for (const answer of ['4673', '3764', '241225', '1208']) {
      for (const digit of answer) {
        await page.keyboard.press(digit);
      }
      await page.keyboard.press('Enter');
    }

    await expect(page).toHaveURL(/\/story\/1\/complete/, { timeout: 10_000 });
    await page.waitForTimeout(300);

    const runs = await readRuns(page);
    expect(runs?.['story-1']).toBeUndefined();
  });
});

test.describe('게임오버 화면', () => {
  test('정답을 노출하지 않는다', async ({ page }) => {
    await page.goto('/ko/story/1/gameover?stage=0');

    await expect(page.getByText('수사 실패')).toBeVisible();
    // 스테이지 1의 정답
    await expect(page.getByText('4673')).toBeHidden();
    // 대신 스테이지 정보를 보여준다
    await expect(page.getByText('흘리고 간 수첩')).toBeVisible();
  });
});
