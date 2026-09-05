import { test, expect } from '@playwright/test';

// EP.1 S1 단서의 마지막 줄 — 타이핑이 끝까지 진행돼야 눈에 보인다.
const CLUE_TAIL = '낡은 폴더폰을 쓰던 시절처럼 눌러라.';

/**
 * 아직 타이핑이 닿지 않은 글자 수.
 *
 * 본문은 처음부터 통째로 DOM에 있고(크롤러가 읽어야 하므로), 타이핑은 어디까지
 * 보이는지만 정한다. 그래서 "본문이 DOM에 있는가"로는 진행도를 알 수 없고,
 * 투명 처리된 꼬리의 길이를 봐야 한다. 0이면 전문이 드러난 것이다.
 */
async function hiddenTailLength(page: import('@playwright/test').Page) {
  return page
    .locator('div.cursor-pointer span.text-transparent')
    .evaluateAll((spans) =>
      spans.reduce((sum, span) => sum + (span.textContent ?? '').length, 0)
    );
}

test.describe('스토리 모드 타이핑 효과', () => {
  test('본문을 탭하면 전체 텍스트가 즉시 표시되고 되돌아가지 않는다', async ({ page }) => {
    await page.goto('/ko/story/1');

    const typingArea = page.locator('div.cursor-pointer').first();

    // 타이핑이 시작되기를 기다린다 (delay 300ms 이후).
    await expect(typingArea).toContainText('새벽', { timeout: 5000 });

    // 아직 끝나지 않은 상태여야 스킵을 검증할 수 있다.
    expect(await hiddenTailLength(page)).toBeGreaterThan(0);
    await expect(page.getByText(CLUE_TAIL)).toBeHidden();

    await typingArea.click();

    // 스킵 즉시 전문이 드러나야 한다.
    await expect(page.getByText(CLUE_TAIL)).toBeVisible({ timeout: 1000 });
    expect(await hiddenTailLength(page)).toBe(0);

    // 회귀 방지: 인터벌이 살아 있으면 여기서 짧은 슬라이스로 덮어써진다.
    await page.waitForTimeout(800);
    expect(await hiddenTailLength(page)).toBe(0);
    await expect(page.getByText(CLUE_TAIL)).toBeVisible();

    // 타이핑이 끝났으므로 스킵 안내는 사라져야 한다.
    await expect(page.getByText('탭하여 스킵')).toBeHidden();
  });
});

test.describe('NOCTURNE 테마 토큰', () => {
  test('noct-page 유틸리티가 실제 배경색으로 적용된다', async ({ page }) => {
    await page.goto('/ko/deduction/101');

    // tailwind.config.ts에 토큰이 없으면 클래스가 생성되지 않아 transparent가 된다.
    const bg = await page
      .locator('div.bg-noct-page')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(bg).toBe('rgb(10, 9, 8)');
  });
});
