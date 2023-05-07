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
const dateFormat = "YYYY-MM-DD";

import {
  Divider,
  Modal,
  Input,
  Button,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  Radio,
  Space,
  AutoComplete,
  Skeleton,
  InputNumber,
  message,
  Table,
} from "antd";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const AddFormComponent = (props) => {
  const { hnSelect, setRefreshKey, list, addPatient } = props;

  const [messageApi, messageContext] = message.useMessage();

  const [dataSelect, setDataSelect] = useState();
  const [fields, setFields] = useState([]);
  const [fieldsVisit, setFieldsVisit] = useState([]);

  const [visit, setVisit] = useState([]);

  const [sWorkTypeList, setSWorkTypeList] = useState([]);
  const [workType, setWorkType] = useState();

  const [selectHN, setselectHN] = useState([]);
  const [selectCurrentHN, setselectCurrentHN] = useState();
  const [searchCurrentHN, setsearchCurrentHN] = useState();
  const [loadingHN, setLoadingHN] = useState(false);
  const [optionsHN, setOptions] = useState([]);

  const [visitForm, setVisitForm] = useState(false);
  const [formData] = Form.useForm();
  const [dataVisit, setDataVisit] = useState([]);
  const [selectedRadioKeys, setSelectedRadioKeys] = useState([]);

  const rowSelectionVisit = {
    type: "radio",
    selectedRowKeys: selectedRadioKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows[0]);
      rowSelectFunc(selectedRows[0]);
    },
  };
  const rowSelectFunc = (record) => {
    setSelectedRadioKeys([record.visit_number]);
  };

  useEffect(() => {
    if (!!hnSelect) {
      handleSearchHN(hnSelect);
      //onSelectHN(hnSelect);
    }
  }, [hnSelect]);

  const columnsVisit = [
    {
      title: "vn",
      dataIndex: "visit_number",
      key: "visit_number",
    },
    {
      title: "วันที่มา",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) =>
        dayjs(text, dateFormat).add(543, "year").format("DD-MM-YYYY"),
    },
    {
      title: "ประเภทการมา",
      dataIndex: "come_type",
      key: "come_type",
    },
    {
      title: "สิทธิการรักษา",
      dataIndex: "welfare",
      key: "welfare",
    },
    {
      title: "น้ำหนัก",
      dataIndex: "weight",
      key: "weight",
      width: 40,
    },
    {
      title: "ส่วนสูง",
      dataIndex: "height",
      key: "height",
      width: 40,
    },
    {
      title: "BMI",
      dataIndex: "bmi",
      key: "bmi",
      width: 40,
    },
    {
      title: "ชีพจร",
      dataIndex: "pulse",
      key: "pulse",
      width: 40,
    },
    {
      title: "SBP",
      dataIndex: "systolic",
      key: "systolic",
      width: 40,
    },
    {
      title: "DBP",
      dataIndex: "diastolic",
      key: "diastolic",
      width: 40,
    },
  ];

  const getVisitingList = (hn) => {
    return axios
      .post("/api/get_hisvisit", {
        hn: hn,
      })
      .then((response) => {
        setDataVisit(response.data);
      });
  };

  const listVisitForm = () => {
    if (!!selectCurrentHN) {
      return (
        <>
          <Table
            rowSelection={rowSelectionVisit}
            columns={columnsVisit}
            dataSource={dataVisit}
            bordered
            rowKey={"visit_number"}
            size="small"
            //sticky
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  rowSelectFunc(record);
                }, // click row
              };
            }}
            title={() => {
              return (
                <Button onClick={showVisitForm}>
                  <PlusCircleOutlined /> เพิ่ม
                </Button>
              );
            }}
          />
        </>
      );
    } else {
      return <Skeleton />;
    }
  };

  const showVisitForm = () => {
    setFieldsVisit([
      {
        name: ["vn"],
        value: dayjs().format("YYMMDDHHmmss"),
      },
    ]);
    setVisitForm(true);
  };

  const closeVisitForm = () => {
    setFieldsVisit([]);
    formData.resetFields();
    setVisitForm(false);
  };

  const submitVisitForm = (values) => {
    const visitForm = {
      visit_number: values.vn,
      hn: selectCurrentHN,
      come_type: values.come_type,
      last_come: !!values.last_come
        ? values.last_come.add(-543, "year").format(dateFormat)
        : undefined,
      welfare: values.welfare,
      height: values.height,
      weight: values.weight,
      pulse: values.pulse,
      bmi: values.bmi,
      systolic: values.systolic,
      diastolic: values.diastolic,
      disease: values.disease,
      drug_allergy: values.drug_allergy,
      drug_list: values.drug_list,
      food_allergy: values.food_allergy,
      food_list: values.food_list,
      symptom: values.symptom,
      start_date: !!values.start_date
        ? values.start_date.add(-543, "year").format(dateFormat)
        : undefined,
    };
    return axios
      .post("/api/add_new_hisvisit", {
        form: visitForm,
      })
      .then((response) => {
        getVisitingList(selectCurrentHN);
        closeVisitForm();
      });
  };

  useEffect(() => {
    getWorkTypeListForm("1");
  }, [list]);

  useEffect(() => {
    if (!!selectCurrentHN) {
      console.log("selectCurrentHN", selectCurrentHN);
    }
  }, [selectCurrentHN]);

  const setWorkTypeForm = (id) => {
    const selectDetail = list.find((items) => {
      if (id === items.name) {
        return items;
      }
      return null;
    });
    setDataSelect(selectDetail.data);
  };

  const [dataHeight, setDataHeight] = useState(0);
  const [dataWeight, setDataWeight] = useState(0);

  const onChangeHeight = (event) => {
    if (dataWeight > 0) {
      setFieldsVisit([
        {
          name: ["bmi"],
          value: calculateBMI(dataWeight, event),
        },
      ]);
    }
    setDataHeight(event);
  };

  const onChangeWeight = (event) => {
    if (dataHeight > 0) {
      setFieldsVisit([
        {
          name: ["bmi"],
          value: calculateBMI(event, dataHeight),
        },
      ]);
    }
    setDataWeight(event);
  };

  const getWorkTypeListForm = (id) => {
    if (id === "2") {
      return axios.get("/api/get_lab_form_head").then(function (response) {
        setSWorkTypeList(response.data);
      });
    } else if (id === "1") {
      return axios.get("/api/get_lab_items_group").then(function (response) {
        setSWorkTypeList(response.data);
      });
    }
  };

  const searchResult = (query) => {
    setLoadingHN(true);
    return axios
      .post("/api/get_patient_from_hn", {
        q: query,
      })
      .then(function (response) {
        if (response.data.length) {
          setselectHN(response.data);
          let dataSerchList = response.data.map((item) => {
            return {
              value: item.value,
              label: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{item.value}</span>
                  <span>{item.label}</span>
                </div>
              ),
            };
          });
          setOptions(dataSerchList);

          if (hnSelect === query) {
            let result = response.data.find((obj) => {
              return obj.value === hnSelect;
            });

            if (result) {
              getVisitingList(result.value);
              setselectCurrentHN(result.value);
              setFields([
                {
                  name: ["hn"],
                  value: result.value,
                },
                {
                  name: ["fullname"],
                  value: result.label,
                },

                {
                  name: ["sex"],
                  value: setSex(result.sex),
                },
                {
                  name: ["age"],
                  value: calculateAge(result.birthday),
                },
              ]);
            } else {
              setFields([]);
              setselectCurrentHN();
            }
          }
        } else {
          setselectHN([]);
          setOptions([
            {
              value: 0,
              label: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <PlusCircleOutlined /> เพิ่มข้อมูล Patient
                  </span>
                  <span></span>
                </div>
              ),
            },
          ]);
        }
        setLoadingHN(false);
      });
  };

  const calculateBMI = (weight, height) => {
    // Convert height to meters if it's in centimeters
    height = height / 100;
    // Calculate BMI using the formula: weight (kg) / height (m) squared
    const bmi = weight / (height * height);
    // Round BMI to two decimal places
    return Math.round(bmi * 100) / 100;
  };

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
  const setSex = (sex) => {
    if (sex === "1") {
      return "ชาย";
    }
    if (sex === "2") {
      return "หญิง";
    }
    return "";
  };

  const handleSearchHN = (value) => {
    setsearchCurrentHN(value);
    if (value) {
      searchResult(value);
    } else {
      setselectHN([]);
      setFields([]);
      setselectCurrentHN();
      setOptions([]);
    }
  };

  const onSelectHN = (value) => {
    if (value === 0) {
      //closeModal();
      addPatient(searchCurrentHN);
    }
    if (selectHN.length) {
      let result = selectHN.find((obj) => {
        return obj.value === value;
      });

      if (result) {
        getVisitingList(result.value);
        setselectCurrentHN(result.value);
        setFields([
          {
            name: ["hn"],
            value: result.value,
          },
          {
            name: ["fullname"],
            value: result.label,
          },

          {
            name: ["sex"],
            value: setSex(result.sex),
          },
          {
            name: ["age"],
            value: calculateAge(result.birthday),
          },
        ]);
      } else {
        setFields([]);
        setselectCurrentHN();
      }
    } else {
      setFields([]);
      setselectCurrentHN();
    }
  };

  const onChangeChecklistGroup = (event, group, subgroup_index) => {
    const updatedDataSelectUpdate = dataSelect[subgroup_index].data.map(
      (items) => {
        return { ...items, status: event.target.checked };
      }
    );

    let updatedDataSelect = [...dataSelect];
    updatedDataSelect[subgroup_index].data = updatedDataSelectUpdate;
    setDataSelect(updatedDataSelect);
  };

  const onChangeChecklist = (
    event,
    items,
    group,
    subgroup_index,
    item_index
  ) => {
    let updatedDataSelect = [...dataSelect];

    updatedDataSelect[subgroup_index].data[item_index] = {
      ...dataSelect[subgroup_index].data[item_index],
      status: event.target.checked,
    };
    setDataSelect(updatedDataSelect);

    console.log(updatedDataSelect, dataSelect, updatedDataSelect);
  };

  const onFinish = (values) => {
    if (!!selectedRadioKeys.join()) {
      let sub_group_select = [];
      let countSame = [];
      let dataOrder = [];
      dataSelect.map((subgroup) => {
        if (!!subgroup) {
          subgroup.data.map((items) => {
            if (!!items.status && items.status === true) {
              // get subgroup code
              const targetSubgroup = sub_group_select.find(
                (obj) => obj === items.lab_items_sub_group_code
              );
              if (!targetSubgroup && !!items.lab_items_sub_group_code) {
                sub_group_select.push(items.lab_items_sub_group_code);
              }

              // check same item_code
              const targetObject = dataOrder.find(
                (obj) => obj.lab_items_code === items.lab_items_code
              );
              if (!!targetObject) {
                countSame.push(items.lab_items_name_ref);
              }
              dataOrder.push(items);
            }
          });
        }
      });

      let dataHead = {
        doctor_code: null,
        hn: values.hn,
        vn: selectedRadioKeys.join(),
        order_date: dayjs().format("YYYY-MM-DD"),
        department: values.department,
        form_name: values.form_name,
        sub_group_list: sub_group_select.join(","),
        order_time: dayjs().format("HH:mm:ss"),
        ward: null,
        lis_order_no: null,
        receive_computer: null,
        order_department: null,
        lab_priority_id: 0,
        receive_status: "Pending",
      };
      if (!!countSame && countSame.length > 0) {
        messageApi.open({
          type: "error",
          content: "มีการสั่งรายการแล็บซ้ำ (" + countSame.join(", ") + ")",
        });
      } else {
        return axios
          .post("/api/add_new_lab_order", {
            lab_head: dataHead,
            lab_order: dataOrder,
          })
          .then((response) => {
            setRefreshKey((oldKey) => oldKey + 1);
            closeModal();
          });
      }
    } else {
      messageApi.open({
        type: "error",
        content: "กรุณาเลือกรายงาน Visiting Form",
      });
    }
  };

  const closeModal = () => {
    Modal.destroyAll();
  };

  return (
    <>
      {messageContext}
      <Modal
        open={visitForm}
        title="Visit Form"
        closable=""
        centered
        width="900px"
        // onOk={submitVisitForm}
        //onCancel={closeVisitForm}
        footer={<></>}
      >
        <Form
          name="basic"
          labelCol={{
            span: 9,
          }}
          wrapperCol={{
            span: 15,
          }}
          autoComplete="off"
          fields={fieldsVisit}
          form={formData}
          onFinish={submitVisitForm}
        >
          <Row justify="end">
            <Col span={6}>
              <Form.Item
                label="VN :"
                name="vn"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอก VN",
                  },
                ]}
                style={{ marginBottom: "5px" }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="วันที่มา :"
                name="start_date"
                style={{ marginBottom: 5 }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันที่มา",
                  },
                ]}
              >
                <DatePicker
                  calendar={thai}
                  locale={thai_th}
                  format="DD-MM-YYYY"
                  inputClass="datepicker-input"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="ประเภทการมา :"
                name="come_type"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเภทการมา",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={"มาด้วยตัวเอง"}>มาด้วยตัวเอง</Radio>
                  <Radio value={"มีการนำส่งตัวอย่าง"}>มีการนำส่งตัวอย่าง</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item
                label="มาครั้งสุดท้าย :"
                name="last_come"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  calendar={thai}
                  locale={thai_th}
                  // value={dayjs(sStartDate, dateFormat)
                  //   .add(543, "year")
                  //   .format("DD-MM-YYYY")}
                  format="DD-MM-YYYY"
                  inputClass="datepicker-input"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="สิทธิการรักษา :"
                name="welfare"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 3,
                }}
                wrapperCol={{
                  span: 21,
                }}
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสิทธิการรักษา",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={"ชำระเงินเอง"}>ชำระเงินเอง</Radio>
                  <Radio value={"ประกันสังคม"}>ประกันสังคม</Radio>
                  <Radio value={"ประกันอื่นๆ"}>ประกันอื่นๆ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="น้ำหนัก :"
                name="weight"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกน้ำหนัก",
                  },
                ]}
              >
                <InputNumber
                  step="0.1"
                  addonAfter="กก."
                  onChange={onChangeWeight}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ส่วนสูง :"
                name="height"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกส่วนสูง",
                  },
                ]}
              >
                <InputNumber
                  addonAfter="ซม."
                  step="0.1"
                  onChange={onChangeHeight}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="BMI :"
                name="bmi"
                style={{ marginBottom: "5px" }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ชีพจร :"
                name="pulse"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชีพจร",
                  },
                ]}
              >
                <InputNumber step="0.1" addonAfter="bpm" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ความดันตัวบน :"
                name="systolic"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกความดันตัวบน",
                  },
                ]}
              >
                <InputNumber step="0.1" addonAfter="mmHg" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ความดันตัวล่าง :"
                name="diastolic"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกความดันตัวล่าง",
                  },
                ]}
              >
                <InputNumber step="0.1" addonAfter="mmHg" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="โรคประจำตัว :"
                name="disease"
                style={{ marginBottom: "5px" }}
                labelCol={{
                  span: 3,
                }}
                wrapperCol={{
                  span: 21,
                }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="การแพ้ยา :"
                name="drug_allergy"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 17,
                }}
              >
                <Radio.Group>
                  <Radio value={"ไม่เคยแพ้"}>ไม่เคยแพ้</Radio>
                  <Radio value={"ไม่ทราบ"}>ไม่ทราบ</Radio>
                  <Radio value={"เคยแพ้"}>เคยแพ้</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="ระบุชื่อยา :"
                name="drug_list"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                label="การแพ้อาหาร :"
                name="food_allergy"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 17,
                }}
              >
                <Radio.Group>
                  <Radio value={"ไม่เคยแพ้"}>ไม่เคยแพ้</Radio>
                  <Radio value={"ไม่ทราบ"}>ไม่ทราบ</Radio>
                  <Radio value={"เคยแพ้"}>เคยแพ้</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="ระบุชื่ออาหาร :"
                name="food_list"
                style={{ marginBottom: 5 }}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="อาการสำคัญ :"
                name="symptom"
                style={{ marginBottom: "5px" }}
                labelCol={{
                  span: 3,
                }}
                wrapperCol={{
                  span: 21,
                }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div
            className="ant-modal-confirm-btns"
            style={{ textAlign: "end", marginTop: "12px" }}
          >
            <Button key="back" onClick={closeVisitForm}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginInlineStart: "8px" }}
            >
              ยืนยัน
            </Button>
          </div>
        </Form>
      </Modal>

      <Form
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 15,
        }}
        autoComplete="off"
        fields={fields}
        onFinish={onFinish}
      >
        <Row>
          <Col span={10}>
            <Form.Item
              label="ค้นหา HN/ชื่อ-สกุล :"
              name="hn"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอก HN",
                },
              ]}
              style={{ marginBottom: "5px" }}
            >
              <AutoComplete
                dropdownMatchSelectWidth={252}
                options={optionsHN}
                onSelect={onSelectHN}
                onSearch={handleSearchHN}
                loading={loadingHN}
              ></AutoComplete>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="ชื่อ-สกุล :"
              name="fullname"
              style={{ marginBottom: "5px" }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="เพศ :" name="sex" style={{ marginBottom: "5px" }}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              label="อายุ :"
              name="age"
              style={{ marginBottom: "5px" }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {/* <Col span={6}>
          <Form.Item
            name="type"
            label="รูปแบบ"
            style={{ marginBottom: 5, marginTop: 5 }}
            onChange={(e) => {
              return getWorkTypeListForm(e.target.value);
            }}
            rules={[
              {
                required: true,
                message: "กรุณาเลือกรูปแบบ",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>งาน</Radio>
              <Radio value={2}>Lab form</Radio>
            </Radio.Group>
          </Form.Item>
        </Col> */}
        </Row>
        <Divider orientation="left">VISITING FORM</Divider>

        {listVisitForm()}
        <Divider orientation="left">LAB DETAIL</Divider>
        <Row>
          <Col span={10}>
            <Form.Item
              name="form_name"
              label="ฟอร์ม :"
              style={{ marginBottom: 5, marginTop: 5 }}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือก Form Name",
                },
              ]}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
            >
              <Select
                showSearch
                options={sWorkTypeList}
                onChange={(e) => {
                  return setWorkTypeForm(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="แผนก :"
              name="department"
              style={{ marginBottom: 5 }}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกแผนก",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"OPD"}>OPD</Radio>
                <Radio value={"IPD"}>IPD</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row>
              {!!dataSelect ? (
                dataSelect.map((items2, subgroup_index) => {
                  if (!!items2) {
                    if (items2.name === "single") {
                      return (
                        <>
                          {items2.data.map((labItems, item_index) => {
                            return (
                              <Col span={6} key={labItems.lab_items_code}>
                                <Checkbox
                                  onChange={(e) => {
                                    onChangeChecklist(
                                      e,
                                      labItems.lab_items_code,
                                      null,
                                      subgroup_index,
                                      item_index
                                    );
                                  }}
                                  checked={labItems.status}
                                >
                                  {labItems.lab_items_name_ref}
                                </Checkbox>
                              </Col>
                            );
                          })}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Col span={24} key={items2.name}>
                            <Row>
                              <Col span={24}>
                                <Checkbox
                                  onChange={(e) => {
                                    onChangeChecklistGroup(
                                      e,
                                      items2.code,
                                      subgroup_index
                                    );
                                  }}
                                >
                                  {items2.name}
                                </Checkbox>
                              </Col>
                              {items2.data.map((labItems, item_index) => {
                                return (
                                  <Col
                                    span={6}
                                    key={
                                      labItems.lab_items_code + "_" + item_index
                                    }
                                  >
                                    <Checkbox
                                      style={{ marginLeft: "15px" }}
                                      onChange={(e) => {
                                        onChangeChecklist(
                                          e,
                                          labItems.lab_items_code,
                                          items2.code,
                                          subgroup_index,
                                          item_index
                                        );
                                      }}
                                      checked={labItems.status}
                                    >
                                      {labItems.lab_items_name_ref}
                                    </Checkbox>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Col>
                        </>
                      );
                    }
                  }
                })
              ) : (
                <>
                  <Skeleton />
                </>
              )}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Divider orientation="left">รูปแบบการชำระเงิน</Divider>
            <Form.Item
              name="payment"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกรูปแบบการชำระเงิน",
                },
              ]}
              style={{ marginBottom: "5px" }}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>เงินสด</Radio>
                  <Radio value={2}>โอนเงิน</Radio>
                  <Radio value={3}>เช็ค</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Divider orientation="left">อัตราค่าบริการ</Divider>
            <Form.Item
              label="1 :"
              name="payment"
              style={{ marginBottom: "5px" }}
            >
              <Input addonAfter="บาท" />
            </Form.Item>
            <Form.Item
              label="2 :"
              name="payment"
              style={{ marginBottom: "5px" }}
            >
              <Input addonAfter="บาท" />
            </Form.Item>
          </Col>
        </Row>
        <div className="ant-modal-confirm-btns">
          <Button key="back" onClick={closeModal}>
            ยกเลิก
          </Button>
          <Button type="primary" htmlType="submit">
            ยืนยัน
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddFormComponent;
