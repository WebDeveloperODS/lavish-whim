import { auth } from "auth";
import ChildLayout from "./child-layout";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();
  const name = session?.user?.name || "null";

  if(name === "null"){
    redirect('/portal')
  }

  return (
    <ChildLayout name={name}>
      {children}
    </ChildLayout>
  );
}
