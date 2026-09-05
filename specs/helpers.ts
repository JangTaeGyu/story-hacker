import { expect, type Page } from '@playwright/test';

/**
 * 클라이언트 하이드레이션이 끝날 때까지 기다린다.
 * 타이핑 효과는 클라이언트에서만 시작되므로, 본문에 글자가 찍혔다는 것은
 * 이펙트가 돌았다는 뜻이다 — 즉 키보드 리스너도 붙었다.
 * (하이드레이션 전에 키를 누르면 리스너가 아직 없어 입력이 사라진다.)
 */
export async function waitForStoryReady(page: Page) {
  await expect(page.locator('div.cursor-pointer').first()).not.toBeEmpty();
}

/**
 * 타이핑을 건너뛰고 PIN 입력 레이어를 연다.
 *
 * 진입 버튼은 글이 다 노출된 뒤에야 나타나므로, 본문을 탭해 타이핑을
 * 먼저 끝낸다. 그냥 기다려도 되지만 스테이지마다 5초씩 걸린다.
 */
export async function openLock(page: Page) {
  // 추리 모드에는 타이핑 효과가 없어 스킵할 영역도 없다.
  const typingArea = page.locator('div.cursor-pointer').first();
  if (await typingArea.count()) {
    await expect(typingArea).not.toBeEmpty();
    await typingArea.click();
  }
  await page.getByRole('button', { name: /^(PIN 입력|Enter PIN)$/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
}

/** PIN 디스플레이에 채워진 자리 수 */
export function filledDigits(page: Page) {
  return page.locator('[data-testid="pin-display"] span').count();
}
