import React, { useState, useEffect, useMessage } from "react";
import axios from "axios";
import {
  ConfigProvider,
  Card,
  Table,
  Layout,
  Col,
  Row,
  Button,
  Radio,
  Form,
  Input,
  Select,
  Checkbox,
  Spin,
  message,
  Modal,
  Empty,
} from "antd";
const { Content } = Layout;

const ToolsLabvalref = () => {
  const [lab_group, setlabgroup] = useState();
  const [lab_name, setlabname] = useState();
  const [data, setData] = useState();
  const [dropdowndata, setDropDownData] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [messageApi, messageContext] = message.useMessage();

  const onChange = (value) => {
    console.log(`selected ${value}`);

    setlabgroup(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const columns = [
    {
      title: "รหัส",
      dataIndex: "lab_items_code",
      key: "lab_items_code",
    },
    {
      title: "Order",
      dataIndex: "display_order",
      key: "display_order",
    },
    {
      title: "Sub Group",
      dataIndex: "",
      key: "",
    },
    {
      title: "ชื่อ Lab",
      dataIndex: "lab_items_name",
      key: "lab_items_name",
    },
    {
      title: "หน่วย",
      dataIndex: "lab_items_unit",
      key: "lab_items_unit",
    },
    {
      title: "ค่าปกติ",
      dataIndex: "lab_items_normal_value",
      key: "lab_items_normal_value",
    },
    {
      title: "คำช่วยเหลือ",
      dataIndex: "lab_items_hint",
      key: "lab_items_hint",
    },
    {
      title: "ค่ามาตรฐาน",
      dataIndex: "",
      key: "",
    },
    {
      title: "ราคา",
      dataIndex: "service_price",
      key: "service_price",
    },
    {
      title: "Out Lab",
      dataIndex: "range_check",
      key: "range_check",
    },
  ];

  async function sendLabItemGroup() {
    return axios
      .post("/api/get_lab_items_group")
      .then((response) => {
        console.log(response.data);
        setDropDownData((oldArray) => [
          { label: "All", value: "All" },
          ...response.data,
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function sendValue() {
    setLoadingData(true);
    console.log(lab_name);
    return axios
      .post("/api/get_lab_items", { lab_group: lab_group, lab_name: lab_name })
      .then((response) => {
        setData(response.data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    sendLabItemGroup();
  }, []);
  useEffect(() => {
    sendValue();
  }, [lab_group, lab_name]);
  async function addValue(value) {
    axios
      .post("/api/add_lab_ref", {
        lab_items_code: lab_items_code,
        display_order: display_order,
        lab_items_name: lab_items_name,
        lab_items_unit: lab_items_unit,
        lab_items_normal_value: lab_items_normal_value,
        lab_items_hint: lab_items_hint,
        service_price: service_price,
        range_check: range_check,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const customizeRenderEmpty = () => <Empty description={false} />;

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>จัดการข้อมูลรายการ LAB</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={12} lg={12}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="กลุ่ม Lab :"
                    >
                      <Select
                        showSearch
                        onChange={onChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={dropdowndata}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={12}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="ชื่อ Lab :"
                    >
                      <Input
                        value={lab_name}
                        onChange={(e) => setlabname(e.target.value)}
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
                />
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ToolsLabvalref;
