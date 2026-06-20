import { getSession } from "@/lib/session";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const user = await getSession();

  return <HeaderClient user={user} />;
}
