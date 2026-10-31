/** Small source line under a printable resource. */
export function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wider text-muted">{children}</p>;
}
