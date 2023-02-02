import { useSession, signOut } from "next-auth/react";
import LoginComponent from "./layout/LoginComponent";
import Router, { useRouter } from "next/router";

function Home() {
  const { data: session } = useSession();
  if (!session) {
    //router.push("/myroute");
    return <LoginComponent />;
  }
  return (
    <>
      Signed in as {session.user.email} <br />
      {session.user.avatar}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

export default Home;
