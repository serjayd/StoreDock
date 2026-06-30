import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import SidebarClientWrapper from "./SidebarClientWrapper";

export default async function Sidebar() {
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const stores = await prisma.store.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  const activeStore = await prisma.store.findFirst({
    where: {
      userId: session?.user.id,
      isActive: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      storeId: activeStore?.id,
    },
    include: {
      shelf: true,
    },
  });

  const activeAlerts = products.filter((p) => p.status !== "InStock").length;

  return (
    <SidebarClientWrapper
      stores={stores}
      user={user}
      activeAlerts={activeAlerts}
    />
  );
}
