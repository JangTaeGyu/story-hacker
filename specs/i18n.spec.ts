import { test, expect } from '@playwright/test';

const SITE_URL = 'https://story-hacker.jubrolab.dev';

/**
 * 다국어 라우팅과 hreflang.
 *
 * 검색 유입이 걸린 부분이라 눈으로는 잘 안 보인다 — canonical이 빠지면 세 언어판이
 * 중복 문서로 묶이고, 옛 주소의 리다이렉트가 끊기면 이미 색인된 링크가 통째로
 * 404가 된다. 둘 다 배포 후에야 드러나므로 여기서 고정한다.
 */

test.describe('언어 라우팅', () => {
  test('접두사 없는 옛 주소가 한국어판으로 넘어간다', async ({ page }) => {
    // 다국어 도입 전에 공유·색인된 링크가 여기에 걸려 있다.
    await page.goto('/story/1');
    await expect(page).toHaveURL(/\/ko\/story\/1$/);

    await page.goto('/deduction/101');
    await expect(page).toHaveURL(/\/ko\/deduction\/101$/);

    await page.goto('/mode-select');
    await expect(page).toHaveURL(/\/ko\/mode-select$/);
  });

  test('루트는 기본 언어로 보낸다', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/ko$/);
  });

  test('등록되지 않은 언어 코드는 404다', async ({ page }) => {
    const response = await page.goto('/fr/story/1');
    expect(response?.status()).toBe(404);
  });

  test('세 언어 모두 같은 에피소드를 연다', async ({ page }) => {
    for (const [locale, title] of [
      ['ko', '흘리고 간 수첩'],
      ['en', 'The Dropped Notebook'],
      ['ja', '落とされた手帳'],
    ]) {
      await page.goto(`/${locale}/story/1`);
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  test('html lang이 언어를 따라간다', async ({ page }) => {
    for (const locale of ['ko', 'en', 'ja']) {
      await page.goto(`/${locale}/story`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
  });

  test('언어 전환은 보고 있던 화면의 같은 위치로 간다', async ({ page }) => {
    await page.goto('/ko/story');
    await page.getByRole('navigation', { name: '언어' }).getByRole('link', { name: 'en' }).click();
    await expect(page).toHaveURL(/\/en\/story$/);
    // 목록 화면 그대로여야 한다 — 홈으로 튕기면 안 된다
    await expect(page.getByRole('heading', { level: 1, name: 'Case Files' })).toBeVisible();
  });
});

test.describe('hreflang · canonical', () => {
  test('모든 언어판이 자기 canonical과 3개 언어 alternate를 낸다', async ({ page }) => {
    for (const locale of ['ko', 'en', 'ja']) {
      await page.goto(`/${locale}/story/1`);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${SITE_URL}/${locale}/story/1`
      );

      for (const [hreflang, expected] of [
        ['ko-KR', `${SITE_URL}/ko/story/1`],
        ['en-US', `${SITE_URL}/en/story/1`],
        ['ja-JP', `${SITE_URL}/ja/story/1`],
        // x-default는 기본 언어를 가리킨다
        ['x-default', `${SITE_URL}/ko/story/1`],
      ]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)
        ).toHaveAttribute('href', expected);
      }
    }
  });

  test('결과 화면은 noindex다', async ({ page }) => {
    // robots.txt로도 막지만, 외부 링크로 들어오는 경우까지 덮으려면 메타가 필요하다.
    await page.goto('/ko/story/1/complete?stars=3');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
  });
});

test.describe('구조화 데이터', () => {
  async function jsonLd(page: import('@playwright/test').Page) {
    return page.locator('script[type="application/ld+json"]').allTextContents();
  }

  test('홈에 WebSite·VideoGame 그래프가 있다', async ({ page }) => {
    await page.goto('/en');
    const blocks = (await jsonLd(page)).map((raw) => JSON.parse(raw));
    const graph = blocks.find((block) => block['@graph']);

    expect(graph).toBeTruthy();
    const types = graph['@graph'].map((node: { '@type': string }) => node['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('VideoGame');
  });

  test('에피소드 페이지에 VideoGame과 BreadcrumbList가 있다', async ({ page }) => {
    await page.goto('/ko/story/1');
    const types = (await jsonLd(page))
      .map((raw) => JSON.parse(raw))
      .map((block) => block['@type']);

    expect(types).toContain('VideoGame');
    expect(types).toContain('BreadcrumbList');
  });

  test('에피소드 목록에 ItemList가 있다', async ({ page }) => {
    await page.goto('/ko/story');
    const blocks = (await jsonLd(page)).map((raw) => JSON.parse(raw));
    const collection = blocks.find((block) => block['@type'] === 'CollectionPage');

    expect(collection).toBeTruthy();
    expect(collection.mainEntity['@type']).toBe('ItemList');
    expect(collection.mainEntity.numberOfItems).toBe(20);
  });
});
