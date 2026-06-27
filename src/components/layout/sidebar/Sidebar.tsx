import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import SidebarClientWrapper from "./SidebarClientWrapper";

export default async function Sidebar() {
  const session = await getSession();

  const stores = await prisma.store.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <SidebarClientWrapper stores={stores} />;
}
