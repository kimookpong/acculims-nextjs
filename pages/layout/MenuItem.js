import { React, useState } from "react";
import { useSession } from "next-auth/react";
import {
  PieChartOutlined,
  DesktopOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Link from "next/link";

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link href="/">Home</Link>, "1", <PieChartOutlined />),
  getItem(<Link href="/lab_req">ใบรับ LAB</Link>, "2", <DesktopOutlined />),
  getItem(
    <Link href="/lab_report">รายงานผล LAB</Link>,
    "3",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/daily_transaction/crit_report">crit_report</Link>,
    "4",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/daily_transaction/lab_reject">lab_reject</Link>,
    "5",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_labvalref">tools_labvalref</Link>,
    "6",
    <DesktopOutlined />
  ),
];
const MenuItem = () => {
  const [collapsed, setCollapsed] = useState(true);

  // const { data: session } = useSession();
  // if (!session) {
  //   return <></>;
  // }

  return (
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
      <Menu
        // onClick={onClick}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default MenuItem;
