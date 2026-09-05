import { test, expect, type Page } from '@playwright/test';
import { openLock } from './helpers';

/**
 * 데스크톱(≥lg) 레이아웃을 고정한다.
 *
 * 나머지 스펙은 전부 모바일 뷰포트(Pixel 7)에서 돌기 때문에, 여기서 막지 않으면
 * 데스크톱이 깨져도 아무도 알아채지 못한다.
 * playwright.config.ts의 `desktop` 프로젝트만 이 파일을 실행한다.
 */

/** 가로 스크롤바가 생기면 어딘가 폭 계산이 틀린 것이다 */
async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
}

const GAME_ROUTES = [
  ['스토리', '/ko/story/1'],
  ['추리', '/ko/deduction/101'],
] as const;

for (const [label, path] of GAME_ROUTES) {
  test.describe(`${label} 모드 게임 화면 (데스크톱)`, () => {
    test('본문이 단일 컬럼이고, 하단 고정 입력 영역이 없다', async ({ page }) => {
      await page.goto(path);

      // 키패드는 레이어로만 뜬다 — 화면에 붙박이로 있으면 안 된다
      await expect(page.locator('footer')).toHaveCount(0);
      await expect(page.locator('[data-testid="pin-display"]')).toBeHidden();

      // 읽기 폭(max-w-2xl = 672px)을 넘지 않는다
      const body = page.locator('.animate-fadeInUp').first();
      const box = (await body.boundingBox())!;
      expect(box.width).toBeLessThanOrEqual(673);
    });

    test('레이어를 열면 키패드가 화면 중앙에 뜬다', async ({ page }) => {
      await page.goto(path);
      await openLock(page);

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(page.locator('[data-testid="pin-display"]')).toBeVisible();

      // 모바일용 하단 시트가 아니라 세로 가운데에 놓인다
      const panel = dialog.locator('> div');
      const box = (await panel.boundingBox())!;
      const viewport = page.viewportSize()!;
      const centerOffset = Math.abs(box.y + box.height / 2 - viewport.height / 2);
      expect(centerOffset).toBeLessThan(40);
    });

    test('가로 스크롤이 생기지 않는다', async ({ page }) => {
      await page.goto(path);
      expect(await hasHorizontalOverflow(page)).toBe(false);
    });
  });
}

test.describe('에피소드 목록 (데스크톱)', () => {
  test('스토리 목록이 여러 열로 배치된다', async ({ page }) => {
    await page.goto('/ko/story');

    const cards = page.locator('a[href^="/ko/story/"]');
    const first = (await cards.nth(0).boundingBox())!;
    const second = (await cards.nth(1).boundingBox())!;

    // 같은 행에 나란히 — y는 같고 x는 다르다
    expect(Math.abs(first.y - second.y)).toBeLessThan(4);
    expect(second.x).toBeGreaterThan(first.x + first.width - 1);
  });

  test('가로 스크롤이 생기지 않는다', async ({ page }) => {
    for (const path of ['/ko', '/ko/mode-select', '/ko/story', '/ko/deduction']) {
      await page.goto(path);
      expect(await hasHorizontalOverflow(page), `${path}에서 가로 스크롤 발생`).toBe(false);
    }
  });
});

test('본문 랜드마크(main)는 문서에 하나만 존재한다', async ({ page }) => {
  await page.goto('/ko/story/1');
  await expect(page.locator('main')).toHaveCount(1);
});
