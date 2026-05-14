/**
 * 화면 전환 애니메이션 래퍼.
 * layout.tsx와 달리 template.tsx는 네비게이션마다 리마운트되므로,
 * 모든 라우트 전환에 잔잔한 페이드업 등장 효과가 적용됩니다. (NOCTURNE: 절제된 모션)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-up motion-reduce:animate-none">
      {children}
    </div>
  );
}
