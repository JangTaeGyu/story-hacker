/**
 * 통과 전용 루트 레이아웃.
 *
 * html/body와 실제 셸은 `app/[locale]/layout.tsx`가 그린다 —— `<html lang>`이
 * 언어를 따라가야 하는데, 이 파일은 params를 받지 못하기 때문이다.
 *
 * 그런데도 이 파일이 필요한 이유는 하나다. `app/not-found.tsx`(전역 404)가
 * 루트 레이아웃 없이는 빌드되지 않는다. 여기를 비워두면 잘못된 URL이 전부
 * Next 기본 404 화면으로 떨어진다.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
