import { useSession, signIn, signOut } from "next-auth/react";
const LoginComponent = () => {
  const { data: session, status } = useSession();
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
export default LoginComponent;
