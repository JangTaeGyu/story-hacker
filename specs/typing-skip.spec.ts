import { test, expect } from '@playwright/test';

// EP.1 S1 단서의 마지막 줄 — 타이핑이 끝까지 진행돼야만 나타난다.
const CLUE_TAIL = '낡은 폴더폰을 쓰던 시절처럼 눌러라.';

test.describe('스토리 모드 타이핑 효과', () => {
  test('본문을 탭하면 전체 텍스트가 즉시 표시되고 되돌아가지 않는다', async ({ page }) => {
    await page.goto('/story/1');

    const typingArea = page.locator('div.cursor-pointer').first();

    // 타이핑이 시작되기를 기다린다 (delay 300ms 이후).
    await expect(typingArea).toContainText('새벽', { timeout: 5000 });

    // 아직 끝나지 않은 상태여야 스킵을 검증할 수 있다.
    await expect(typingArea).not.toContainText(CLUE_TAIL);

    await typingArea.click();

    // 스킵 즉시 전체 텍스트가 나와야 한다.
    await expect(typingArea).toContainText(CLUE_TAIL, { timeout: 1000 });

    // 회귀 방지: 인터벌이 살아 있으면 여기서 짧은 슬라이스로 덮어써진다.
    const afterSkip = await typingArea.innerText();
    await page.waitForTimeout(800);
    expect(await typingArea.innerText()).toBe(afterSkip);
    await expect(typingArea).toContainText(CLUE_TAIL);

    // 타이핑이 끝났으므로 스킵 안내는 사라져야 한다.
    await expect(page.getByText('탭하여 스킵')).toBeHidden();
  });
});

test.describe('NOCTURNE 테마 토큰', () => {
  test('noct-page 유틸리티가 실제 배경색으로 적용된다', async ({ page }) => {
    await page.goto('/deduction/101');

    // tailwind.config.ts에 토큰이 없으면 클래스가 생성되지 않아 transparent가 된다.
    const bg = await page
      .locator('div.bg-noct-page')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(bg).toBe('rgb(10, 9, 8)');
  });
});
