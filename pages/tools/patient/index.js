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
import dayjs from "dayjs";
const { Content } = Layout;

import { useSession } from "next-auth/react";
import LoginComponent from "../../layout/LoginComponent";
import BlankComponent from "../../layout/BlankComponent";

function ToolsUservalref() {
  const { data: session } = useSession();

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
  const [findHN, setFindHN] = useState("");
  const componentRef = useRef();
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();

  const reloadList = () => {
    loadUser();
  };

  useEffect(() => {
    loadUser();
  }, [findText, findHN]);

  const showModal = (data) => {
    Modal.confirm({
      centered: true,
      width: 800,
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
      .post("/api/get_lis_patient", { findText: findText, findHN: findHN })
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

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const setSex = (sex) => {
    if (sex === "1") {
      return "ชาย";
    }
    if (sex === "2") {
      return "หญิง";
    }
    return "";
  };

  const columns = [
    // {
    //   title: "User ID",
    //   dataIndex: "id_user",
    //   key: "id_user",
    //   ellipsis: true,
    //   width: 100,
    // },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      ellipsis: true,
      width: 100,
    },
    {
      title: "เลขบัตรประจำตัวประชาชน",
      dataIndex: "cid",
      key: "cid",
      ellipsis: true,
      width: 150,
    },
    {
      title: "ชื่อ",
      dataIndex: "patient_name",
      key: "patient_name",
      ellipsis: true,
    },
    {
      title: "เพศ",
      dataIndex: "sex",
      key: "sex",
      render: (text) => setSex(text),
      ellipsis: true,
      width: 80,
    },

    {
      title: "วันเกิด",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "อายุ",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => calculateAge(text) + " ปี",
      width: 80,
    },
    {
      title: "เบอร์โทร",
      dataIndex: "informtel",
      key: "informtel",
      width: 100,
    },
    // {
    //   title: "Turn around time (Average)",
    //   dataIndex: "datediff",
    //   key: "datediff",
    //   render: (text) => calculateAge(text),
    // },
  ];

  const dataTitle = {
    title: (
      <>
        <BankOutlined /> จัดการข้อมูล Patient
      </>
    ),
  };

  const customizeRenderEmpty = () => <Empty description={false} />;

  if (!session) {
    return <LoginComponent />;
  }

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>จัดการข้อมูล Patient</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={8} lg={8}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="ค้นหา HN  :"
                    >
                      <Input
                        value={findHN}
                        onChange={(e) => setFindHN(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={16} lg={16}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="ค้นหา ชื่อ-สกุล/เลขประจำตัวประชาชน :"
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
                  bordered
                  // scroll={{ x: 1500 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        showModal(record);
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
                        <div>Add Patient</div>
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
