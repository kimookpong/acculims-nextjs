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
const { TextArea } = Input;
const FormComponent = (props) => {
  const { dataForm } = props;
  const [age, setAge] = useState();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    !!dataForm && !!dataForm.birthday
      ? calculateAge(dayjs(dataForm.birthday, dateFormat).format("YYYY-MM-DD"))
      : null;
  }, [dataForm]);

  const onFinish = (values) => {
    closeModal();
  };

  const closeModal = () => {
    ModalForm.destroyAll();
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
            <Input />
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
            <Input />
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
          <Form.Item
            layout="vertical"
            name="informaddr"
            style={{ marginBottom: "5px" }}
          >
            <TextArea rows={2} />
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
        <Button type="primary" htmlType="submit">
          ยืนยัน
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;
