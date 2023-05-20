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
  AutoComplete,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
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
const { TextArea } = Input;
const FormComponent = (props) => {
  const { dataForm, reloadList } = props;

  // location usestate
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [optionsLocation, setOptionsLocation] = useState([]);
  const [selectLocation, setSelectLocation] = useState({
    province_code: !!dataForm ? dataForm.province_code : null,
    province: !!dataForm ? dataForm.province : null,
    amphoe_code: !!dataForm ? dataForm.amphoe_code : null,
    amphoe: !!dataForm ? dataForm.amphoe : null,
    tambon_code: !!dataForm ? dataForm.tambon_code : null,
    tambon: !!dataForm ? dataForm.tambon : null,
    zipcode: !!dataForm ? dataForm.zipcode : null,
  });
  const [optionsLocationShow, setOptionsLocationShow] = useState([]);

  const [age, setAge] = useState();
  const [editMode, setEditMode] = useState(!!dataForm ? true : false);
  const [fields, setFields] = useState([
    {
      name: ["cid"],
      value: !!dataForm ? dataForm.cid : null,
    },
    {
      name: ["passport_no"],
      value: !!dataForm ? dataForm.passport_no : null,
    },
    {
      name: ["hn"],
      value: !!dataForm ? dataForm.hn : null,
    },
    {
      name: ["pname"],
      value: !!dataForm ? dataForm.pname : null,
    },
    {
      name: ["fname"],
      value: !!dataForm ? dataForm.fname : null,
    },
    {
      name: ["lname"],
      value: !!dataForm ? dataForm.lname : null,
    },
    {
      name: ["birthday"],
      value: !!dataForm
        ? dayjs(dataForm.birthday, dateFormat)
            .add(543, "year")
            .format("DD-MM-YYYY")
        : null,
    },
    {
      name: ["clinic"],
      value: !!dataForm ? dataForm.clinic : null,
    },

    {
      name: ["sex"],
      value: !!dataForm ? dataForm.sex : null,
    },
    {
      name: ["nationality"],
      value: !!dataForm ? dataForm.nationality : null,
    },
    {
      name: ["religion"],
      value: !!dataForm ? dataForm.religion : null,
    },
    {
      name: ["bloodgrp"],
      value: !!dataForm ? dataForm.bloodgrp : null,
    },
    {
      name: ["addrpart"],
      value: !!dataForm ? dataForm.addrpart : null,
    },
    {
      name: ["moopart"],
      value: !!dataForm ? dataForm.moopart : null,
    },
    {
      name: ["tmbpart"],
      value: !!dataForm ? dataForm.tambon : null,
    },
    {
      name: ["amppart"],
      value: !!dataForm ? dataForm.amphoe : null,
    },
    {
      name: ["chwpart"],
      value: !!dataForm ? dataForm.province : null,
    },
    {
      name: ["po_code"],
      value: !!dataForm ? dataForm.po_code : null,
    },

    {
      name: ["informname"],
      value: !!dataForm ? dataForm.informname : null,
    },

    {
      name: ["informaddr"],
      value: !!dataForm ? dataForm.informaddr : null,
    },

    {
      name: ["informtel"],
      value: !!dataForm ? dataForm.informtel : null,
    },
    {
      name: ["email"],
      value: !!dataForm ? dataForm.email : null,
    },
    {
      name: ["line_id"],
      value: !!dataForm ? dataForm.line_id : null,
    },
    {
      name: ["workaddr"],
      value: !!dataForm ? dataForm.workaddr : null,
    },
    {
      name: ["worktel"],
      value: !!dataForm ? dataForm.worktel : null,
    },
  ]);
  const searchResult = (query, field) => {
    return axios
      .post("/api/get_tambons", {
        q: query,
        field: field,
      })
      .then(function (response) {
        if (field === "province") {
          setchwpartOptions(response.data);
          setloadingchw(false);
        } else if (field === "amphoe") {
          setamppartOptions(response.data);
          setloadingamp(false);
        } else if (field === "tambon") {
          settmbpartOptions(response.data);
          setloadingtmb(false);
        }
      });
  };
  const [loadingchw, setloadingchw] = useState(false);
  const [chwpartOptions, setchwpartOptions] = useState([]);
  const [chwpartSelect, setchwpartSelect] = useState();
  const onChangechwpart = (value) => {
    setchwpartSelect(value);
    settmbpartOptions([]);
    setFields([
      {
        name: ["amppart"],
        value: null,
      },
      {
        name: ["tmbpart"],
        value: null,
      },
    ]);
  };

  const [loadingamp, setloadingamp] = useState(false);
  const [amppartOptions, setamppartOptions] = useState([]);
  const [amppartSelect, setamppartSelect] = useState();
  const onChangeamppart = (value) => {
    setamppartSelect(value);
    setFields([
      {
        name: ["tmbpart"],
        value: null,
      },
    ]);
  };

  const [loadingtmb, setloadingtmb] = useState(false);
  const [tmbpartOptions, settmbpartOptions] = useState([]);
  const [tmbpartSelect, settmbpartSelect] = useState();
  const onChangetmbpart = (value) => {
    settmbpartSelect(value);
  };

  const [po_codeSelect, setpo_codeSelect] = useState();

  useEffect(() => {
    setloadingchw(true);
    searchResult("", "province");
    if (!!dataForm) {
      if (dataForm.chwpart) {
        setchwpartSelect(dataForm.chwpart);
      }
      if (dataForm.amppart) {
        setamppartSelect(dataForm.amppart);
      }
    }
  }, []);

  useEffect(() => {
    setloadingamp(true);
    searchResult(chwpartSelect, "amphoe");
  }, [chwpartSelect]);

  useEffect(() => {
    setloadingtmb(true);
    searchResult(chwpartSelect + amppartSelect, "tambon");
  }, [amppartSelect]);

  const [birthDateData, setBirthDateData] = useState();

  useEffect(() => {
    if (!!dataForm && !!dataForm.birthday) {
      setBirthDateData(dayjs(dataForm.birthday, dateFormat));
      calculateAge(dayjs(dataForm.birthday, dateFormat).format("YYYY-MM-DD"));
    }
  }, [dataForm]);

  const deleteConfirm = () => {
    return axios
      .post("/api/patient_action", {
        action: "delete",
        hn: dataForm.hn,
      })
      .then((response) => {
        reloadList();
        closeModal();
      });
  };
  const deleteUser = () => {
    Modal.confirm({
      title: "คุณแน่ใจว่าต้องการลบข้อมูล?",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      //content: "",
      centered: true,
      okText: "ยืนยัน",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk() {
        deleteConfirm();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onFinish = (values) => {
    values.birthday = birthDateData.format(dateFormat);

    values.tmbpart = selectLocation.tambon_code
      ? selectLocation.tambon_code.slice(-2)
      : "";
    values.amppart = selectLocation.amphoe_code
      ? selectLocation.amphoe_code.slice(-2)
      : "";
    values.chwpart = selectLocation.province_code
      ? selectLocation.province_code.slice(-2)
      : "";

    if (!!dataForm) {
      return axios
        .post("/api/patient_action", {
          action: "update",
          hn: dataForm.hn,
          values: values,
        })
        .then((response) => {
          console.log(response.data);
          reloadList();
          closeModal();
        });
    } else {
      return axios
        .post("/api/patient_action", {
          action: "create",
          values: values,
        })
        .then((response) => {
          console.log(response.data);
          reloadList();
          closeModal();
        });
    }
  };

  const closeModal = () => {
    Modal.destroyAll();
  };

  const onChangeBirthDay = (dateOfBirth) => {
    setBirthDateData(dayjs(dateOfBirth));
    calculateAge(dateOfBirth);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const findLocation = (value, type) => {
    setFields([
      {
        name: ["tmbpart"],
        value: null,
      },
      {
        name: ["amppart"],
        value: null,
      },
      {
        name: ["chwpart"],
        value: null,
      },
      {
        name: ["po_code"],
        value: null,
      },
    ]);
    if (value) {
      setLoadingLocation(true);
      return axios
        .post("/api/get_locations", {
          q: value,
        })
        .then(function (response) {
          setOptionsLocation(response.data);
          let dataSerchList = response.data.map((item) => {
            return {
              value: item.tambon_code,
              label: (
                <>
                  {item.province}
                  {" > "}
                  {item.amphoe}
                  {" > "}
                  {item.tambon}
                  {" > "}
                  {item.zipcode}
                </>
              ),
            };
          });
          setOptionsLocationShow(dataSerchList);
          setLoadingLocation(false);
        });
    }
  };
  const onSelectLocations = (value) => {
    const result = optionsLocation.find((obj) => {
      return obj.tambon_code === value;
    });
    setSelectLocation(result);
    setFields([
      {
        name: ["tmbpart"],
        value: result.tambon,
      },
      {
        name: ["amppart"],
        value: result.amphoe,
      },
      {
        name: ["chwpart"],
        value: result.province,
      },
      {
        name: ["po_code"],
        value: result.zipcode,
      },
      {
        name: ["locations"],
        value: null,
      },
    ]);
  };

  return (
    <Form name="basic" autoComplete="off" fields={fields} onFinish={onFinish}>
      <Row>
        <Col span={12}>
          <Form.Item
            labelCol={{
              span: 12,
            }}
            label="เลขบัตประจำตัวประชาชน :"
            name="cid"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 12,
            }}
            label="หมายเลข Passport :"
            name="passport_no"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  span: 10,
                }}
                label="HN :"
                name="hn"
                style={{ marginBottom: "5px" }}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอก HN",
                  },
                ]}
              >
                <Input disabled={editMode} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  span: 10,
                }}
                label="ECODE :"
                name="ecode"
                style={{ marginBottom: "5px" }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{
                  span: 5,
                }}
                label="แผนก :"
                name="clinic"
                style={{ marginBottom: "5px" }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Divider orientation="left" plain>
          รายละเอียด
        </Divider>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="คำนำหน้า :"
            name="pname"
            rules={[
              {
                required: true,
                message: "กรุณากรอกคำนำหน้า",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="ชื่อ :"
            name="fname"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="นามสกุล :"
            name="lname"
            rules={[
              {
                required: true,
                message: "กรุณากรอกนามสกุล",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="เพศ :"
            name="sex"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกเพศ",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Select>
              <Select.Option value="1">ชาย</Select.Option>
              <Select.Option value="2">หญิง</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="วันเกิด :"
            name="birthday"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกวันเกิด",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <DatePicker
              calendar={thai}
              locale={thai_th}
              format="DD-MM-YYYY"
              onChange={onChangeBirthDay}
              inputClass="datepicker-input"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="อายุ :"
            style={{ marginBottom: "5px" }}
          >
            <Input value={age} disabled={true} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="สัญชาติ :"
            name="nationality"
            style={{ marginBottom: "5px" }}
          >
            <Select>
              <Select.Option value="99">ไทย</Select.Option>
              <Select.Option value="100">ต่างชาติ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="ศาสนา :"
            name="religion"
            style={{ marginBottom: "5px" }}
          >
            <Select>
              <Select.Option value="01">พุทธ</Select.Option>
              <Select.Option value="02">คริสต์</Select.Option>
              <Select.Option value="03">อิสลาม</Select.Option>
              <Select.Option value="04">พราหมณ์- ฮินดู</Select.Option>
              <Select.Option value="05">ยิว</Select.Option>
              <Select.Option value="06">ไม่นับถือ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="หมู่เลือด :"
            name="bloodgrp"
            style={{ marginBottom: "5px" }}
          >
            <Select>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="AB">AB</Select.Option>
              <Select.Option value="O">O</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              position: "inherit",
            }}
          >
            ที่อยู่ตามบัตรประชาชน :
          </label>
        </Col>
        <Col span={16}>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            label="ที่อยู่ :"
            name="addrpart"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="หมู่ที่ :"
            name="moopart"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            label="ค้นหา"
            tooltip="ค้นหาตำแหน่งจังหวัด,อำเภอ,ตำบลและรหัสไปรษณีย์"
            name="locations"
            style={{ marginBottom: "5px" }}
          >
            <AutoComplete
              dropdownMatchSelectWidth={400}
              options={optionsLocationShow}
              onSelect={onSelectLocations}
              onSearch={findLocation}
              loading={loadingLocation}
            ></AutoComplete>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="จังหวัด :"
            name="chwpart"
            style={{ marginBottom: "5px" }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="อำเภอ :"
            name="amppart"
            style={{ marginBottom: "5px" }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="ตำบล :"
            name="tmbpart"
            style={{ marginBottom: "5px" }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="รหัสไปรษณีย์ :"
            name="po_code"
            style={{ marginBottom: "5px" }}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={24}>
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              position: "inherit",
            }}
          >
            ที่อยู่ที่ติดต่อได้ :
          </label>
          <Form.Item
            layout="vertical"
            name="informaddr"
            style={{ marginBottom: "5px" }}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="เบอร์โทรศัพท์ :"
            name="informtel"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="Email :"
            name="email"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{
              span: 10,
            }}
            label="Line ID :"
            name="line_id"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              position: "inherit",
            }}
          >
            ที่อยู่สถานที่ทำงาน :
          </label>
          <Form.Item
            layout="vertical"
            name="workaddr"
            style={{ marginBottom: "5px" }}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="เบอร์ที่ทำงาน :"
            name="worktel"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="บุคคลที่สามารถติดต่อได้ (กรณีฉุกเฉิน) :"
            name="informname"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <div className="ant-modal-confirm-btns">
        <Button key="back" onClick={closeModal}>
          ยกเลิก
        </Button>
        {!!dataForm ? (
          <Button danger onClick={deleteUser}>
            ลบ
          </Button>
        ) : (
          <></>
        )}
        <Button type="primary" htmlType="submit">
          ยืนยัน
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
