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
  Radio,
  Select,
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

const API_get_lab_items_group = "/api/get_lab_items_group_report";

import ExportExcel from "../layout/ExportExcel";

import dayjs from "dayjs";
const { Content } = Layout;
const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
const beforeDate = currDate.subtract(3, "month");

const ToolsStatreport = () => {
  const [loadingData, setLoadingData] = useState(false);
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
  const [type, setType] = useState(1);
  const [date_start, setdatestart] = useState(beforeDate.format(dateFormat));
  const [date_stop, setdatestop] = useState(currDate.format(dateFormat));
  const [data, setData] = useState();
  const [count, setCount] = useState(0);

  const [pagination, setPagination] = useState(true);

  const [columnsHeader, setColumnsHeader] = useState([]);
  //let columnsHeader = [];

  const [sWorkTypeList, setSWorkTypeList] = useState([]);
  const [formGroup, setFormGroup] = useState();
  const [itemList, setItemList] = useState([]);

  const inputSWorkType = (value) => {
    setFormGroup(value);
  };

  useEffect(() => {
    axios.get(API_get_lab_items_group).then(function (response) {
      setItemList(response.data.items);
      setSWorkTypeList(response.data.group);
      setFormGroup(response.data.group[0].value);
    });
  }, []);

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
  const datediffMin = (raw) => {
    const minutes = Math.floor(raw / 60);
    return minutes;
  };
  const datediffFormat = (raw) => {
    const seconds = Math.floor(raw);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let display = "";
    if (days) {
      display =
        days +
        "." +
        (hours % 24).toString().padStart(2, "0") +
        ":" +
        (minutes % 60).toString().padStart(2, "0") +
        ":" +
        (seconds % 60).toString().padStart(2, "0");
    } else {
      display =
        (hours % 24).toString().padStart(2, "0") +
        ":" +
        (minutes % 60).toString().padStart(2, "0") +
        ":" +
        (seconds % 60).toString().padStart(2, "0");
    }

    return display;
  };
  useEffect(() => {
    let dataList = itemList.find((items) => {
      return items.lab_group === formGroup;
    });

    if (count == 0) {
      let mapLabel = [];
      if (!!dataList) {
        dataList.lab_items.map((items) => {
          if (
            !!data &&
            data.some((record) => record["data_items_" + items.lab_items_code])
          ) {
            mapLabel = [
              ...mapLabel,
              {
                title: items.lab_items_name,
                dataIndex: "data_items_" + items.lab_items_code,
                key: "data_items_" + items.lab_items_code,
                className: "no-wrap",
              },
            ];
          }
        });
      }
      setPagination(true);
      setColumnsHeader([
        {
          title: "วันที่รับตรวจ",
          dataIndex: "receive_date",
          key: "receive_date",
          className: "no-wrap",
        },
        {
          title: "เวลาที่รับตรวจ",
          dataIndex: "receive_time",
          key: "receive_time",
          className: "no-wrap",
        },
        {
          title: "HN",
          dataIndex: "hn",
          key: "hn",
          className: "no-wrap",
        },
        {
          title: "ชื่อ-สกุล",
          dataIndex: "fullname",
          key: "fullname",
          className: "no-wrap",
        },
        {
          title: "อายุ",
          dataIndex: "birthday",
          key: "birthday",
          render: (text) => calculateAge(text) + " ปี",
          className: "no-wrap",
        },
        {
          title: "หน่วย",
          dataIndex: "department",
          key: "department",
          className: "no-wrap",
        },
        {
          title: "TAT",
          dataIndex: "approved_time",
          key: "approved_time",
          className: "no-wrap",
        },
        ...mapLabel,
        {
          title: "ชื่อผู้รายงาน",
          dataIndex: "reporter_name",
          key: "reporter_name",
          className: "no-wrap",
        },
        {
          title: "ชื่อผู้ยืนยันผล",
          dataIndex: "approve_staff",
          key: "approve_staff",
          className: "no-wrap",
        },
      ]);
    } else if (count == 1) {
      setPagination(false);
      setColumnsHeader([
        {
          title: "รายการ",
          dataIndex: "lab_items_name",
          key: "lab_items_name",
          className: "no-wrap",
          onCell: (items, index) => ({
            colSpan: !!items.type ? 2 : 1,
          }),
          render: (_, record) => {
            if (record.type === "single_profile") {
              return <b>{record.lab_items_name}</b>;
            } else if (record.type === "sub_group") {
              return (
                <div style={{ marginLeft: "20px" }}>
                  {record.lab_items_name}
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    marginLeft:
                      record.single_profile === "Profile" ? "40px" : "20px",
                  }}
                >
                  {record.lab_items_name}
                </div>
              );
            }
          },
        },
        {
          title: "จำนวน",
          dataIndex: "total",
          key: "total",
          className: "no-wrap",
          onCell: (items, index) => ({
            colSpan: !!items.type ? 0 : 1,
          }),
        },
      ]);
    } else if (count == 2) {
      setPagination(false);
      setColumnsHeader([
        {
          title: "Test",
          dataIndex: "lab_items_name",
          key: "lab_items_name",
          className: "no-wrap",
        },
        {
          title: "เวลาที่กำหนด",
          dataIndex: "wait_hour",
          key: "wait_hour",
          className: "no-wrap",
        },
        {
          title: "ภายในเวลามาตราฐาน",
          children: [
            {
              title: "รวมจำนวน",
              dataIndex: "in_std",
              key: "in_std",
              className: "no-wrap",
            },
            {
              title: "คิดเป็น%",
              dataIndex: "in_std_percent",
              key: "in_std_percent",
              className: "no-wrap",
              render: (_, record) => {
                return ((record.in_std * 100) / record.total).toFixed(2);
              },
            },
          ],
        },
        {
          title: "เกินเวลามาตราฐาน",
          children: [
            {
              title: "รวมจำนวน",
              dataIndex: "out_std",
              key: "out_std",
              className: "no-wrap",
              render: (_, record) => {
                return record.total - record.in_std;
              },
            },
            {
              title: "คิดเป็น%",
              dataIndex: "out_std_percent",
              key: "out_std_percent",
              className: "no-wrap",
              render: (_, record) => {
                return (
                  ((record.total - record.in_std) * 100) /
                  record.total
                ).toFixed(2);
              },
            },
          ],
        },
        {
          title: "เวลาเฉลี่ยในการตรวจ (นาที)",
          dataIndex: "avg_time",
          key: "avg_time",
          className: "no-wrap",
        },
        {
          title: "ประสิทธิภาพ (+/- นาที)",
          dataIndex: "perform",
          key: "perform",
          className: "no-wrap",
        },
        // {
        //   title: "Turn around time (Average)",
        //   dataIndex: "datediff",
        //   key: "datediff",
        //   className: "no-wrap",
        //   render: (text) => datediffFormat(text),
        // },
        {
          title: "รวม Test",
          dataIndex: "total",
          key: "total",
          className: "no-wrap",
        },
      ]);
    }
  }, [count, formGroup, data]);

  useEffect(() => {
    loadData();
  }, [date_start, date_stop, type, formGroup]);

  async function loadData() {
    if (type === 1) {
      loadWorksheet();
    }
    if (type === 2) {
      loadWorkload();
    }
    if (type === 3) {
      loadTurnaroundtime();
    }
  }

  async function loadWorksheet(value) {
    setCount(0);
    setLoadingData(true);

    if (!!sWorkTypeList && !!formGroup) {
      const formname = sWorkTypeList.find((element) => {
        return element.value === formGroup;
      });

      let dataList = itemList.find((items) => {
        return items.lab_group === formGroup;
      });

      let dataListItems = dataList.lab_items.map((items) => {
        return items.lab_items_code;
      });

      console.log("dataList", dataListItems);

      return axios
        .post("/api/report_worksheet", {
          date_start: date_start,
          date_stop: date_stop,
          items_group: formname.label,
          dataListItems: dataListItems,
        })
        .then((response) => {
          setData(response.data);
          setLoadingData(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async function loadWorkload(value) {
    setCount(1);
    setLoadingData(true);

    return axios
      .post("/api/report_workload", {
        date_start: date_start,
        date_stop: date_stop,
        items_group: formGroup,
      })
      .then((response) => {
        let dataResult = response.data;
        let dataResultNew = [];
        dataResult.map((items, index) => {
          if (
            index === 0 ||
            dataResult[index].single_profile !==
              dataResult[index - 1].single_profile
          ) {
            dataResultNew = [
              ...dataResultNew,
              {
                lab_items_name: items.single_profile,
                type: "single_profile",
              },
            ];
          }

          if (
            (index === 0 ||
              dataResult[index].lab_items_sub_group_code !==
                dataResult[index - 1].lab_items_sub_group_code) &&
            !!items.lab_items_sub_group_name
          ) {
            dataResultNew = [
              ...dataResultNew,
              {
                lab_items_name: items.lab_items_sub_group_name,
                type: "sub_group",
              },
            ];
          }

          dataResultNew = [...dataResultNew, items];
        });

        setData(dataResultNew);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function loadTurnaroundtime(value) {
    setCount(2);
    setLoadingData(true);

    return axios
      .post("/api/report_worktat", {
        date_start: date_start,
        date_stop: date_stop,
        items_group: formGroup,
      })
      .then((response) => {
        setData(response.data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
                        <Col xs={12} lg={12}>
                          <Form.Item
                            label="เริ่มต้น :"
                            style={{ marginBottom: 5, marginTop: 5 }}
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
                        <Col xs={12} lg={12}>
                          <Form.Item
                            label="สิ้นสุด :"
                            style={{ marginBottom: 5, marginTop: 5 }}
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
                        <Col>
                          <Form.Item
                            style={{ marginBottom: 5, marginTop: 5 }}
                            label="Lab Form :"
                          >
                            <Select
                              showSearch
                              onChange={inputSWorkType}
                              style={{
                                width: 200,
                              }}
                              value={formGroup}
                              options={sWorkTypeList}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            style={{ marginBottom: 5, marginTop: 5 }}
                            label="เลือกรายงาน :"
                          >
                            <Radio.Group
                              onChange={(e) => setType(e.target.value)}
                              value={type}
                            >
                              <Radio value={1}>Work Sheet Report</Radio>
                              <Radio value={2}>Workload Report</Radio>
                              <Radio value={3}>Turn around time Report</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Content>
              <Content style={{ marginRight: "10px", marginTop: "10px" }}>
                <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล">
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      dataSource={data}
                      rowKey={"lab_order_number"}
                      columns={columnsHeader}
                      size="small"
                      bordered
                      scroll={{ x: true }}
                      pagination={pagination}
                    />
                  </div>
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
                          <ExportExcel
                            excelData={data}
                            columns={columnsHeader}
                            fileName={"Export Static Report"}
                          />
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
  );
};

export default ToolsStatreport;
