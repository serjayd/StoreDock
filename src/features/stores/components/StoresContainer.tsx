import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import StoreCard from "./StoreCard";

export default async function StoresContainer() {
  const session = await getSession();

  if (!session?.user?.id) return null;

  const allStores = await prisma.store.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      shelves: true,
      products: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allStores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
