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
const BlankComponent = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Layout>
        <Content style={contentStyle}>ท่านไม่มีสิทธิ์เข้าใช้งาน</Content>
      </Layout>
    </Space>
  );
};
export default BlankComponent;
