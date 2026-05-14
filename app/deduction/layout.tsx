export default function DeductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-noct-page text-noct-ink">
      {children}
    </div>
  );
}
