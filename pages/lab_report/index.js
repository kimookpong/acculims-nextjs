import React, { useEffect, useState, useRef } from "react";
import thTH from "antd/locale/th_TH";
import { ThaiDatePicker } from "thaidatepicker-react";

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
import {
  DiffOutlined,
  PrinterOutlined,
  FileDoneOutlined,
  SaveOutlined,
  FormOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import ReactToPrint from "react-to-print";
import DetailComponent from "./DetailComponent";
import DetailNoteComponent from "./DetailNoteComponent";
import LabOrderComponent from "./LabOrderComponent";
import LabOrderPrintComponent from "./LabOrderPrintComponent";
import LabOrderActionComponent from "./LabOrderActionComponent";

import { useSession } from "next-auth/react";
import LoginComponent from "../layout/LoginComponent";
import TimeCounter from "./TImeCounter";

const API_server = "";
const API_post_list = API_server + "/api/lab_report";
const API_post_detail = API_server + "/api/lab_order_detail";

const API_post_barcode = API_server + "/api/lab_barcode";
const API_get_lab_form_head = API_server + "/api/get_lab_form_head";
const API_get_lab_items_group = API_server + "/api/get_lab_items_group";
const API_get_doctor = API_server + "/api/get_doctor";
const API_lis_user = API_server + "/api/get_lis_user";
const API_get_lis_user_check_from_password =
  API_server + "/api/get_lis_user_check_from_password";

const API_post_action = API_server + "/api/lab_report_action_event";
const API_post_cancel_reason = API_server + "/api/lab_order_reject";
const API_post_note = API_server + "/api/lab_order_note";

const API_report_detail = API_server + "/api/lab_report_detail";
const API_report_detail_update = API_server + "/api/lab_report_update";

const { Content } = Layout;
const dateFormat = "YYYY-MM-DD";
const currDate = dayjs();
const beforeDate = currDate.subtract(3, "month");

function LabReport() {
  const componentRef = useRef();

  const { data: session } = useSession();

  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshKeyDetail, setRefreshKeyDetail] = useState(0);
  let dataRejectReason = [];
  const onAddRejectForm = (newItem) => {
    dataRejectReason = newItem;
  };
  const [messageApi, messageContext] = message.useMessage();
  const closeModal = () => {
    Modal.destroyAll();
  };
  const [checkRerun, setCheckRerun] = useState(false);
  const [checkPrint, setCheckPrint] = useState(false);
  let clickRerun = (event) => {
    setCheckRerun(event.target.checked);
  };
  let acceptPrintBarcode = false;
  const changeAcceptPrintBarcode = (event) => {
    acceptPrintBarcode = event.target.checked;
  };
  let dataSubmitForm = [];
  const getFormData = (
    formCodeData,
    formCommentData,
    formPartialData,
    formLabData,
    formPrintData
  ) => {
    dataSubmitForm = {
      formCode: formCodeData,
      formComment: formCommentData,
      formDate: currDate.format("YYYY-MM-DD"),
      formTime: currDate.format("HH:mm:ss"),
      formPartial: formPartialData ? "P" : "",
    };
    setCheckPrint(formPrintData);
  };
  const validateFormAction = (action) => {
    if (dataSubmitForm.formCode !== "") {
      actionControl(action);
    }
  };
  const showConfirm = (action) => {
    return Modal.confirm({
      centered: true,
      title:
        action === "report" ? "ยืนยันรายงานผล LAB?" : "ยืนยันรับรองผล LAB?",
      content: (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <LabOrderActionComponent
            action={action}
            orderNumber={selectedRadioKeys}
            getFormData={getFormData}
          />

          <div className="ant-modal-confirm-btns">
            <Button key="back" onClick={closeModal}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => validateFormAction(action)}
              onPressEnter={() => validateFormAction(action)}
            >
              ยืนยัน
            </Button>
          </div>
        </Form>
      ),
      footer: <></>,
      // onOk() {
      //   actionControl(action);
      // },
    });
  };

  const showPrint = (order_number) => {
    return axios
      .post(API_post_detail, {
        id: order_number,
      })
      .then(function (response) {
        Modal.info({
          centered: true,
          width: 730,
          title: "พิมพ์ Barcode",
          icon: <PrinterOutlined />,
          content: (
            <div ref={componentRef}>
              <LabOrderPrintComponent
                data={dataReport}
                dataPartial={dataReportPartial}
                key={dataReport.lab_order_number}
                detail={response.data.lab_head[0]}
              />
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
  const [dataReport, setDataReport] = useState([]);
  const [dataItemGroup, setDataItemGroup] = useState([]);
  const [dataItemGroupSelect, setDataItemGroupSelect] = useState("All");
  const [labOrderUpdate, setLabOrderUpdate] = useState([]);
  const inputLabOrderUpdate = (
    lab_items_code,
    lab_order_result_manual,
    flag
  ) => {
    let newData = labOrderUpdate;
    newData[lab_items_code] = {
      lab_order_result_manual: lab_order_result_manual,
      flag: flag,
    };
    setLabOrderUpdate(newData);
  };
  const changeItemGroupSelect = (event) => {
    setDataItemGroupSelect(event);
  };
  const [formDisable, setFormDisable] = useState(true);
  const clickActionForm = (action) => {
    if (action === "edit") {
      setFormDisable(false);
      setLoading(true);
    } else if (action === "cancel") {
      setFormDisable(true);
      setLoading(false);
    } else if (action === "report") {
      showConfirm(action);
    } else if (action === "approve") {
      showConfirm(action);
    } else if (action === "submit") {
      setLoadingData(true);
      let dataToUpdate = [];
      labOrderUpdate.map((item, index) => {
        dataToUpdate.push({
          lab_order_number: selectedRadioKeys.join(),
          lab_items_code: index,
          lab_order_result_manual: item.lab_order_result_manual,
          flag: item.flag,
        });
      });
      if (dataToUpdate.length > 0) {
        return axios
          .post(API_report_detail_update, {
            data: dataToUpdate,
            lab_order_number: selectedRadioKeys.join(),
          })
          .then(function (response) {
            setFormDisable(true);
            setLoading(false);
            setLoadingData(false);
            setLabOrderUpdate([]);
            setRefreshKey((oldKey) => oldKey + 1);
          });
      } else {
        setFormDisable(true);
        setLoading(false);
        setLoadingData(false);
        setLabOrderUpdate([]);
      }
    }
  };
  const [dataReportStatus, setDataReportStatus] = useState(
    <span style={{ color: "#f2f2f2" }}>Status</span>
  );
  const [dataReportPartial, setDataReportPartial] = useState("");
  const [statusList, setStatusList] = useState("All");
  const [dataCountReport, setDataCountReport] = useState({
    All: 0,
    Pending: 0,
    Process: 0,
    Completed: 0,
    Reported: 0,
    Approved: 0,
  });
  const [detail, setDetail] = useState(null);
  const [detailNote, setDetailNote] = useState(null);

  const [sStartDate, setSStartDate] = useState(beforeDate.format(dateFormat));
  const [sEndDate, setSEndDate] = useState(currDate.format(dateFormat));
  const [sType, setSType] = useState(1);
  const [sInput, setSInput] = useState(null);
  const [sWork, setSWork] = useState(1);
  const [sWorkType, setSWorkType] = useState("All");
  const [sWorkTypeList, setSWorkTypeList] = useState([]);
  const [sDepart, setSDepart] = useState("ALL");
  const [sAddress, setSAddress] = useState(null);

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
      !!data.lab_head[0]["department"] ? (
        <DetailComponent data={data.lab_head[0]} />
      ) : (
        <Empty description={false} />
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
        <Empty description={false} />
      )
    );
    setLoadingData(false);
  };

  const setStatusListonClick = (id) => {
    setStatusList(id);
    setSelectedRadioKeys([]);
    setDataReportStatus(<span style={{ color: "#f2f2f2" }}>Status</span>);
    setDataReport([]);
    setDetail(<Empty description={false} />);
    setDetailNote(<Empty description={false} />);
  };

  const inputSType = (event) => {
    setSType(event.target.value);
  };
  const inputSInput = (event) => {
    setSInput(event.target.value);
  };
  const inputSDateRange = (event) => {
    if (!!event) {
      setSStartDate(dayjs(event[0]).format(dateFormat));
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

  useEffect(() => {
    const loadData = async () => {
      setDetail(<Empty description={false} />);
      setDetailNote(<Empty description={false} />);
      setDataReport([]);
      setLoading(true);
      setDataReportStatus(<span style={{ color: "#f2f2f2" }}>Status</span>);
      setDataReportPartial("");

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
      return await axios.post(API_post_list, filter).then(function (response) {
        let dataArray = response.data;
        let count = {
          All: 0,
          Pending: 0,
          Process: 0,
          Completed: 0,
          Reported: 0,
          Approved: 0,
        };
        dataArray.forEach((d) => {
          if (d["h_status"] === "Pending") {
            count["Pending"] += 1;
          } else if (d["h_status"] === "Process") {
            count["Process"] += 1;
          } else if (d["h_status"] === "Completed") {
            count["Completed"] += 1;
          } else if (d["h_status"] === "Reported") {
            count["Reported"] += 1;
          } else if (d["h_status"] === "Approved") {
            count["Approved"] += 1;
          }
          count["All"] += 1;
        });
        setDataCountReport(count);
        getWorkTypeList(sWork);
        setData(dataArray);
        setLoading(false);
      });
    };

    loadData();
  }, [
    refreshKey,
    sStartDate,
    sEndDate,
    sType,
    sInput,
    sWorkType,
    sDepart,
    sAddress,
  ]);

  const actionControl = async (action) => {
    let order_number = selectedRadioKeys;
    if (action === "print") {
      showPrint(order_number.join());
    } else {
      return axios
        .post(API_post_action, {
          id: order_number,
          action: action,
          form: dataSubmitForm,
        })
        .then(function (response) {
          if (response.data.result === true) {
            closeModal();
            messageApi.open({
              type: "success",
              content: response.data.alert,
            });
            dataSubmitForm = [];
            if (checkPrint && response.data.result === true) {
              showPrint(order_number.join());
            }

            setRefreshKey((oldKey) => oldKey + 1);
          } else {
            messageApi.open({
              type: "error",
              content: response.data.alert,
            });
          }
        });
    }
  };
  const loadReport = async (dataDetail) => {
    return axios
      .post(API_report_detail, {
        id: dataDetail.order_number,
      })
      .then(function (response) {
        let dataGroup = [{ label: "All", value: "All" }];
        setDataReport(response.data);
        response.data.map((item, index) => {
          if (
            index === 0 ||
            response.data[index].group_code !==
              response.data[index - 1].group_code
          ) {
            if (response.data[index].group_code !== null) {
              dataGroup.push({
                label: item["group_name"],
                value: item["group_code"],
              });
            }
          }
        });
        setDataItemGroup(dataGroup);
        setDataItemGroupSelect("All");
      });
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

  const calculateDiff = (raw_data) => {
    let raw = raw_data.split(",");
    if (parseInt(raw[0])) {
      return raw[0] + "." + raw[1];
    } else {
      return raw[1];
    }
  };

  const columns = [
    {
      title: "เลขที่สั่ง",
      dataIndex: "order_number",
      key: "order_number",
      width: 70,
    },
    {
      title: "P",
      dataIndex: "p",
      key: "p",
      render: (text) => <b style={{ color: "red" }}>{text}</b>,
      width: 30,
    },
    {
      title: "Status",
      dataIndex: "h_status",
      key: "h_status",
      width: 85,
    },
    {
      title: "เวลาที่รอ",
      dataIndex: "timediff",
      key: "timediff",
      render: (_, record) => (
        <>
          {record.h_status === "Approved" ? (
            record.timediff ? (
              calculateDiff(record.timediff)
            ) : (
              "--:--:--"
            )
          ) : (
            <TimeCounter recieveDate={record.receive_date_raw} />
          )}
        </>
      ),
      width: 100,
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
      title: "วันเวลาที่รับ",
      dataIndex: "time_receive_report",
      key: "time_receive_report",
      width: 150,
    },
    {
      title: "วันเวลาที่รับรอง",
      dataIndex: "time_report",
      key: "time_report",
      render: (text) => <>{text ? text : "-"}</>,
      width: 150,
    },

    {
      title: "แผนก",
      dataIndex: "department",
      key: "department",
      width: 70,
    },
  ];

  const [selectedRadioKeys, setSelectedRadioKeys] = useState([]);
  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRadioKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      rowSelectFunc(selectedRows[0]);
    },
  };

  const reloadReport = () => {
    loadReport(selectedRadioKeys.join());
  };

  const rowSelectFunc = (record) => {
    setSelectedRadioKeys([record.order_number]);
    loadDetail(record);
    loadReport(record);
    setDataReportStatus(record.h_status);
    setDataReportPartial(record.p);
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

  const customizeRenderEmpty = () => <Empty description={false} />;

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
              <Row>
                <Col xs={24} lg={3} className="iconMenu">
                  <h1 style={{ margin: "auto 0" }}>รายงานผล LAB</h1>
                </Col>
                <Col xs={24} lg={21}>
                  <Card style={{ background: "#e2edf8", margin: "0 10px" }}>
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
                          <Radio.Group onChange={inputSDepart} value={sDepart}>
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
            </Col>
            <Col xs={24} lg={6}>
              <Row>
                <Col xs={24} lg={24}>
                  <Row style={{ padding: 24 }}>
                    <Col span={12}>
                      <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                        <Select
                          showSearch
                          style={{
                            width: 150,
                          }}
                          value={dataItemGroupSelect}
                          onChange={changeItemGroupSelect}
                          options={dataItemGroup}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                        <Checkbox onClick={clickRerun}>ปล่อยผล Rerun</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <h4
                        style={{
                          margin: "5px",
                          fontSize: "26px",
                          textAlign: "center",
                        }}
                      >
                        Status ={" "}
                        <span style={{ color: "red" }}>{dataReportStatus}</span>
                      </h4>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={12}>
              <Content>
                <Row style={{ margin: "10px 0" }}>
                  <Col span={24}>
                    <Row>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("All")}
                          type={statusList === "All" ? "primary" : "default"}
                          block
                          style={{ padding: 0 }}
                        >
                          All({dataCountReport["All"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("Pending")}
                          type={
                            statusList === "Pending" ? "primary" : "default"
                          }
                          block
                          style={{ padding: 0 }}
                        >
                          Pending({dataCountReport["Pending"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("Process")}
                          type={
                            statusList === "Process" ? "primary" : "default"
                          }
                          block
                          style={{ padding: 0 }}
                        >
                          Process(
                          {dataCountReport["Process"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("Completed")}
                          type={
                            statusList === "Completed" ? "primary" : "default"
                          }
                          block
                          style={{ padding: 0 }}
                        >
                          Completed(
                          {dataCountReport["Completed"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("Reported")}
                          type={
                            statusList === "Reported" ? "primary" : "default"
                          }
                          block
                          style={{ padding: 0 }}
                        >
                          Reported(
                          {dataCountReport["Reported"].toLocaleString()})
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          onClick={() => setStatusListonClick("Approved")}
                          type={
                            statusList === "Approved" ? "primary" : "default"
                          }
                          block
                          style={{ padding: 0 }}
                        >
                          Approved(
                          {dataCountReport["Approved"].toLocaleString()})
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Content>
              <Content>
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
                      x: 1130,
                    }}
                    //sticky
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          rowSelectFunc(record);
                        }, // click row
                      };
                    }}
                  />
                </Spin>
              </Content>
              <Row>
                <Col span={12}>
                  <Spin
                    spinning={loadingData}
                    tip="กำลังโหลดข้อมูล"
                    size="large"
                  >
                    <Content>
                      <Card
                        title="::ความเห็นเจ้าหน้าที่"
                        style={{ marginRight: "5px", marginTop: "10px" }}
                      >
                        {detailNote}
                      </Card>
                    </Content>
                  </Spin>
                </Col>
                <Col span={12}>
                  <Spin
                    spinning={loadingData}
                    tip="กำลังโหลดข้อมูล"
                    size="large"
                  >
                    <Content>
                      <Card
                        title="::รายละเอียด"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        {detail}
                      </Card>
                    </Content>
                  </Spin>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={12}>
              <Content>
                <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล" size="large">
                  <Row style={{ padding: "10px 0 10px 10px" }}>
                    <Col span={24}>
                      <LabOrderComponent
                        data={!!dataReport ? dataReport : null}
                        key={dataReport["lab_items_code"]}
                        id={dataReport["lab_items_code"]}
                        formDisable={formDisable}
                        labOrderData={inputLabOrderUpdate}
                        dataItemGroupSelect={dataItemGroupSelect}
                        checkRerun={checkRerun}
                        reportStatus={dataReportStatus}
                        labOrderNumber={selectedRadioKeys.join()}
                        reloadReport={reloadReport}
                      />
                    </Col>
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
                                  clickActionForm("submit");
                                }}
                                disabled={formDisable}
                              >
                                <div>
                                  <SaveOutlined
                                    style={{
                                      fontSize: 40,
                                    }}
                                  />
                                </div>
                                <div>บันทึกผล</div>
                              </Button>
                            </div>
                            <div style={{ padding: 5 }}>
                              <Button
                                danger={!formDisable ? true : false}
                                style={{
                                  padding: 10,
                                  cursor: "pointer",
                                  height: "auto",
                                  minWidth: 100,
                                }}
                                onClick={() => {
                                  if (!formDisable) {
                                    clickActionForm("cancel");
                                  } else {
                                    clickActionForm("edit");
                                  }
                                }}
                                disabled={
                                  (dataReport.length > 0 ? false : true) ||
                                  (dataReportStatus !== "Reported" &&
                                    dataReportStatus !== "Approved")
                                }
                              >
                                <div>
                                  <FormOutlined
                                    style={{
                                      fontSize: 40,
                                    }}
                                  />
                                </div>
                                <div>
                                  {formDisable ? "แก้ไขผล" : "ยกเลิกแก้ไข"}
                                </div>
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
                                  clickActionForm("report");
                                }}
                                disabled={
                                  !formDisable ||
                                  (dataReport.length > 0 ? false : true) ||
                                  (dataReportStatus !== "Pending" &&
                                    dataReportStatus !== "Process" &&
                                    dataReportStatus !== "Completed")
                                }
                              >
                                <div>
                                  <DiffOutlined
                                    style={{
                                      fontSize: 40,
                                    }}
                                  />
                                </div>
                                <div>รายงานผล</div>
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
                                  clickActionForm("approve");
                                }}
                                disabled={
                                  !formDisable ||
                                  (dataReport.length > 0 ? false : true) ||
                                  (dataReportStatus !== "Pending" &&
                                    dataReportStatus !== "Process" &&
                                    dataReportStatus !== "Completed" &&
                                    dataReportStatus !== "Reported" &&
                                    dataReportPartial !== "P")
                                }
                              >
                                <div>
                                  <FileDoneOutlined
                                    style={{
                                      fontSize: 40,
                                    }}
                                  />
                                </div>
                                <div>รับรองผล</div>
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
                                disabled={
                                  !formDisable ||
                                  (dataReport.length > 0 ? false : true) ||
                                  dataReportStatus !== "Approved"
                                }
                              >
                                <div>
                                  <PrinterOutlined
                                    style={{
                                      fontSize: 40,
                                    }}
                                  />
                                </div>
                                <div>พิมพ์ผลซ้ำ</div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Spin>
              </Content>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default LabReport;
