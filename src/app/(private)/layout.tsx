import Sidebar from "@/components/layout/sidebar/Sidebar";
import { requireSession } from "@/lib/session";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  await requireSession();

  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
