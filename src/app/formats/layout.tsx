export default function FormatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto px-4">{children}</div>;
}
