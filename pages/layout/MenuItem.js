import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";

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
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuItem;
