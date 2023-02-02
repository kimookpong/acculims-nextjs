import { React, useState } from "react";
import { Layout, Space, theme } from "antd";
import MenuItem from "./layout/MenuItem";
import "../public/css/styles.css";
import { MedicineBoxOutlined } from "@ant-design/icons";

const { Sider } = Layout;
export default function MyApp({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 66,
              textAlign: "center",
              display: "grid",
              color: "#fff",
            }}
          >
            <h1 style={{ margin: "auto 0px" }}>
              <MedicineBoxOutlined /> Acculims
            </h1>
          </div>
          <MenuItem />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            margin: "8px",
          }}
        >
          <Component {...pageProps} />
        </Layout>
      </Layout>
    </Space>
  );
}
