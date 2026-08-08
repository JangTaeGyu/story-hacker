import { test, expect } from '@playwright/test';
import { waitForStoryReady } from './helpers';

test.describe('접근성', () => {
  test('핀치 줌을 막지 않는다', async ({ page }) => {
    await page.goto('/story/1');

    const viewport = await page
      .locator('meta[name="viewport"]')
      .getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).not.toContain('user-scalable=no');
    expect(viewport).not.toContain('maximum-scale');
  });

  test('모션 감소를 선호하면 타이핑 없이 전문이 바로 보인다', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/story/1');

    const typingArea = page.locator('div.cursor-pointer').first();

    // 타이핑이라면 200자를 찍는 데 5초가 걸린다. 즉시 전문이 나와야 한다.
    await expect(typingArea).toContainText('낡은 폴더폰을 쓰던 시절처럼 눌러라.', {
      timeout: 1500,
    });
    // 진행 중 표시(스킵 안내)도 뜨지 않는다
    await expect(page.getByText('탭하여 스킵')).toBeHidden();
  });

  test('모션 감소를 선호하면 CSS 애니메이션이 무력화된다', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/story/1');
    await waitForStoryReady(page);

    const duration = await page
      .locator('.animate-fadeInUp')
      .first()
      .evaluate((el) => getComputedStyle(el).animationDuration);

    expect(parseFloat(duration)).toBeLessThan(0.05);
  });

  test('키보드로 이동한 포커스가 눈에 보인다', async ({ page }) => {
    await page.goto('/story/1');
    await waitForStoryReady(page);

    // :focus-visible은 프로그램적 focus()가 아니라 키보드 상호작용에 반응한다.
    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
      };
    });

    expect(focused).not.toBeNull();
    expect(focused!.outlineStyle).toBe('solid');
    expect(focused!.outlineWidth).toBeGreaterThan(0);
  });

  test('이어하기 오버레이가 다이얼로그로 노출되고 포커스를 받는다', async ({ page }) => {
    // 스테이지 1을 풀어 이어하기 지점을 만든다
    await page.goto('/story/1');
    await waitForStoryReady(page);
    for (const digit of '4673') {
      await page.keyboard.press(digit);
    }
    await page.keyboard.press('Enter');
    await expect(page.getByText('STAGE 2 / 4')).toBeVisible();

    await page.goto('/story/1');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(page.getByRole('button', { name: '이어서 시작' })).toBeFocused();
  });
});
