import { test, expect } from '@playwright/test';
import { filledDigits, waitForStoryReady } from './helpers';

test.describe('PIN 입력', () => {
  test('키패드로 한 자리 삭제와 전체 지움이 동작한다', async ({ page }) => {
    await page.goto('/story/1');
    await waitForStoryReady(page);
    await page.getByRole('button', { name: 'PIN 입력' }).click();

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

    // 숫자를 누르면 접혀 있던 키패드가 자동으로 펼쳐진다
    await page.keyboard.press('1');
    await expect(page.locator('[data-testid="pin-display"]')).toBeVisible();
    expect(await filledDigits(page)).toBe(1);

    await page.keyboard.press('2');
    await page.keyboard.press('3');
    expect(await filledDigits(page)).toBe(3);

    await page.keyboard.press('Backspace');
    expect(await filledDigits(page)).toBe(2);

    await page.keyboard.press('Escape');
    expect(await filledDigits(page)).toBe(0);

    // EP.1 스테이지 1 정답을 키보드로 입력하고 Enter로 제출
    for (const digit of '4673') {
      await page.keyboard.press(digit);
    }
    await page.keyboard.press('Enter');

    // 다음 스테이지로 넘어간다
    await expect(page.getByText('STAGE 2 / 4')).toBeVisible();
  });
});
