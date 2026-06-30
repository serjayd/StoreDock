import Sidebar from "@/components/layout/sidebar/Sidebar";
import { requireSession } from "@/lib/session";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  await requireSession();

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-screen w-64 z-10">
        <Sidebar />
      </div>

      <main className="flex-1 ml-16 h-screen overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
