export default function DeductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 시안 글로우 배경 효과 */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      {children}
    </>
  );
}
