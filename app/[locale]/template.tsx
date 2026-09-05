/**
 * 화면 전환 애니메이션 래퍼.
 * layout.tsx와 달리 template.tsx는 네비게이션마다 리마운트되므로,
 * 모든 라우트 전환에 잔잔한 페이드 등장 효과가 적용됩니다. (NOCTURNE: 절제된 모션)
 *
 * 주의: opacity 전용 애니메이션만 사용. transform을 쓰면 이 div가
 * position:fixed 자식들(헤더·키패드 푸터)의 containing block이 되어 레이아웃이 깨집니다.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in motion-reduce:animate-none">
      {children}
    </div>
  );
}
