import { expect, type Page } from '@playwright/test';

/**
 * 클라이언트 하이드레이션이 끝날 때까지 기다린다.
 * 타이핑 효과는 클라이언트에서만 시작되므로 좋은 신호가 된다.
 * (하이드레이션 전에 키를 누르면 keydown 리스너가 아직 붙지 않아 입력이 사라진다.)
 */
export async function waitForStoryReady(page: Page) {
  await expect(page.locator('div.cursor-pointer').first()).not.toBeEmpty();
  await expect(page.getByRole('button', { name: 'PIN 입력' })).toBeVisible();
}

/** PIN 디스플레이에 채워진 자리 수 */
export function filledDigits(page: Page) {
  return page.locator('[data-testid="pin-display"] span').count();
}
