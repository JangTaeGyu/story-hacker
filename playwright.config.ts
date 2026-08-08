import { defineConfig, devices } from '@playwright/test';

/**
 * E2E 테스트 설정.
 * 테스트 파일은 specs/ 에 두며, 실행 시 개발 서버가 자동으로 기동된다.
 * (Playwright MCP agents도 이 설정을 사용한다.)
 */
export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',

  // 개발 서버는 라우트를 요청받을 때 컴파일한다. 특히 `npm run build` 직후에는
  // .next가 프로덕션 산출물로 덮여 있어 첫 요청마다 전체 재컴파일이 일어나고,
  // 워커 여러 개가 동시에 서로 다른 라우트를 때리면 기본 5초로는 부족하다.
  timeout: 60 * 1000,
  expect: { timeout: 15 * 1000 },

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      // 모바일 우선(max-width 448px) 레이아웃이므로 모바일 뷰포트를 기본으로 둔다.
      use: { ...devices['Pixel 7'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
