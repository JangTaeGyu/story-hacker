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
