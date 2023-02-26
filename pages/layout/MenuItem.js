import { React, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  PieChartOutlined,
  DesktopOutlined,
  MedicineBoxOutlined,
  FileDoneOutlined,
  HomeOutlined,
  FileSearchOutlined,
  NotificationOutlined,
  BankOutlined,
  PoweroffOutlined,
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

const MenuItem = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState("");
  const { data: session } = useSession();
  const items = [
    getItem(
      <Link href="/lab_req">ใบรับ LAB</Link>,
      "lab_req",
      <FileDoneOutlined />
    ),
    getItem(
      <Link href="/lab_report">รายงานผล LAB</Link>,
      "lab_report",
      <FileSearchOutlined />
    ),
    getItem(
      <Link href="/daily_transaction/crit_report">รายงานค่าวิกฤติ</Link>,
      "crit_report",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/daily_transaction/lab_reject">ปฎิเสธสิ่งส่งตรวจ</Link>,
      "lab_reject",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_hosvalref">จัดการข้อมูลโรงพยาบาล</Link>,
      "tools_hosvalref",
      <BankOutlined />
    ),
    getItem(
      <Link href="/tools/tools_labvalref">จัดการข้อมูลรายการ LAB</Link>,
      "tools_labvalref",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_hisvalref">
        จัดการข้อมูล Matching Code HIS:LIS
      </Link>,
      "tools_hisvalref",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_uservalref">จัดการข้อมูลผู้ใช้งาน</Link>,
      "tools_uservalref",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_optionvalref">Option</Link>,
      "tools_optionvalref",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_logvalref">Approved Log</Link>,
      "tools_logvalref",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/tools/tools_static_report">Static Report</Link>,
      "tools_static_report",
      <DesktopOutlined />
    ),
    getItem(
      <Link href="/about/about">เกี่ยวกับ AccuLIMS</Link>,
      "about",
      <NotificationOutlined />
    ),
    session
      ? getItem(
          <Link href="#" onClick={() => signOut()}>
            ออกจากระบบ
          </Link>,
          "signout",
          <PoweroffOutlined />
        )
      : null,
  ];

  // const { data: session } = useSession();
  // if (!session) {
  //   return <></>;
  // }

  function handleClick(e) {
    setCurrent(e.key);
  }

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
          <Link href="/" style={{ color: "#fff" }}>
            <MedicineBoxOutlined /> Acculims
          </Link>
        </h1>
      </div>

      <Menu
        onClick={handleClick}
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={current}
      />
    </Sider>
  );
};

export default MenuItem;
