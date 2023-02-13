import { React, useEffect, useState, useRef } from "react";
import thTH from "antd/locale/th_TH";

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
import StickyBox from "react-sticky-box";
import {
  StopOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import ReactToPrint from "react-to-print";

import DetailComponent from "./DetailComponent";
import DetailNoteComponent from "./DetailNoteComponent";
import DetailThingComponent from "./DetailThingComponent";
import BarcodeComponent from "./BarcodeComponent";
import CancelComponent from "./CancelComponent";

import { useSession } from "next-auth/react";
import LoginComponent from "../layout/LoginComponent";

const API_server = "";
const API_post_list = API_server + "/api/lab_order";
const API_post_detail = API_server + "/api/lab_order_detail";

const API_post_barcode = API_server + "/api/lab_barcode";
const API_get_lab_form_head = API_server + "/api/get_lab_form_head";
const API_get_lab_items_group = API_server + "/api/get_lab_items_group";
const API_get_doctor = API_server + "/api/get_doctor";
const API_lis_user = API_server + "/api/get_lis_user";

const API_post_action = API_server + "/api/lab_order_action_event";
const API_post_cancel_reason = API_server + "/api/lab_order_reject";
const API_post_note = API_server + "/api/lab_order_note";

const { Content } = Layout;
const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
//const currDate = defaultDate.add(543, "year");
const beforeDate = currDate.subtract(3, "month");

const customizeRenderEmpty = () => <Empty description={false} />;

function LabReq() {
  const componentRef = useRef();

  const { data: session } = useSession();

  const [refreshKey, setRefreshKey] = useState(0);

  let dataRejectReason = [];
  const onAddRejectForm = (newItem) => {
    dataRejectReason = newItem;
  };
  const [messageApi, messageContext] = message.useMessage();
  const closeModal = () => {
    Modal.destroyAll();
  };
  const getDoctor = (action) => {
    return axios.get(API_lis_user).then(function (responseDoctor) {
      return axios
        .post(API_post_detail, {
          id: selectedRowKeys.join(),
        })
        .then(function (response) {
          Modal.confirm({
            centered: true,
            width: 700,
            title: "ยืนยันปฎิเสธสิ่งส่งตรวจ",
            content: !!response.data.lab_head[0] ? (
              <CancelComponent
                data={response.data.lab_head[0]}
                rejectForm={onAddRejectForm}
                doctorList={responseDoctor.data}
              />
            ) : (
              { customizeRenderEmpty }
            ),
            onOk() {
              return axios
                .post(API_post_cancel_reason, {
                  id: selectedRowKeys.join(),
                  form: dataRejectReason,
                  date: currDate.format("YYYY-MM-DD"),
                })
                .then(function (response) {
                  actionControl(action);
                });
            },
          });
        });
    });
  };
  const showConfirmDelete = (action) => {
    getDoctor(action);
  };
  let acceptPrintBarcode = false;
  const changeAcceptPrintBarcode = (event) => {
    acceptPrintBarcode = event.target.checked;
  };
  const submitForm = (action) => {
    actionControl(action);
    closeModal();
  };
  const showConfirm = (action) => {
    let ableSubmit = true;
    Modal.confirm({
      centered: true,
      title: action === "accept" ? "ยืนยันรับใบ LAB?" : "ยืนยันลบใบ LAB?",
      content: (
        <Row>
          <Col span={24}>
            เลขที่สั่ง :
            {selectedRowKeys.map((items) => {
              if (
                acceptCondition.find(
                  (element) =>
                    element["order_number"] === items &&
                    element["status"] === true
                )
              ) {
                return <span key={items}> {items}, </span>;
              } else {
                ableSubmit = false;
                return (
                  <span key={items} style={{ color: "red" }}>
                    {items},
                  </span>
                );
              }
            })}
          </Col>
          <Col span={24}>
            {action === "accept" ? (
              <Checkbox onClick={changeAcceptPrintBarcode}>
                พิมพ์ Barcode
              </Checkbox>
            ) : null}
          </Col>
          <Col span={24}>
            {!ableSubmit ? (
              <span style={{ color: "red" }}>
                ** สถานะไม่ถูกต้อง ไม่สามารถดำเนินการได้
              </span>
            ) : (
              ""
            )}
          </Col>
        </Row>
      ),
      footer: (
        <div className="ant-modal-confirm-btns">
          <Button key="back" onClick={closeModal}>
            ยกเลิก
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              return submitForm(action);
            }}
            disabled={!ableSubmit}
          >
            ยืนยัน
          </Button>
        </div>
      ),
      onOk() {
        actionControl(action);
      },
    });
  };
  const showPrint = () => {
    return axios
      .post(API_post_barcode, {
        id: selectedRowKeys.join(),
        seperate: seperateTupe,
      })
      .then(function (response) {
        Modal.info({
          centered: true,
          width: 730,
          title: "พิมพ์ Barcode",
          icon: <PrinterOutlined />,
          content: (
            <div ref={componentRef}>
              <BarcodeComponent data={response.data} seperate={seperateTupe} />
            </div>
          ),
          footer: (
            <div className="ant-modal-footer">
              <ReactToPrint
                trigger={() => {
                  return <Button key="back">พิมพ์</Button>;
                }}
                content={() => componentRef.current}
              />
              <Button key="submit" type="primary" onClick={closeModal}>
                ตกลง
              </Button>
            </div>
          ),
        });
      });
  };
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [statusList, setStatusList] = useState("All");
  const [dataCount, setDataCount] = useState({
    All: 0,
    Pending: 0,
    Received: 0,
    Reject: 0,
  });
  const [detail, setDetail] = useState(customizeRenderEmpty);
  const [detailNote, setDetailNote] = useState(customizeRenderEmpty);
  const [detailThing, setDetailThing] = useState(customizeRenderEmpty);

  const [sStartDate, setSStartDate] = useState(beforeDate.format(dateFormat));
  const [sEndDate, setSEndDate] = useState(currDate.format(dateFormat));
  const [sType, setSType] = useState(1);
  const [sInput, setSInput] = useState(null);
  const [sWork, setSWork] = useState(1);
  const [sWorkType, setSWorkType] = useState("All");
  const [sWorkTypeList, setSWorkTypeList] = useState([]);
  const [sDepart, setSDepart] = useState("ALL");
  const [sAddress, setSAddress] = useState(null);

  const [seperateTupe, setSeperateTupe] = useState(false);

  const handleDatePickerChangeStart = (christDate) => {
    if (!!christDate) {
      setSStartDate(dayjs(christDate).format(dateFormat));
    }
  };
  const handleDatePickerChangeEnd = (christDate) => {
    if (!!christDate) {
      setSEndDate(dayjs(christDate).format(dateFormat));
    }
  };

  const getWorkTypeList = (id) => {
    if (id === 2) {
      return axios.get(API_get_lab_form_head).then(function (response) {
        setSWorkTypeList((oldArray) => [
          { label: "All", value: "All" },
          ...response.data,
        ]);
      });
    } else if (id === 1) {
      return axios.get(API_get_lab_items_group).then(function (response) {
        setSWorkTypeList((oldArray) => [
          { label: "All", value: "All" },
          ...response.data,
        ]);
      });
    }
  };

  const summitNote = (id, note) => {
    setLoading(true);
    return axios
      .post(API_post_note, {
        id: id,
        note: note,
      })
      .then(function (response) {
        setLoading(false);
      });
  };

  const showDetail = (data) => {
    setDetail(
      !!data.lab_head[0] ? (
        <DetailComponent
          data={data.lab_head[0]}
          lab_profile={data.lab_profile}
          lab_single={data.lab_single}
        />
      ) : (
        { customizeRenderEmpty }
      )
    );
    setDetailNote(
      !!data.lab_head[0] ? (
        <DetailNoteComponent
          data={!!data.lab_head[0] ? data.lab_head[0] : ""}
          api={API_post_note}
          summitNote={summitNote}
        />
      ) : (
        { customizeRenderEmpty }
      )
    );
    setDetailThing(
      !!data.lab_order ? (
        <DetailThingComponent data={data.lab_order} />
      ) : (
        { customizeRenderEmpty }
      )
    );
    setLoadingData(false);
  };

  const setStatusListonClick = (id) => {
    setStatusList(id);
    onSelectChange([]);
    setDetail(customizeRenderEmpty);
    setDetailNote(customizeRenderEmpty);
    setDetailThing(customizeRenderEmpty);
  };

  const inputSType = (event) => {
    setSType(event.target.value);
  };
  const inputSInput = (event) => {
    setSInput(event.target.value);
  };
  const inputSDateRange = (event) => {
    if (!!event) {
      setSStartDate(dayjs(event).format(dateFormat));
      setSEndDate(dayjs(event[1]).format(dateFormat));
    }
  };
  const inputSWork = (event) => {
    setSWorkType("All");
    setSWork(event.target.value);
    getWorkTypeList(event.target.value);
  };
  const inputSWorkType = (value) => {
    setSWorkType(value);
  };
  const inputSDepart = (event) => {
    setSDepart(event.target.value);
  };
  const inputSAddress = (event) => {
    setSAddress(event.target.value);
  };

  const clickSeperateTupe = (event) => {
    setSeperateTupe(event.target.checked);
  };

  useEffect(() => {
    const loadData = async () => {
      setDetail(customizeRenderEmpty);
      setDetailNote(customizeRenderEmpty);
      setDetailThing(customizeRenderEmpty);
      setLoading(true);

      onSelectChange([]);

      const filter = {
        date_start: sStartDate,
        date_stop: sEndDate,
        time_start: dayjs(sStartDate).format("HH:mm:ss"),
        time_stop: dayjs(sEndDate).format("HH:mm:ss"),
        department: sDepart,
        address: sAddress,
        type: sType,
        text: sInput,
        form_name: sWorkType,
      };
      return axios.post(API_post_list, filter).then(function (response) {
        let dataArray = response.data;
        let count = {
          All: 0,
          Pending: 0,
          Received: 0,
          Reject: 0,
        };
        dataArray.forEach((d) => {
          if (d["h_status"] === "Pending") {
            count["Pending"] += 1;
          } else if (d["h_status"] === "Received") {
            count["Received"] += 1;
          } else if (d["h_status"] === "Reject") {
            count["Reject"] += 1;
          }
          count["All"] += 1;
        });
        setDataCount(count);
        setData(dataArray);
        setLoading(false);
      });
    };
    getWorkTypeList(sWork);
    loadData();
  }, [
    refreshKey,
    sStartDate,
    sEndDate,
    sType,
    sInput,
    sWorkType,
    sDepart,
    sWork,
    sAddress,
  ]);

  const actionControl = async (action) => {
    if (action === "print") {
      showPrint();
      onSelectChange([]);
    } else {
      return axios
        .post(API_post_action, {
          id: selectedRowKeys,
          action: action,
        })
        .then(function (response) {
          messageApi.open({
            type: response.data.result === true ? "success" : "error",
            content: response.data.alert,
          });

          if (acceptPrintBarcode) {
            showPrint();
          }
          onSelectChange([]);
          setRefreshKey((oldKey) => oldKey + 1);
          acceptPrintBarcode = false;
        });
    }
  };

  const loadDetail = async (dataDetail) => {
    setLoadingData(true);
    return axios
      .post(API_post_detail, {
        id: dataDetail.order_number,
      })
      .then(function (response) {
        showDetail(response.data);
      });
  };

  const columns = [
    {
      title: "เลขที่สั่ง",
      dataIndex: "order_number",
      key: "order_number",
      width: 70,
    },
    {
      title: "Status",
      dataIndex: "h_status",
      key: "h_status",
      width: 85,
    },
    {
      title: "HN",
      dataIndex: "HN",
      key: "HN",
      width: 80,
    },
    {
      title: "ชื่อผู้ป่วย",
      dataIndex: "patient_name",
      key: "patient_name",
      ellipsis: true,
      width: 200,
    },
    {
      title: "ชื่อใบสั่ง",
      dataIndex: "form_name",
      key: "form_name",
      ellipsis: true,
      width: 200,
    },
    {
      title: "ความเร่งด่วน",
      dataIndex: "priority",
      key: "priority",
      width: 100,
    },
    {
      title: "วันเวลาที่สั่ง",
      dataIndex: "order_date_time",
      key: "order_date_time",
      width: 150,
    },
    {
      title: "วันเวลาที่รับ",
      dataIndex: "time_receive_report",
      key: "time_receive_report",
      width: 150,
    },
    {
      title: "แผนก",
      dataIndex: "department",
      key: "department",
      width: 70,
    },
  ];
  // let acceptCondition = [];
  const [acceptCondition, setAcceptCondition] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let accept = [];
    if (newSelectedRowKeys.length > 0) {
      newSelectedRowKeys.map((items) => {
        if (
          data.find(
            (element) =>
              element["order_number"] === items &&
              element["h_status"] === "Pending"
          )
        ) {
          accept.push({
            order_number: items,
            status: true,
          });
        } else {
          accept.push({
            order_number: items,
            status: false,
          });
        }
      });
      setAcceptCondition(accept);
    } else {
      setAcceptCondition([]);
    }
  };
  const clickSelectRow = (newSelectedRow) => {
    if (selectedRowKeys.includes(newSelectedRow)) {
      let newSelectedRowKeys = selectedRowKeys.filter((key) => {
        if (newSelectedRow !== key) {
          return key;
        } else {
          return false;
        }
      });
      onSelectChange(newSelectedRowKeys);
    } else {
      onSelectChange([...selectedRowKeys, newSelectedRow]);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  const rangePresets = [
    {
      label: "ก่อนหน้านี้ 7 วัน",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "ก่อนหน้านี้ 14 วัน",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "ก่อนหน้านี้ 30 วัน",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "ก่อนหน้านี้ 3 เดือน",
      value: [dayjs().subtract(3, "month"), dayjs()],
    },
    {
      label: "ก่อนหน้านี้ 6 เดือน",
      value: [dayjs().subtract(6, "month"), dayjs()],
    },
    {
      label: "ก่อนหน้านี้ 1 ปี",
      value: [dayjs().subtract(12, "month"), dayjs()],
    },
  ];
  if (!session) {
    return <LoginComponent />;
  }
  return (
    <ConfigProvider locale={thTH} renderEmpty={customizeRenderEmpty}>
      {messageContext}
      <Layout style={{ background: "white" }}>
        <Content>
          <Row>
            <Col xs={24} lg={18}>
              <Content style={{ marginRight: "10px" }}>
                <Row>
                  <Col xs={24} lg={3} className="iconMenu">
                    <h1 style={{ margin: "auto 0" }}>ใบรับ LAB</h1>
                  </Col>
                  <Col xs={24} lg={21}>
                    <Card style={{ background: "#e2edf8", marginLeft: "10px" }}>
                      <Row gutter={24}>
                        <Col xs={12} lg={5}>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <DatePicker
                              calendar={thai}
                              locale={thai_th}
                              value={dayjs(sStartDate, dateFormat)
                                .add(543, "year")
                                .format("DD-MM-YYYY")}
                              format="DD-MM-YYYY"
                              onChange={handleDatePickerChangeStart}
                              inputClass="datepicker-input"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} lg={5}>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <DatePicker
                              calendar={thai}
                              locale={thai_th}
                              value={dayjs(sEndDate, dateFormat)
                                .add(543, "year")
                                .format("DD-MM-YYYY")}
                              format="DD-MM-YYYY"
                              onChange={handleDatePickerChangeEnd}
                              inputClass="datepicker-input"
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <Radio.Group onChange={inputSType} value={sType}>
                              <Radio value={1}>Barcode</Radio>
                              <Radio value={2}>HN</Radio>
                              <Radio value={3}>ชื่อ-สกุล</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col flex="auto">
                          <Form.Item
                            style={{ marginBottom: 5, marginTop: 5 }}
                            label=":"
                          >
                            <Input onChange={inputSInput} value={sInput} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <Radio.Group onChange={inputSWork} value={sWork}>
                              <Radio value={1}>งาน</Radio>
                              <Radio value={2}>Lab form</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <Select
                              showSearch
                              onChange={inputSWorkType}
                              value={sWorkType}
                              style={{
                                width: 200,
                              }}
                              options={sWorkTypeList}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                            <Radio.Group
                              onChange={inputSDepart}
                              value={sDepart}
                            >
                              <Radio value={"ALL"}>ALL</Radio>
                              <Radio value={"OPD"}>OPD</Radio>
                              <Radio value={"IPD"}>IPD</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col flex="auto">
                          <Form.Item
                            style={{ marginBottom: 5, marginTop: 5 }}
                            label="ที่อยู่ :"
                          >
                            <Input onChange={inputSAddress} value={sAddress} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row style={{ margin: "10px 0" }}>
                  <Col span={16}>
                    <Row>
                      <Col span={6}>
                        <Button
                          onClick={() => setStatusListonClick("All")}
                          type={statusList === "All" ? "primary" : "default"}
                          block
                        >
                          All({dataCount["All"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button
                          onClick={() => setStatusListonClick("Pending")}
                          type={
                            statusList === "Pending" ? "primary" : "default"
                          }
                          block
                        >
                          Pending({dataCount["Pending"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button
                          onClick={() => setStatusListonClick("Received")}
                          type={
                            statusList === "Received" ? "primary" : "default"
                          }
                          block
                        >
                          Received({dataCount["Received"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button
                          onClick={() => setStatusListonClick("Reject")}
                          type={statusList === "Reject" ? "primary" : "default"}
                          block
                        >
                          Reject({dataCount["Reject"].toLocaleString()})
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      style={{ padding: 5, paddingLeft: 20 }}
                      onChange={clickSeperateTupe}
                    >
                      Separate Tupe (FBS)
                    </Checkbox>
                  </Col>
                </Row>
              </Content>
              <Content style={{ marginRight: "10px" }}>
                <Spin spinning={loading} tip="กำลังโหลดข้อมูล" size="large">
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data.filter((d) => {
                      if (statusList === "All") {
                        return d;
                      } else if (statusList === d["h_status"]) {
                        return d;
                      }
                      return false;
                    })}
                    rowKey={"order_number"}
                    size="small"
                    scroll={{
                      x: 1100,
                    }}
                    // sticky
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          loadDetail(record);
                          clickSelectRow(record.order_number);
                        }, // click row
                      };
                    }}
                  />
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
                          <Button
                            style={{
                              padding: 10,
                              cursor: "pointer",
                              height: "auto",
                              minWidth: 100,
                            }}
                            onClick={() => {
                              showConfirm("accept");
                            }}
                            disabled={selectedRowKeys.length > 0 ? false : true}
                          >
                            <div>
                              <CheckCircleOutlined
                                style={{
                                  fontSize: 40,
                                }}
                              />
                            </div>
                            <div>รับใบ LAB</div>
                          </Button>
                        </div>
                        <div style={{ padding: 5 }}>
                          <Button
                            style={{
                              padding: 10,
                              cursor: "pointer",
                              height: "auto",
                              minWidth: 100,
                            }}
                            onClick={() => {
                              showConfirmDelete("reject");
                            }}
                            disabled={selectedRowKeys.length !== 1}
                          >
                            <div>
                              <StopOutlined
                                style={{
                                  fontSize: 40,
                                }}
                              />
                            </div>
                            <div>ปฎิเสธ</div>
                          </Button>
                        </div>
                        <div style={{ padding: 5 }}>
                          <Button
                            danger
                            style={{
                              padding: 10,
                              cursor: "pointer",
                              height: "auto",
                              minWidth: 100,
                            }}
                            onClick={() => {
                              showConfirm("delete");
                            }}
                            disabled={selectedRowKeys.length > 0 ? false : true}
                          >
                            <div>
                              <DeleteOutlined
                                style={{
                                  fontSize: 40,
                                }}
                              />
                            </div>
                            <div>ลบ</div>
                          </Button>
                        </div>
                        <div style={{ padding: 5 }}>
                          <Button
                            style={{
                              padding: 10,
                              cursor: "pointer",
                              height: "auto",
                              minWidth: 100,
                            }}
                            onClick={() => {
                              actionControl("print");
                            }}
                            disabled={selectedRowKeys.length > 0 ? false : true}
                          >
                            <div>
                              <PrinterOutlined
                                style={{
                                  fontSize: 40,
                                }}
                              />
                            </div>
                            <div>พิมพ์ Barcode ซ้ำ</div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={6}>
              <StickyBox>
                <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล" size="large">
                  <Content>
                    <Card
                      title="รายละเอียด Lab Order"
                      style={{ marginBottom: "10px" }}
                    >
                      {detail}
                    </Card>
                    <Card title="Lab Note" style={{ marginBottom: "10px" }}>
                      {detailNote}
                    </Card>
                    <Card title="ประเภทสิ่งส่งตรวจ">{detailThing}</Card>
                  </Content>
                </Spin>
              </StickyBox>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default LabReq;
