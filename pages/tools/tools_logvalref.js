import React, { useState, useEffect } from "react";
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

import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
const beforeDate = currDate.subtract(3, "month");

const ToolsLogvalref = () => {
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

  const [data, setData] = useState();

  const columns = [
    {
      title: "Date Time",
      dataIndex: "date_time",
      key: "date_time",
      className: "no-wrap",
    },
    {
      title: "Approved Drder",
      dataIndex: "approved_order",
      key: "approved_order",
      className: "no-wrap",
    },
    {
      title: "Computer Name",
      dataIndex: "com_name",
      key: "com_name",
      className: "no-wrap",
    },
    {
      title: "Report Name",
      dataIndex: "report_name",
      key: "report_name",
      className: "no-wrap",
    },
    {
      title: "Approved Name",
      dataIndex: "approved_name",
      key: "approved_name",
      className: "no-wrap",
    },
  ];
  useEffect(() => {
    sendValue();
  }, [date_start, date_stop]);

  async function sendValue(value) {
    setLoadingData(true);
    axios
      .post("/api/get_approved_log", {
        date_start: date_start,
        date_stop: date_stop,
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
              <h1 style={{ margin: "auto 0" }}>Approved Log</h1>
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
                  scroll={{ x: true }}
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
