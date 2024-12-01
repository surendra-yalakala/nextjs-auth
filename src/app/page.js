import { fetchUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUserInfo = await fetchUserAction();

  if (!currentUserInfo.success) redirect("/sign-in");

  return (
    <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>NextJS Authentication</h1>
        <p>{currentUserInfo?.data?.userName}</p>
        <p>{currentUserInfo?.data?.email}</p>
      </div>
      <Logout />
    </div>
  );
}
