import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ConfigProvider,
  Card,
  Table,
  Layout,
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Spin,
  message,
  Modal,
  Empty,
} from "antd";

import {
  FormOutlined,
  PlusCircleOutlined,
  BankOutlined,
} from "@ant-design/icons";
import FormComponent from "./FormComponent";
const { Content } = Layout;

function ToolsUservalref() {
  const [pname, setpname] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setsurname] = useState("");
  const [job_id, setlcid] = useState("");
  const [user_name, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [user_type, settype] = useState("");
  const [user_id, setuserid] = useState("");
  const [data, setData] = useState();
  const [findText, setFindText] = useState("");
  const componentRef = useRef();
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();

  const reloadList = () => {
    loadUser();
  };

  useEffect(() => {
    loadUser();
  }, [findText]);

  const showModal = (data) => {
    Modal.confirm({
      centered: true,
      width: 730,
      title: "แบบฟอร์มจัดการผู้ใช้งาน",
      icon: <FormOutlined />,
      content: <FormComponent dataForm={data} reloadList={reloadList} />,
      footer: <></>,
    });
  };

  async function addUser(value) {
    axios
      .post("/api/add_user", {
        pname: pname,
        fname: fname,
        lname: lname,
        job_id: job_id,
        user_name: user_name,
        password: password,
        user_type: user_type,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function loadUser() {
    setLoadingData(true);
    return axios
      .post("/api/get_lis_user", { findText: findText })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoadingData(false);
      });
  }

  async function delUser(value) {
    axios
      .post("/api/delete_user", { user_id: user_id })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const columns = [
    // {
    //   title: "User ID",
    //   dataIndex: "id_user",
    //   key: "id_user",
    //   ellipsis: true,
    //   width: 100,
    // },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      ellipsis: true,
      width: 100,
    },
    {
      title: "คำนำหน้าชื่อ",
      dataIndex: "pname",
      key: "pname",
      ellipsis: true,
      width: 120,
    },
    {
      title: "ชื่อ",
      dataIndex: "fname",
      key: "fname",
      ellipsis: true,
      width: 100,
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
      ellipsis: true,
      width: 100,
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      ellipsis: true,
      width: 100,
    },
    {
      title: "เลขที่ใบประกอบ",
      dataIndex: "job_id",
      key: "job_id",
      ellipsis: true,
      width: 100,
    },
  ];

  const dataTitle = {
    title: (
      <>
        <BankOutlined /> จัดการข้อมูลผู้ใช้
      </>
    ),
  };

  const customizeRenderEmpty = () => <Empty description={false} />;

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>จัดการข้อมูลผู้ใช้งาน</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} lg={24}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="ค้นหา Username / ชื่อ-สกุล :"
                    >
                      <Input
                        value={findText}
                        onChange={(e) => setFindText(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={24}>
              <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล" size="large">
                <Table
                  dataSource={data}
                  rowKey={"lab_order_number"}
                  columns={columns}
                  size="small"
                  // scroll={{ x: 1500 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        showModal(record);
                        // loadDetail(record);
                        // clickSelectRow(record.order_number);
                      }, // click row
                    };
                  }}
                />
              </Spin>
            </Col>
            <Col span={24}>
              <Card className="backgroundGreen" style={{ marginTop: "10px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "inline-flex" }}>
                    <div style={{ padding: 5 }}>
                      <Button
                        style={{
                          padding: 10,
                          cursor: "pointer",
                          height: "auto",
                          minWidth: 100,
                        }}
                        onClick={() => {
                          showModal(null);
                        }}
                      >
                        <div>
                          <PlusCircleOutlined
                            style={{
                              fontSize: 40,
                            }}
                          />
                        </div>
                        <div>Add User</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default ToolsUservalref;
