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
  Form,
  Input,
  Select,
  Spin,
  message,
  Modal,
  Empty,
} from "antd";
import { FormOutlined, PlusCircleOutlined } from "@ant-design/icons";
import FormComponent from "./FormComponent";
const { Content } = Layout;

const ToolsLabvalref = () => {
  const [lab_group, setlabgroup] = useState("All");

  const [lab_name, setlabname] = useState();
  const [data, setData] = useState();
  const [dropdowndata, setDropDownData] = useState([]);
  const [labSpecimen, setLabSpecimen] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [messageApi, messageContext] = message.useMessage();

  const onChange = (value) => {
    setlabgroup(value);
  };
  const validateFormAction = () => {};
  const closeModal = () => {
    Modal.destroyAll();
  };

  const reloadList = () => {
    sendValue();
  };

  const showModal = (data) => {
    Modal.confirm({
      centered: true,
      width: 730,
      title: "แบบฟอร์มจัดการข้อมูล LAB",
      icon: <FormOutlined />,
      content: (
        <FormComponent
          dataForm={data}
          dropdowndata={dropdowndata}
          labSpecimen={labSpecimen}
          reloadList={reloadList}
        />
      ),
      footer: <></>,
    });
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
    return axios.post("/api/get_lab_items_group_code").then((response) => {
      setDropDownData(response.data);
    });
  }

  async function sendLabSpecimen() {
    return axios.post("/api/get_lab_specimen_items").then((response) => {
      setLabSpecimen(response.data);
    });
  }

  async function sendValue() {
    setLoadingData(true);
    return axios
      .post("/api/get_lab_items", { lab_group: lab_group, lab_name: lab_name })
      .then((response) => {
        setData(response.data);
        setLoadingData(false);
      });
  }
  useEffect(() => {
    sendLabItemGroup();
    sendLabSpecimen();
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
                        value={lab_group}
                        options={[
                          { label: "All", value: "All" },
                          ...dropdowndata,
                        ]}
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
                  rowKey={"lab_items_code"}
                  columns={columns}
                  size="small"
                  bordered
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
                        <div>Add Item</div>
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
};

export default ToolsLabvalref;
