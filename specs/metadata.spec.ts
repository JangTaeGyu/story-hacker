import { test, expect } from '@playwright/test';

const SITE_URL = 'https://story-hacker.jubrolab.dev';

async function meta(page: import('@playwright/test').Page, property: string) {
  return page.locator(`meta[property="${property}"]`).first().getAttribute('content');
}

test.describe('메타데이터', () => {
  test('스토리 에피소드마다 제목·설명·OG 이미지가 다르다', async ({ page }) => {
    await page.goto('/story/1');
    const first = {
      title: await page.title(),
      description: await meta(page, 'og:description'),
      image: await meta(page, 'og:image'),
    };

    await page.goto('/story/7');
    const second = {
      title: await page.title(),
      description: await meta(page, 'og:description'),
      image: await meta(page, 'og:image'),
    };

    // 에피소드 고유 정보가 들어가야 한다
    expect(first.title).toContain('수상한 이웃');
    expect(second.title).toContain('병원 탈출');
    // 사이트명 템플릿이 붙는다
    expect(first.title).toContain('Story Hacker');

    // 셋 다 에피소드별로 달라야 한다
    expect(first.title).not.toBe(second.title);
    expect(first.description).not.toBe(second.description);
    expect(first.image).not.toBe(second.image);

    // synopsis가 설명으로 쓰인다
    expect(first.description).toContain('옆집 남자');
  });

  test('추리 에피소드도 고유 제목을 갖는다', async ({ page }) => {
    await page.goto('/deduction/101');
    expect(await page.title()).toContain('숫자 추리');
  });

  test('OG 도메인이 실제 배포 도메인과 일치한다', async ({ page }) => {
    await page.goto('/');
    const url = await meta(page, 'og:url');
    const image = await meta(page, 'og:image');

    expect(url).toBe(SITE_URL);
    expect(image).toContain(SITE_URL);
    expect(image).not.toContain('vercel.app');
  });
});

test.describe('SEO 라우트', () => {
  test('robots.txt가 사이트맵을 가리키고 결과 화면을 제외한다', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();

    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    expect(body).toContain('/story/*/complete');
    expect(body).toContain('/deduction/*/gameover');
  });

  test('sitemap.xml에 전체 에피소드가 들어 있다', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text();

    expect(body).toContain(`${SITE_URL}/story/1<`);
    expect(body).toContain(`${SITE_URL}/story/20<`);
    expect(body).toContain(`${SITE_URL}/deduction/108<`);
    // 결과 화면은 색인 대상이 아니다
    expect(body).not.toContain('/complete');
  });
});

test.describe('오류 화면', () => {
  test('없는 에피소드는 not-found 화면을 보여준다', async ({ page }) => {
    const response = await page.goto('/story/999');

    expect(response?.status()).toBe(404);
    await expect(page.getByText('기록 없음')).toBeVisible();
  });
});
