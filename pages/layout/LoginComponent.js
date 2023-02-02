import { useSession, signIn, signOut } from "next-auth/react";
const LoginComponent = () => {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
export default LoginComponent;
