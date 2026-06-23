import Container from "@/components/shared/Container";
import SubscriptionContent from "@/features/subscription/components/SubscriptionContent";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function SubscriptionPage() {
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  return (
    <section>
      <Container>
        <SubscriptionContent user={user} session={session} />
      </Container>
    </section>
  );
}
