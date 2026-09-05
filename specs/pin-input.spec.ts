import { test, expect } from '@playwright/test';
import { filledDigits, openLock, waitForStoryReady } from './helpers';

test.describe('PIN 입력', () => {
  test('키패드로 한 자리 삭제와 전체 지움이 동작한다', async ({ page }) => {
    await page.goto('/story/1');
    await openLock(page);

    for (const digit of ['1', '2', '3']) {
      await page.getByRole('button', { name: digit, exact: true }).click();
    }
    expect(await filledDigits(page)).toBe(3);

    // 한 자리 삭제
    await page.getByRole('button', { name: '한 자리 삭제' }).click();
    expect(await filledDigits(page)).toBe(2);

    // 전체 지움
    await page.getByRole('button', { name: '전체 지움' }).click();
    expect(await filledDigits(page)).toBe(0);

    // 입력이 없으면 삭제 버튼들은 비활성화된다
    await expect(page.getByRole('button', { name: '한 자리 삭제' })).toBeDisabled();
    await expect(page.getByRole('button', { name: '전체 지움' })).toBeDisabled();
  });

  test('물리 키보드로 입력·삭제·제출할 수 있다', async ({ page }) => {
    await page.goto('/story/1');
    await waitForStoryReady(page);

    // 숫자를 누르면 닫혀 있던 입력 레이어가 자동으로 열린다
    await page.keyboard.press('1');
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(await filledDigits(page)).toBe(1);

    await page.keyboard.press('2');
    await page.keyboard.press('3');
    expect(await filledDigits(page)).toBe(3);

    await page.keyboard.press('Backspace');
    expect(await filledDigits(page)).toBe(2);

    // EP.1 스테이지 1 정답을 키보드로 입력하고 Enter로 제출
    await page.getByRole('button', { name: '전체 지움' }).click();
    for (const digit of '4673') {
      await page.keyboard.press(digit);
    }
    await page.keyboard.press('Enter');

    // 다음 스테이지로 넘어가고 레이어는 닫힌다
    await expect(page.getByText('STAGE 2 / 4')).toBeVisible();
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});

test.describe('PIN 입력 레이어', () => {
  test('본문을 다 읽기 전에는 진입 버튼이 없다', async ({ page }) => {
    await page.goto('/story/1');
    await waitForStoryReady(page);

    // 타이핑이 도는 동안에는 버튼이 아직 없다
    await expect(page.getByText('탭하여 스킵')).toBeVisible();
    await expect(page.getByRole('button', { name: 'PIN 입력' })).toBeHidden();

    // 탭해서 스킵하면 곧바로 나타난다
    await page.locator('div.cursor-pointer').first().click();
    await expect(page.getByRole('button', { name: 'PIN 입력' })).toBeVisible();
  });

  test('레이어 안에서 단서를 다시 읽을 수 있다', async ({ page }) => {
    await page.goto('/story/1');
    await openLock(page);

    // 본문이 가려지므로 단서가 레이어 안에도 있어야 한다
    await expect(
      page.getByRole('dialog').getByText('낡은 폴더폰을 쓰던 시절처럼 눌러라.')
    ).toBeVisible();
  });

  test('Escape·✕·배경 클릭으로 닫힌다', async ({ page }) => {
    await page.goto('/story/1');

    await openLock(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    await page.getByRole('button', { name: 'PIN 입력' }).click();
    await page.getByRole('button', { name: '닫기' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});
