import React, { useState, useEffect } from "react";
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
const { Content } = Layout;

const ToolsHisvalref = () => {
  const [data, setData] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();
  const customizeRenderEmpty = () => <Empty description={false} />;
  const columns = [
    {
      title: "Instrument",
      dataIndex: "Instrument",
      key: "Instrument",
    },
    {
      title: "Link EQ",
      dataIndex: "Link_EQ",
      key: "Link_EQ",
    },
    {
      title: "LIS Item Code",
      dataIndex: "Item_Code_LIS",
      key: "Item_Code_LIS",
    },
    {
      title: "HIS Item Code",
      dataIndex: "Item_Code_HIS",
      key: "Item_Code_HIS",
    },
    {
      title: "Item Name",
      dataIndex: "LIS_Items_Name",
      key: "LIS_Items_Name",
    },
    {
      title: "Abb Name",
      dataIndex: "Abb_Name",
      key: "Abb_Name",
    },
    {
      title: "Sugar",
      dataIndex: "Sugar",
      key: "Sugar",
    },
    {
      title: "Calculation",
      dataIndex: "Calculation",
      key: "Calculation",
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      key: "Remark",
    },
    {
      title: "Profile",
      dataIndex: "Profile",
      key: "Profile",
    },
  ];

  useEffect(() => {
    sendValue();
  }, []);

  async function sendValue() {
    setLoadingData(true);
    return axios.post("/api/get_lis_link_instrument").then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoadingData(false);
    });
  }

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>
                จัดการข้อมูล Matching Code HIS:LIS
              </h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} lg={24}></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={24}>
              <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล" size="large">
                <Table
                  dataSource={data}
                  rowKey={"id_link_instrument"}
                  columns={columns}
                />
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ToolsHisvalref;
