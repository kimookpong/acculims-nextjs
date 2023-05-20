import {
  Divider,
  Modal as ModalForm,
  Input,
  Button,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  AutoComplete,
} from "antd";
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
const { TextArea, Search } = Input;
const FormComponent = (props) => {
  const { showAddForm, dataDefault } = props;
  const [age, setAge] = useState();
  const [fields, setFields] = useState([
    {
      name: ["hn"],
      value: !!dataDefault ? dataDefault : null,
    },
  ]);

  // location usestate
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [optionsLocation, setOptionsLocation] = useState([]);
  const [selectLocation, setSelectLocation] = useState([]);
  const [optionsLocationShow, setOptionsLocationShow] = useState([]);

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
  }, []);

  useEffect(() => {
    setloadingamp(true);
    searchResult(chwpartSelect, "amphoe");
  }, [chwpartSelect]);

  useEffect(() => {
    setloadingtmb(true);
    searchResult(chwpartSelect + amppartSelect, "tambon");
  }, [amppartSelect]);

  const onFinish = (values) => {
    values.birthday = values.birthday.add(-543, "year").format(dateFormat);

    values.tmbpart = selectLocation.tambon_code
      ? selectLocation.tambon_code.slice(-2)
      : "";
    values.amppart = selectLocation.amphoe_code
      ? selectLocation.amphoe_code.slice(-2)
      : "";
    values.chwpart = selectLocation.province_code
      ? selectLocation.province_code.slice(-2)
      : "";

    return axios
      .post("/api/patient_action", {
        action: "create",
        values: values,
      })
      .then((response) => {
        closeModal(values.hn);
      });
  };

  const closeModal = (hn) => {
    ModalForm.destroyAll();

    console.log(hn);
    if (!!hn) {
      showAddForm(hn);
    } else {
      showAddForm();
    }
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
  const [loadingIDcard, setLoadingIDcard] = useState(false);
  const validateInputIDcard = (_, value) => {
    if (!!value) {
      setLoadingIDcard("validating");
      return axios
        .post("/api/get_patient_from_idcard", {
          q: value,
        })
        .then((response) => {
          if (!!response.data && response.data.length > 0) {
            setLoadingIDcard("error");
            return Promise.reject("เลขบัตรนี้ถูกใช้งานแล้ว");
          } else {
            setLoadingIDcard("success");
            return Promise.resolve();
          }
        });
    } else {
      setLoadingIDcard(false);
    }
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
            label="เลขประจำตัวประชาชน :"
            name="cid"
            hasFeedback
            validateStatus={loadingIDcard}
            rules={[{ validator: validateInputIDcard }]}
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
                <Input />
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
            <Select>
              <Select.Option value="เด็กชาย">เด็กชาย</Select.Option>
              <Select.Option value="เด็กหญิง">เด็กหญิง</Select.Option>
              <Select.Option value="นาย">นาย</Select.Option>
              <Select.Option value="นาง">นาง</Select.Option>
              <Select.Option value="นางสาว">นางสาว</Select.Option>

              <Select.Option value="หม่อมหลวง">หม่อมหลวง</Select.Option>
              <Select.Option value="สามเณร">สามเณร</Select.Option>
              <Select.Option value="พระอธิการ">พระอธิการ</Select.Option>
              <Select.Option value="พระปลัด">พระปลัด</Select.Option>
              <Select.Option value="พระใบฎีกา">พระใบฎีกา</Select.Option>
              <Select.Option value="พระครูสมุห์">พระครูสมุห์</Select.Option>
              <Select.Option value="พระมหา">พระมหา</Select.Option>
              <Select.Option value="พระครูวินัยธร">พระครูวินัยธร</Select.Option>

              <Select.Option value="พลเอก">พลเอก</Select.Option>
              <Select.Option value="พลตรี">พลตรี</Select.Option>
              <Select.Option value="พันโท">พันโท</Select.Option>
              <Select.Option value="ร้อยเอก">ร้อยเอก</Select.Option>
              <Select.Option value="ร้อยตรี">ร้อยตรี</Select.Option>
              <Select.Option value="จ่าสิบโท">จ่าสิบโท</Select.Option>
              <Select.Option value="สิบเอก">สิบเอก</Select.Option>
              <Select.Option value="สิบตรี">สิบตรี</Select.Option>

              <Select.Option value="พลอากาศเอก">พลอากาศเอก</Select.Option>
              <Select.Option value="พลอากาศตรี">พลอากาศตรี</Select.Option>
              <Select.Option value="นาวาอากาศโท">นาวาอากาศโท</Select.Option>
              <Select.Option value="เรืออากาศเอก">เรืออากาศเอก</Select.Option>
              <Select.Option value="เรืออากาศตรี">เรืออากาศตรี</Select.Option>
              <Select.Option value="พันจ่าอากาศโท">พันจ่าอากาศโท</Select.Option>
              <Select.Option value="จ่าอากาศเอก">จ่าอากาศเอก</Select.Option>
              <Select.Option value="จ่าอากาศตรี">จ่าอากาศตรี</Select.Option>

              <Select.Option value="พลเรือเอก">พลเรือเอก</Select.Option>
              <Select.Option value="พลเรือตรี">พลเรือตรี</Select.Option>
              <Select.Option value="นาวาโท">นาวาโท</Select.Option>
              <Select.Option value="เรือเอก">เรือเอก</Select.Option>
              <Select.Option value="เรือตรี">เรือตรี</Select.Option>
              <Select.Option value="พันจ่าโท">พันจ่าโท</Select.Option>
              <Select.Option value="จ่าเอก">จ่าเอก</Select.Option>
              <Select.Option value="จ่าตรี">จ่าตรี</Select.Option>

              <Select.Option value="พลตำรวจเอก">พลตำรวจเอก</Select.Option>
              <Select.Option value="พลตำรวจตรี">พลตำรวจตรี</Select.Option>
              <Select.Option value="พันตำรวจโท">พันตำรวจโท</Select.Option>
              <Select.Option value="ร้อยตำรวจเอก">ร้อยตำรวจเอก</Select.Option>
              <Select.Option value="ร้อยตำรวจตรี">ร้อยตำรวจตรี</Select.Option>
              <Select.Option value="จ่าสิบตำรวจ">จ่าสิบตำรวจ</Select.Option>
              <Select.Option value="สิบตำรวจโท">สิบตำรวจโท</Select.Option>
              <Select.Option value="พลตำรวจ">พลตำรวจ</Select.Option>
            </Select>
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
              onChange={calculateAge}
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
            label="หมู่ :"
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
        <Button
          key="back"
          onClick={() => {
            return closeModal(0);
          }}
        >
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit">
          ยืนยัน
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
