import React, { useState, useRef } from "react";
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
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";
const { Content } = Layout;

const LabReject = () => {
  const componentRef = useRef();
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();
  const customizeRenderEmpty = () => <Empty description={false} />;

  const onChangedDateStart = (date, dateString) => {
    setdatestart(dateString);
  };
  const onChangedDateStop = (date, dateString) => {
    setdatestop(dateString);
  };
  const [date_start, setdatestart] = useState();
  const [date_stop, setdatestop] = useState();
  const [lab_order_number, setlabordernumber] = useState();
  const [data, setData] = useState();

  const columns = [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <>{dayjs(text).add(543, "year").format("DD-MM-YYYY")}</>
      ),
      width: 90,
    },
    {
      title: "Ward",
      dataIndex: "",
      key: "",
    },
    {
      title: "Lab Order Number",
      dataIndex: "lab_order_number",
      key: "lab_order_number",
    },
    {
      title: "ไม่มีรายการตรวจทาง LAB",
      dataIndex: "ch1",
      key: "ch1",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "เจาเลือดไม่ถูกชนิด",
      dataIndex: "ch2",
      key: "ch2",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ชื่อในใบกับหลอดเลือดไม่ตรงกัน",
      dataIndex: "ch3",
      key: "ch3",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ปิดฝาหลอดเลือดสลับกัน",
      dataIndex: "ch4",
      key: "ch4",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ไม่มีฉลากติด",
      dataIndex: "ch5",
      key: "ch5",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "Hemolysis",
      dataIndex: "ch6",
      key: "ch6",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "เลือด Clotted (CBC, FBS)",
      dataIndex: "ch7",
      key: "ch7",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ไม่มีใบนำส่ง",
      dataIndex: "ch8",
      key: "ch8",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ไม่มี Sample",
      dataIndex: "ch9",
      key: "ch9",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ส่ง LAB ผิด",
      dataIndex: "ch10",
      key: "ch10",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "ปริมาณ Sample ไม่ถูกต้อง",
      dataIndex: "ch11",
      key: "ch11",
      render: (text) => <>{text === "1" ? "✓" : null}</>,
    },
    {
      title: "อื่นๆ",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "ผู้ตรวจสอบ / ผู้เเจ้ง",
      dataIndex: "name_call",
      key: "name_call",
    },
    {
      title: "แนวทางแก้ไข",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "ผู้รับแจ้ง",
      dataIndex: "name_rec",
      key: "name_rec",
    },
    {
      title: "เวลาที่แจ้ง",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <>{dayjs(text).add(543, "year").format("DD-MM-YYYY")}</>
      ),
      width: 90,
    },
  ];

  async function sendValue() {
    return axios
      .post("/api/get_lis_order_reject", {
        date_start: date_start,
        date_stop: date_stop,
        lab_order_number: lab_order_number,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={3} className="iconMenu">
              <h1 style={{ margin: "auto 0" }}>รายงานปฎิเสธสิ่งส่งตรวจ</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} lg={24}>
                    <div>
                      <a>From: </a>
                      <DatePicker onChange={onChangedDateStart} />
                      <a> To: </a>
                      <DatePicker onChange={onChangedDateStop} />
                      <a> </a>
                      <a>Lab Order Number: </a>
                      <input
                        type="text"
                        value={lab_order_number}
                        onChange={(e) => setlabordernumber(e.target.value)}
                      />
                      <br></br>
                      <br></br>
                      <Button type="primary" shape="round" onClick={sendValue}>
                        Reload
                      </Button>
                      <a> </a>
                      <ReactToPrint
                        trigger={() => {
                          return <Button shape="round">Print</Button>;
                        }}
                        content={() => componentRef.current}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={24}>
              <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล" size="large">
                <div ref={componentRef}>
                  <Table
                    dataSource={data}
                    rowKey={"lab_order_number"}
                    columns={columns}
                    size="small"
                    scroll={{ x: 1500 }}
                  />
                </div>
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LabReject;
