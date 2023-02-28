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
} from "antd";
import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
const { TextArea } = Input;
const FormComponent = (props) => {
  const { dataForm, reloadList } = props;
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
        <Col span={12}>
          <Form.Item
            label="Username :"
            name="user_name"
            rules={[
              {
                required: true,
                message: "กรุณากรอก Username",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Password :"
            name="password"
            rules={[
              {
                required: true,
                message: "กรุณากรอก Password",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Divider orientation="left" plain>
          รายละเอียด
        </Divider>
        <Col span={12}>
          <Form.Item
            label="เลขที่ใบประกอบ :"
            name="job_id"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
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
        <Col span={12}>
          <Form.Item
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
        <Col span={12}>
          <Form.Item
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
        <Col span={12}>
          <Form.Item
            label="User Type :"
            name="user_type"
            rules={[
              {
                required: true,
                message: "กรุณาเลือก User Type",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Select
              showSearch
              options={[
                { label: "User", value: "User" },
                { label: "Admin", value: "Admin" },
              ]}
            />
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
