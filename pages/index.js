import { useSession, signOut } from "next-auth/react";
import LoginComponent from "./layout/LoginComponent";
import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

function Home() {
  const { data: session } = useSession();
  if (!session) {
    return <LoginComponent />;
  }
  return (
    <Result
      icon={<SmileOutlined />}
      title={"ยินดีต้อนรับ " + session.user.name}
      extra={
        <Button type="primary" onClick={() => signOut()}>
          ออกจากระบบ
        </Button>
      }
    />
  );
}

export default Home;
