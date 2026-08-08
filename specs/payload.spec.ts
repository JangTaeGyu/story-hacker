import { test, expect, type Page, type APIRequestContext } from '@playwright/test';

/**
 * 결과·목록 화면은 클라이언트 컴포넌트지만, 에피소드 배열을 직접 import하지 않고
 * 서버에서 필요한 값만 넘겨받는다. 되돌아가면 본문·단서·정답이 통째로
 * 클라이언트 번들에 실린다(스토리 모드 기준 약 25~30kB).
 *
 * 에피소드 데이터가 클라이언트에 닿는 경로는 두 가지다.
 * - 클라이언트 컴포넌트가 직접 import → JS 청크에 포함
 * - 서버 컴포넌트가 props로 전달 → HTML 안 RSC 페이로드에 포함
 * 둘 다 확인해야 의미가 있다.
 */

// EP.1 스테이지 1의 본문 일부 — 에피소드 데이터가 실렸다면 반드시 등장한다.
const EP1_STORY_FRAGMENT = '303호 남자가 계단을 내려간다';

interface Delivered {
  inHtml: boolean;
  inScripts: boolean;
}

async function deliveredTo(
  page: Page,
  request: APIRequestContext,
  path: string,
  needle: string
): Promise<Delivered> {
  const scriptUrls = new Set<string>();
  page.on('response', (res) => {
    const url = res.url();
    if (url.includes('/_next/static/') && url.endsWith('.js')) scriptUrls.add(url);
  });

  const response = await page.goto(path);
  await page.waitForLoadState('load');
  await page.waitForTimeout(500);

  expect(scriptUrls.size).toBeGreaterThan(0);

  const html = (await response!.text()) ?? '';
  let inScripts = false;
  for (const url of scriptUrls) {
    const body = await (await request.get(url)).text();
    if (body.includes(needle)) {
      inScripts = true;
      break;
    }
  }
  return { inHtml: html.includes(needle), inScripts };
}

test.describe('클라이언트 전달 페이로드', () => {
  for (const [label, path] of [
    ['에피소드 목록', '/story'],
    ['완료 화면', '/story/1/complete?stars=3'],
    ['게임오버 화면', '/story/1/gameover?stage=0'],
  ] as const) {
    test(`${label}에 스토리 본문이 실리지 않는다`, async ({ page, request }) => {
      const delivered = await deliveredTo(page, request, path, EP1_STORY_FRAGMENT);
      expect(delivered).toEqual({ inHtml: false, inScripts: false });
    });
  }

  test('게임 플레이 화면에는 실린다 — 검사 방식 자체의 유효성 확인', async ({
    page,
    request,
  }) => {
    // 정답을 대조해야 하므로 여기서는 데이터가 반드시 전달되어야 한다.
    const delivered = await deliveredTo(page, request, '/story/1', EP1_STORY_FRAGMENT);
    expect(delivered.inHtml).toBe(true);
  });
});
