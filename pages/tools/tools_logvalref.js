import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DatePicker,
  Table,
  Button,
  ConfigProvider,
  Card,
  Layout,
  Col,
  Row,
  Form,
  Input,
  Select,
  Spin,
  message,
  Modal,
  Empty,
} from "antd";
const { Content } = Layout;

const ToolsLogvalref = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();
  const customizeRenderEmpty = () => <Empty description={false} />;
  const onChangedDateStart = (date, dateString) => {
    setdatestart(dateString);
  };
  const onChangedDateStop = (date, dateString) => {
    setdatestop(dateString);
  };
  const [date_start, setdatestart] = useState("2022-09-01");
  const [date_stop, setdatestop] = useState("2023-02-01");

  const [data, setData] = useState();

  const columns = [
    {
      title: "Date Time",
      dataIndex: "date_time",
      key: "date_time",
    },
    {
      title: "Approved Drder",
      dataIndex: "approved_order",
      key: "approved_order",
    },
    {
      title: "Computer Name",
      dataIndex: "com_name",
      key: "com_name",
    },
    {
      title: "Report Name",
      dataIndex: "report_name",
      key: "report_name",
    },
    {
      title: "Approved Name",
      dataIndex: "approved_name",
      key: "approved_name",
    },
  ];

  async function sendValue(value) {
    axios
      .post("/api/get_approved_log", {
        date_start: date_start,
        date_stop: date_stop,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>Approved Log</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} lg={24}>
                    <div>
                      <a>From: </a>
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={onChangedDateStart}
                      />
                      <a> To: </a>
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={onChangedDateStop}
                      />
                      <a> </a>
                      <Button shape="round" type="primary" onClick={sendValue}>
                        Refresh
                      </Button>
                    </div>
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

export default ToolsLogvalref;
