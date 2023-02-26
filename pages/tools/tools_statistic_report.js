import React, { useState, useEffect } from "react";
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
} from "antd";

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

import ExportExcel from "../layout/ExportExcel";

import dayjs from "dayjs";
const { Content } = Layout;
const dateFormat = "YYYY-MM-DD";

const ToolsStatreport = () => {
const [loadingData, setLoadingData] = useState(false);
const customizeRenderEmpty = () => <Empty description={false}/>;
const onChangedDateStart = (date) => {
  if (!!date) { setdatestart(dayjs(date).format(dateFormat)); }
};
const onChangedDateStop = (date) => {
  if (!!date) { setdatestop(dayjs(date).format(dateFormat)); }
};
const [date_start, setdatestart] = useState("2022-09-26");
const [date_stop, setdatestop] = useState("3023-01-01");
const [data, setData] = useState();
const [count, setCount] = useState(0);
let columns = [];

if(count == 0){
  columns = [
  {
    title: "วันที่ส่งตรวจ",
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "เวลาที่ส่งตรวจ",
    dataIndex: "order_time",
    key: "order_time",
  },
  {
    title: "HN",
    dataIndex: "hn",
    key: "hn",
  },
  {
    title: "คำนำหน้าชื่อ",
    dataIndex: "pname",
    key: "pname",
  },
  {
    title: "ชื่อ",
    dataIndex: "fname",
    key: "fname",
  },
  {
    title: "สกุล",
    dataIndex: "lname",
    key: "lname",
  },
  {
    title: "วันเกิด",
    dataIndex: "birthday",
    key: "birthday",
  },
  {
    title: "หน่วย",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "เวลาที่รับ",
    dataIndex: "receive_time",
    key: "receive_time",
  },
  {
    title: "รับรองผล",
    dataIndex: "approved_time",
    key: "approved_time",
  },
  {
    title: "Laboratory",
    dataIndex: "form_name",
    key: "form_name",
  },
  {
    title: "Testing",
    dataIndex: "lab_items_name_ref",
    key: "lab_items_name_ref",
  },
  {
    title: "Value",
    dataIndex: "lab_order_result",
    key: "lab_order_result",
  },
  {
    title: "ชื่อผู้รายงาน",
    dataIndex: "reporter_name",
    key: "reporter_name",
  },
  {
    title: "ชื่อผู้ยืนยันผล",
    dataIndex: "approve_staff",
    key: "approve_staff",
  }
];
} else if(count == 1){
  columns = [
    {
      title: "Laboratory Name",
      dataIndex: "form_name",
      key: "form_name",
    },
    {
      title: "Laboratory Testing",
      dataIndex: "lab_items_name_ref",
      key: "lab_items_name_ref",
    },
    {
      title: "Testing Count",
      dataIndex: "COUNT(t2.lab_items_name_ref)",
      key: "COUNT(t2.lab_items_name_ref)",
    },
  ];
} else if(count == 2){
  columns = [
    {
      title: "Laboratory Name",
      dataIndex: "form_name",
      key: "form_name",
    },
    {
      title: "Laboratory Testing",
      dataIndex: "lab_items_name_ref",
      key: "lab_items_name_ref",
    },
    {
      title: "Testing Count",
      dataIndex: "COUNT(t2.lab_items_name_ref)",
      key: "COUNT(t2.lab_items_name_ref)",
    },
  ];
}

async function loadWorksheet(value) {
  setCount(0);
  setLoadingData(true);
  return axios.post("/api/report_worksheet", { date_start: date_start, date_stop: date_stop})
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoadingData(false);
    })
    .catch((error) => { console.error(error); });
}

async function loadWorkload(value) {
  setCount(1);
  setLoadingData(true);
  return axios.post("/api/report_workload", { date_start: date_start, date_stop: date_stop, })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoadingData(false);
    })
    .catch((error) => { console.error(error); });
}

async function loadTurnaroundtime(value) {
  setCount(2);
  setLoadingData(true);
  return axios.post("/api/report_worktat", { date_start: date_start, date_stop: date_stop, })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoadingData(false);
    })
    .catch((error) => { console.error(error); });
}

return (
  <ConfigProvider locale={thTH} renderEmpty={customizeRenderEmpty}>
    <Layout style={{ background: "white" }}>
      <Content>
        <Row>
          <Col xs={24} lg={24}>
            <Content style={{ marginRight: "10px" }}>
              <Row>
                <Col xs={24} lg={3} className="iconMenu">
                  <h1 style={{ margin: "auto 0" }}>Statistic Report</h1>
                </Col>
                <Col xs={24} lg={21}>
                  <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                    <Row gutter={24}>
                      <Col xs={12} lg={10}>
                        <Form.Item
                          label="เริ่มต้น :"
                          style={{ marginBottom: 5, marginTop: 5 }}
                        >
                          <DatePicker
                            calendar={thai}
                            locale={thai_th}
                            format="DD-MM-YYYY"
                            onChange={onChangedDateStart}
                            inputClass="datepicker-input"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} lg={10}>
                        <Form.Item
                          label="สิ้นสุด :"
                          style={{ marginBottom: 5, marginTop: 5 }}
                        >
                          <DatePicker
                            calendar={thai}
                            locale={thai_th}
                            format="DD-MM-YYYY"
                            onChange={onChangedDateStop}
                            inputClass="datepicker-input"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Button shape="round" type="primary" onClick={loadWorksheet}>Display Work Sheet Report</Button>
                        <a> </a>
                        <Button shape="round" onClick={loadWorkload}>Display Workload Report</Button>
                        <a> </a>
                        <Button shape="round" onClick={loadTurnaroundtime}>Display Turn around time Report</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Content>
            <Content style={{ marginRight: "10px", marginTop: "10px" }}>
              <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล">
                <Table dataSource={data} rowKey={"lab_order_number"} columns={columns} size="small" scroll={{ x: 1500, }}/>
              </Spin>
            </Content>
            <Row style={{ marginRight: "10px" }}>
              <Col span={24}>
                <Card
                  className="backgroundGreen"
                  style={{ marginTop: "10px" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex" }}>
                      <div style={{ padding: 5 }}>
                        <a>Export to:</a>
                        <ExportExcel excelData={data} fileName={"Export Work Sheet"}/>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  </ConfigProvider>
);};

export default ToolsStatreport;
