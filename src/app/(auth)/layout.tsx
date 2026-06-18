interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex ">
      <h1>123</h1>
      <main className="flex-1">{children}</main>
    </div>
  );
}
