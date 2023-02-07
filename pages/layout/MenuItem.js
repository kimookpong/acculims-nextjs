import { React, useState } from "react";
import { useSession } from "next-auth/react";
import {
  PieChartOutlined,
  DesktopOutlined,
  MedicineBoxOutlined,
  FileDoneOutlined,
  HomeOutlined,
  FileSearchOutlined,
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
  getItem(<Link href="/lab_req">ใบรับ LAB</Link>, "2", <FileDoneOutlined />),
  getItem(
    <Link href="/lab_report">รายงานผล LAB</Link>,
    "3",
    <FileSearchOutlined />
  ),
  getItem(
    <Link href="/daily_transaction/crit_report">รายงานค่าวิกฤติ</Link>,
    "4",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/daily_transaction/lab_reject">ปฎิเสธสิ่งส่งตรวจ</Link>,
    "5",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_hosvalref">จัดการข้อมูลโรงพยาบาล</Link>,
    "6",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_labvalref">จัดการข้อมูลรายการ LAB</Link>,
    "7",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_hisvalref">จัดการข้อมูล Matching Code HIS:LIS</Link>,
    "8",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_uservalref">จัดการข้อมูลผู้ใช้งาน</Link>,
    "9",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_optionvalref">Option</Link>,
    "10",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/tools/tools_logvalref">Approved Log</Link>,
    "11",
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
          <Link href="/">
            <MedicineBoxOutlined /> Acculims
          </Link>
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
