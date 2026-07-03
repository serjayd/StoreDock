import Container from "@/components/shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAccount from "@/features/settings/components/EditAccount";
import UserDangerZone from "@/features/settings/components/UserDangerZone";
import UserSecurity from "@/features/settings/components/UserSecurity";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Lock, Trash, User, Zap } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const sessions = await prisma.session.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Container>
      <section className="mb-8 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences
          </p>
        </div>
      </section>
      <Tabs
        defaultValue="account"
        orientation="vertical"
        className="grid grid-cols-1 md:grid-cols-4"
      >
        <TabsList className="md:col-span-1 w-full space-y-2 bg-transparent">
          <TabsTrigger
            value="account"
            className="justify-start gap-2 rounded-md px-3 py-2 text-chart-1/80 transition-colors hover:bg-muted data-[state=active]:bg-chart-1/10 data-[state=active]:text-chart-1 data-[state=active]:hover:text-chart-1"
          >
            <User /> Account
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="justify-start gap-2 rounded-md px-3 py-2 text-chart-1/80 transition-colors hover:bg-muted data-[state=active]:bg-chart-1/10 data-[state=active]:text-chart-1 data-[state=active]:hover:text-chart-1"
          >
            <Lock /> Security
          </TabsTrigger>
          <div className="border-b w-full pb-2">
            <Link
              href="/subscription"
              className="inline-flex cursor-default w-full items-center justify-start gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-white text-sm font-medium"
            >
              <Zap className="h-4 w-4" />
              <span>Subscription</span>
            </Link>
          </div>
          <TabsTrigger
            value="danger"
            className="justify-start gap-2 rounded-md px-3 py-2 text-chart-5/80 transition-colors hover:bg-chart-5/10 hover:text-chart-5! data-[state=active]:bg-chart-5/10 data-[state=active]:text-chart-5"
          >
            <Trash /> Danger Zone
          </TabsTrigger>
        </TabsList>

        <div className="md:col-span-3">
          <TabsContent value="account">
            <EditAccount user={user} />
          </TabsContent>
          <TabsContent value="security">
            <UserSecurity sessions={sessions} />
          </TabsContent>
          <TabsContent value="danger">
            <UserDangerZone />
          </TabsContent>
        </div>
      </Tabs>
    </Container>
  );
}
