import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import thTH from "antd/locale/th_TH";
import {
  StopOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Empty,
  Button,
  Table,
  Spin,
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  message,
} from "antd";
const { Content } = Layout;

// THAI DATEPICKER
import DatePicker from "react-multi-date-picker";
const thai = {
  name: "thai",
  startYear: 1,
  yearLength: 365,
  epoch: 1523097,
  century: 25,
  weekStartDayIndex: 1,
  getMonthLengths(isLeap) {
    return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
  isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  getLeaps(currentYear) {
    if (currentYear === 0) return;

    let year = currentYear > 0 ? 1 : -1;

    let leaps = [],
      condition = () =>
        currentYear > 0 ? year <= currentYear : currentYear <= year,
      increase = () => (currentYear > 0 ? year++ : year--);

    while (condition()) {
      if (this.isLeap(year)) leaps.push(year);

      increase();
    }

    return leaps;
  },
  getDayOfYear({ year, month, day }) {
    let monthLengths = this.getMonthLengths(this.isLeap(year));

    for (let i = 0; i < month.index; i++) {
      day += monthLengths[i];
    }

    return day;
  },
  getAllDays(date) {
    const { year } = date;

    return (
      this.yearLength * (year - 1) +
      this.leapsLength(year) +
      this.getDayOfYear(date)
    );
  },
  leapsLength(year) {
    return (
      (((year - 1) / 4) | 0) +
      (-((year - 1) / 100) | 0) +
      (((year - 1) / 400) | 0)
    );
  },
  guessYear(days, currentYear) {
    let year = ~~(days / 365.24);

    return year + (currentYear > 0 ? 1 : -1);
  },
};
const thai_th = {
  name: "thai_th",
  months: [
    ["มกราคม", "ม.ค."],
    ["กุมภาพันธ์", "ก.พ."],
    ["มีนาคม", "มี.ค."],
    ["เมษายน", "เม.ย.	"],
    ["พฤษภาคม", "พ.ค."],
    ["มิถุนายน", "มิ.ย."],
    ["กรกฎาคม", "ก.ค."],
    ["สิงหาคม", "ส.ค."],
    ["กันยายน", "ก.ย."],
    ["ตุลาคม", "ต.ค."],
    ["พฤศจิกายน", "พ.ย."],
    ["ธันวาคม", "ธ.ค."],
  ],
  weekDays: [
    ["วันเสาร์", "ส"],
    ["วันอาทิตย์", "อา"],
    ["วันจันทร์", "จ"],
    ["วันอังคาร", "อ"],
    ["วันพุธ", "พ"],
    ["วันพฤหัส", "พฤ"],
    ["วันศุกร์", "ศ"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["ก่อนเที่ยง", "เอเอ็ม"],
    ["หลังเที่ยง", "พีเอ็ม"],
  ],
};
// END THAI DATEPICKER

import styles from "../../styles/Home.module.css";
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
const beforeDate = currDate.subtract(3, "month");

const CritReport = () => {
  const componentRef = useRef();
  const customizeRenderEmpty = () => <Empty description={false} />;
  const [messageApi, messageContext] = message.useMessage();
  const [loadingData, setLoadingData] = useState(false);

  const onChangedDateStart = (date) => {
    if (!!date) {
      setdatestart(dayjs(date).format(dateFormat));
    }
  };
  const onChangedDateStop = (date) => {
    if (!!date) {
      setdatestop(dayjs(date).format(dateFormat));
    }
  };

  const [date_start, setdatestart] = useState(beforeDate.format(dateFormat));
  const [date_stop, setdatestop] = useState(currDate.format(dateFormat));
  const [hn, sethn] = useState();
  const [patient_name, setpname] = useState();
  const [call_name, setcall] = useState();
  const [take_name, settake] = useState();
  const [data, setData] = useState();

  const columns = [
    {
      title: "วันที่",
      dataIndex: "date_save",
      key: "date_save",
      ellipsis: true,
      render: (text) => (
        <>{dayjs(text).add(543, "year").format("DD-MM-YYYY")}</>
      ),
      width: 90,
    },
    {
      title: "เวลา",
      dataIndex: "time_call",
      key: "time_call",
      ellipsis: true,
      width: 100,
    },
    {
      title: "ผู้โทร",
      dataIndex: "call_name",
      key: "call_name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "หน่วยงาน",
      dataIndex: "position",
      key: "position",
      ellipsis: true,
      width: 120,
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      ellipsis: true,
      width: 100,
    },
    {
      title: "ชื่อ-สกุล",
      dataIndex: "patient_name",
      key: "patient_name",
      ellipsis: true,
      width: 160,
    },
    {
      title: "เพิ่ม LAB",
      dataIndex: "test_name",
      key: "test_name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "ยกเลิก LAB",
      dataIndex: "",
      key: "",
      ellipsis: true,
      width: 120,
    },
    {
      title: "ค่าวิกฤติ",
      dataIndex: "critical_ref",
      key: "critical_ref",
      ellipsis: true,
      width: 200,
    },
    {
      title: "ผล LAB",
      dataIndex: "result",
      key: "result",
      ellipsis: true,
      width: 200,
    },
    {
      title: "เวลา",
      dataIndex: "time_take",
      key: "time_take",
      ellipsis: true,
      width: 100,
    },
    {
      title: "ผู้รับโทรศัพท์",
      dataIndex: "take_name",
      key: "take_name",
      ellipsis: true,
      width: 160,
    },
  ];

  useEffect(() => {
    sendValue();
  }, [date_start, date_stop, hn, patient_name, call_name, take_name]);

  async function sendValue() {
    setLoadingData(true);
    axios
      .post("/api/get_lis_critical", {
        date_start: date_start,
        date_stop: date_stop,
        hn: hn,
        patient_name: patient_name,
        call_name: call_name,
        take_name: take_name,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoadingData(false);
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
              <h1 style={{ margin: "auto 0" }}>รายงานค่าวิกฤติ</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col lg={8}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="เริ่มต้น :"
                    >
                      <DatePicker
                        calendar={thai}
                        locale={thai_th}
                        value={dayjs(date_start, dateFormat)
                          .add(543, "year")
                          .format("DD-MM-YYYY")}
                        format="DD-MM-YYYY"
                        onChange={onChangedDateStart}
                        inputClass="datepicker-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="ถึง :"
                    >
                      <DatePicker
                        calendar={thai}
                        locale={thai_th}
                        value={dayjs(date_stop, dateFormat)
                          .add(543, "year")
                          .format("DD-MM-YYYY")}
                        format="DD-MM-YYYY"
                        onChange={onChangedDateStop}
                        inputClass="datepicker-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="HN :"
                    >
                      <Input
                        value={hn}
                        onChange={(e) => sethn(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      label="ชื่อ-สกุล:"
                      style={{ marginBottom: 5, marginTop: 5 }}
                    >
                      <Input
                        onChange={(e) => setpname(e.target.value)}
                        value={patient_name}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      label="ชื่อผู้โทร:"
                      style={{ marginBottom: 5, marginTop: 5 }}
                    >
                      <Input
                        onChange={(e) => setcall(e.target.value)}
                        value={call_name}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      label="ชื่อผู้รับสาย:"
                      style={{ marginBottom: 5, marginTop: 5 }}
                    >
                      <Input
                        onChange={(e) => settake(e.target.value)}
                        value={take_name}
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
                <div>
                  <Table
                    dataSource={data}
                    rowKey={"lab_order_number"}
                    columns={columns}
                    size="small"
                    bordered
                    //scroll={{ x: 1500 }}
                  />
                </div>
              </Spin>
            </Col>
            <Col span={24}>
              <Card className="backgroundGreen" style={{ marginTop: "10px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "inline-flex" }}>
                    <div style={{ padding: 5 }}>
                      <ReactToPrint
                        trigger={() => {
                          return (
                            <Button
                              style={{
                                padding: 10,
                                cursor: "pointer",
                                height: "auto",
                                minWidth: 100,
                              }}
                            >
                              <div>
                                <PrinterOutlined
                                  style={{
                                    fontSize: 40,
                                  }}
                                />
                              </div>
                              <div>Print</div>
                            </Button>
                          );
                        }}
                        content={() => componentRef.current}
                      />
                      <div style={{ display: "none" }}>
                        <div ref={componentRef}>
                          <Table
                            dataSource={data}
                            rowKey={"lab_order_number"}
                            columns={columns}
                            size="small"
                            bordered
                            pagination={false}
                          />
                        </div>
                      </div>
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

export default CritReport;
