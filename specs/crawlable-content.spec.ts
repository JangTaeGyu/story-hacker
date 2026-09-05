import { test, expect } from '@playwright/test';

/**
 * 크롤러가 보는 본문.
 *
 * 사이트에서 검색에 걸릴 만한 글이 있는 곳은 에피소드 페이지뿐이다. 그런데
 * 예전에는 타이핑 효과가 빈 문자열에서 시작해 클라이언트에서 글자를 채웠기
 * 때문에, **서버가 내려주는 HTML에는 스테이지 제목만 있고 본문이 없었다.**
 * 60개 에피소드 페이지가 전부 내용 없는 페이지로 취급됐다.
 *
 * 구글은 JS를 실행하지만 25ms/자 타이핑을 끝까지 기다려주지 않고, 네이버·Bing·
 * SNS·LLM 크롤러는 애초에 실행하지 않는다. 그래서 **JS 없이도 본문이 보이는지**를
 * 고정한다 — `javaScriptEnabled: false` 컨텍스트로 원본 HTML만 확인한다.
 */

test.use({ javaScriptEnabled: false });

/** 스크립트를 걷어낸 뒤 화면에 렌더되는 텍스트만 남긴다. */
async function renderedText(page: import('@playwright/test').Page, path: string) {
  await page.goto(path);
  return page.evaluate(() => {
    const body = document.body.cloneNode(true) as HTMLElement;
    body.querySelectorAll('script, style, template').forEach((el) => el.remove());
    return (body.textContent ?? '').replace(/\s+/g, ' ').trim();
  });
}

test.describe('크롤 가능한 본문', () => {
  test('스토리 에피소드의 본문과 단서가 JS 없이도 HTML에 있다', async ({ page }) => {
    const text = await renderedText(page, '/ko/story/1');

    // 본문 첫 문장부터 마지막 문장까지
    expect(text).toContain('새벽 3시. 또 그 소리에 잠이 깼다.');
    expect(text).toContain('303호 남자가 계단을 내려간다');
    expect(text).toContain('돌려주기 전에, 딱 한 장만 보고 싶었다.');
    // 단서도 함께
    expect(text).toContain('낡은 폴더폰을 쓰던 시절처럼 눌러라');

    // 정답과 힌트는 여전히 새어 나오면 안 된다
    expect(text).not.toContain('4673');
    expect(text).not.toContain('H, O, P, E는 각각 몇 번 키에');
  });

  test('번역판도 마찬가지다', async ({ page }) => {
    const en = await renderedText(page, '/en/story/1');
    expect(en).toContain('The man in 303 is going down the stairs');
    expect(en).toContain('Press it the way you did on an old flip phone');

    const ja = await renderedText(page, '/ja/story/1');
    expect(ja).toContain('303号室の男が階段を下りていく');
  });

  test('추리 에피소드의 상황 설명과 첫 단서가 HTML에 있다', async ({ page }) => {
    // 첫 단서를 effect에서 채우면 서버 HTML에서 빠진다. 초기 상태에 넣어 둔 이유다.
    const text = await renderedText(page, '/ko/deduction/101');

    expect(text).toContain('책상 위에 네 자리 다이얼 자물쇠가 놓여 있다');
    expect(text).toContain('네 숫자는 서로 다릅니다');

    // 아직 열리지 않은 단서와 정답은 없어야 한다
    expect(text).not.toContain('두 번째 숫자는 7입니다');
    expect(text).not.toContain('3726');
  });

  test('에피소드 페이지가 빈 껍데기가 아니다', async ({ page }) => {
    // 본문이 통째로 빠지면 200자도 안 됐다. 넉넉한 하한선을 둔다.
    for (const path of ['/ko/story/1', '/en/story/1', '/ja/story/1']) {
      const text = await renderedText(page, path);
      expect(text.length, `${path}의 크롤 가능한 텍스트 분량`).toBeGreaterThan(300);
    }
  });
});
