import { signIn } from "next-auth/react";
import { Layout, Space, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
const { Content } = Layout;
const contentStyle = {
  textAlign: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
};
const LoginComponent = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Layout>
        <Content style={contentStyle}>
          <Button
            type="primary"
            shape="round"
            icon={<LoginOutlined />}
            size="large"
            onClick={() => signIn()}
          >
            เข้าสู่ระบบ
          </Button>
        </Content>
      </Layout>
    </Space>
  );
};
export default LoginComponent;
