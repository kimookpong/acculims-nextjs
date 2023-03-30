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
} from "antd";
import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
const { TextArea } = Input;
const AddFormComponent = (props) => {
  const { dataForm, reloadList, list } = props;
  const [fields, setFields] = useState([
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
      name: ["user_type"],
      value: !!dataForm ? dataForm.user_type : null,
    },
    {
      name: ["job_id"],
      value: !!dataForm ? dataForm.job_id : null,
    },
    {
      name: ["user_name"],
      value: !!dataForm ? dataForm.user_name : null,
    },
    {
      name: ["password"],
      value: !!dataForm ? dataForm.password : null,
    },
  ]);

  const onFinish = (values) => {
    if (!!dataForm) {
      return axios
        .post("/api/user_action", {
          action: "update",
          id_user: dataForm.id_user,
          values: values,
        })
        .then((response) => {
          console.log(response.data);
          reloadList();
          closeModal();
        });
    } else {
      return axios
        .post("/api/user_action", {
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

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
      fields={fields}
      onFinish={onFinish}
    >
      <Row>
        <Col span={6}>
          <Form.Item
            label="HN :"
            name="hn"
            rules={[
              {
                required: true,
                message: "กรุณากรอก HN",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="ชื่อ-สกุล :"
            name="user_name"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="เพศ :"
            name="user_name"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="อายุ :"
            name="user_name"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left">LAB DETAIL</Divider>
      <Row>
        <Form.Item
          name="items"
          style={{ marginBottom: "5px" }}
          wrapperCol={{ span: 24 }}
        >
          <Checkbox.Group
            style={{
              width: "100%",
            }}
          >
            <Row gutter={24}>
              {list.map((item, index) => {
                return (
                  <Col span={8}>
                    <Checkbox value={item.value}>{item.label}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
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
          <Form.Item label="1 :" name="payment" style={{ marginBottom: "5px" }}>
            <Input suffix="บาท" />
          </Form.Item>
          <Form.Item label="2 :" name="payment" style={{ marginBottom: "5px" }}>
            <Input suffix="บาท" />
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

export default AddFormComponent;
