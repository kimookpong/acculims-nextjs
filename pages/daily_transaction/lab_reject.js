import React, { useState, useRef, useEffect } from "react";

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

import axios from "axios";
import {
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
import { PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Content } = Layout;

const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
const beforeDate = currDate.subtract(3, "month");

const LabReject = () => {
  const componentRef = useRef();
  const [loadingData, setLoadingData] = useState(false);
  const [messageApi, messageContext] = message.useMessage();
  const customizeRenderEmpty = () => <Empty description={false} />;

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
      width: 150,
    },
    {
      title: "แนวทางแก้ไข",
      dataIndex: "edit",
      key: "edit",
      width: 150,
    },
    {
      title: "ผู้รับแจ้ง",
      dataIndex: "name_rec",
      key: "name_rec",
      width: 150,
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

  useEffect(() => {
    sendValue();
  }, [date_start, date_stop, lab_order_number]);

  async function sendValue() {
    setLoadingData(true);
    return axios
      .post("/api/get_lis_order_reject", {
        date_start: date_start,
        date_stop: date_stop,
        lab_order_number: lab_order_number,
      })
      .then((response) => {
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
              <h1 style={{ margin: "auto 0" }}>รายงานปฎิเสธสิ่งส่งตรวจ</h1>
            </Col>
            <Col xs={24} lg={21}>
              <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                <Row gutter={24}>
                  <Col lg={6}>
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
                  <Col lg={6}>
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
                  <Col xs={12} lg={12}>
                    <Form.Item
                      style={{ marginBottom: 5, marginTop: 5 }}
                      label="Lab Order Number :"
                    >
                      <Input
                        value={lab_order_number}
                        onChange={(e) => setlabordernumber(e.target.value)}
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
                          <h3 style={{ textAlign: "center" }}>
                            รายงานปฎิเสธสิ่งส่งตรวจ ระหว่างวันที่{" "}
                            {dayjs(date_start, dateFormat)
                              .add(543, "year")
                              .format("DD-MM-YYYY")}{" "}
                            ถึง{" "}
                            {dayjs(date_stop, dateFormat)
                              .add(543, "year")
                              .format("DD-MM-YYYY")}
                          </h3>
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

export default LabReject;
