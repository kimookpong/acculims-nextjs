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
  UserOutlined,
  SettingOutlined,
  LineChartOutlined,
  WarningOutlined,
  AlertOutlined,
  SnippetsOutlined,
  FundOutlined,
  UsergroupAddOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Link from "next/link";

const { Sider, Content } = Layout;
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

    getItem("รายงานผล", "report", <FileOutlined />, [
      getItem(
        <Link href="/daily_transaction/crit_report">รายงานค่าวิกฤติ</Link>,
        "crit_report",
        <WarningOutlined />
      ),
      getItem(
        <Link href="/daily_transaction/lab_reject">ปฎิเสธสิ่งส่งตรวจ</Link>,
        "lab_reject",
        <AlertOutlined />
      ),

      getItem(
        <Link href="/tools/tools_logvalref">Approved Log</Link>,
        "tools_logvalref",
        <FundOutlined />
      ),
      getItem(
        <Link href="/tools/tools_statistic_report">Statistic Report</Link>,
        "tools_statistic_report",
        <LineChartOutlined />
      ),
    ]),
    getItem("จัดการข้อมูล", "management", <SettingOutlined />, [
      getItem(
        <Link href="/tools/tools_hosvalref">จัดการข้อมูลโรงพยาบาล</Link>,
        "tools_hosvalref",
        <BankOutlined />
      ),
      getItem(
        <Link href="/tools/tools_labvalref">จัดการข้อมูลรายการ LAB</Link>,
        "tools_labvalref",
        <SnippetsOutlined />
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
        <UserOutlined />
      ),
      getItem(
        <Link href="/tools/patient">จัดการข้อมูล Patient</Link>,
        "patient",
        <UsergroupAddOutlined />
      ),
      getItem(
        <Link href="/tools/tools_optionvalref">Option</Link>,
        "tools_optionvalref",
        <SettingOutlined />
      ),
    ]),

    getItem(
      <Link href="/about/about">เกี่ยวกับ AccuLIMS</Link>,
      "/about/about",
      <NotificationOutlined />
    ),
    {
      type: "divider",
    },
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

  const rootSubmenuKeys = ["management", "report"];
  const [openKeys, setOpenKeys] = useState([""]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

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
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        theme="dark"
        items={items}
        //style={{ backgroundColor: "#f0f0f0" }}
      />
    </Sider>
  );
};

export default MenuItem;
