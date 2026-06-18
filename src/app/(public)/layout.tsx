import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
}
