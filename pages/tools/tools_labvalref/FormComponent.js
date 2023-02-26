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
  const { dataForm, dropdowndata, labSpecimen, reloadList } = props;
  const [fields, setFields] = useState([
    {
      name: ["lab_items_group"],
      value: !!dataForm ? dataForm.lab_items_group : null,
    },
    {
      name: ["lab_items_name"],
      value: !!dataForm ? dataForm.lab_items_name : null,
    },
    {
      name: ["display_order"],
      value: !!dataForm ? dataForm.display_order : null,
    },
    {
      name: ["lab_items_unit"],
      value: !!dataForm ? dataForm.lab_items_unit : null,
    },
    {
      name: ["lab_items_normal_value"],
      value: !!dataForm ? dataForm.lab_items_normal_value : null,
    },
    {
      name: ["lab_items_default_value"],
      value: !!dataForm ? dataForm.lab_items_default_value : null,
    },
    {
      name: ["service_price"],
      value: !!dataForm ? dataForm.service_price : null,
    },
    {
      name: ["specimen_code"],
      value: !!dataForm ? dataForm.specimen_code : null,
    },
    {
      name: ["possible_value"],
      value: !!dataForm ? dataForm.possible_value : null,
    },
    {
      name: ["normal_value_min_male"],
      value: !!dataForm ? dataForm.normal_value_min_male : null,
    },
    {
      name: ["normal_value_max_male"],
      value: !!dataForm ? dataForm.normal_value_max_male : null,
    },
    {
      name: ["normal_value_min_female"],
      value: !!dataForm ? dataForm.normal_value_min_female : null,
    },
    {
      name: ["normal_value_max_female"],
      value: !!dataForm ? dataForm.normal_value_max_female : null,
    },
    {
      name: ["critical_range_min_male"],
      value: !!dataForm ? dataForm.critical_range_min_male : null,
    },
    {
      name: ["critical_range_max_male"],
      value: !!dataForm ? dataForm.critical_range_max_male : null,
    },
    {
      name: ["critical_range_min_female"],
      value: !!dataForm ? dataForm.critical_range_min_female : null,
    },
    {
      name: ["critical_range_max_female"],
      value: !!dataForm ? dataForm.critical_range_max_female : null,
    },
    {
      name: ["critical_value"],
      value: !!dataForm ? dataForm.critical_value : null,
    },
    {
      name: ["delta_percent_ref"],
      value: !!dataForm ? dataForm.delta_percent_ref : null,
    },
    {
      name: ["show_in_barcode"],
      value: !!dataForm
        ? dataForm.show_in_barcode === 1
          ? true
          : false
        : false,
    },
    {
      name: ["digit_num"],
      value: !!dataForm ? dataForm.digit_num : null,
    },
    {
      name: ["wait_hour"],
      value: !!dataForm ? dataForm.wait_hour : null,
    },
  ]);

  const onFinish = (values) => {
    if (!!dataForm) {
      return axios
        .post("/api/lab_items_action", {
          action: "update",
          lab_items_code: dataForm.lab_items_code,
          values: values,
        })
        .then((response) => {
          console.log(response.data);
          reloadList();
          closeModal();
        });
    } else {
      return axios
        .post("/api/lab_items_action", {
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
            label="กลุ่ม Lab :"
            name="lab_items_group"
            style={{ marginBottom: "5px" }}
          >
            <Select showSearch options={dropdowndata} />
          </Form.Item>
        </Col>
        <Col span={12}></Col>
        <Col span={12}>
          <Form.Item
            label="ชื่อ Lab :"
            name="lab_items_name"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ Lab",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Display order :"
            name="display_order"
            rules={[
              {
                required: true,
                message: "กรุณากรอก Display order",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="หน่วย :"
            name="lab_items_unit"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ค่าปกติ :"
            name="lab_items_normal_value"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ค่ามาตราฐาน :"
            name="lab_items_default_value"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ค่าบริการ :"
            name="service_price"
            rules={[
              {
                required: true,
                message: "กรุณากรอกค่าบริการ",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Specimen :"
            name="specimen_code"
            rules={[
              {
                required: true,
                message: "กรุณาเลือก Specimen",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Select showSearch options={labSpecimen} />
          </Form.Item>
          <Form.Item label="ชื่อย่อ :" style={{ marginBottom: "5px" }}>
            <Input />
          </Form.Item>

          <Divider orientation="left" plain>
            ค่าปกติ (ตัวเลข)
          </Divider>
          <Form.Item label="เพศชายอยู่ในช่วง :" style={{ marginBottom: "5px" }}>
            <Input.Group compact>
              <Form.Item name="normal_value_min_male" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
              <Input
                style={{
                  width: 38,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="ถึง"
                disabled
              />
              <Form.Item name="normal_value_max_male" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="เพศหญิงอยู่ในช่วง :"
            style={{ marginBottom: "5px" }}
          >
            <Input.Group compact>
              <Form.Item name="normal_value_min_female" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
              <Input
                style={{
                  width: 38,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="ถึง"
                disabled
              />
              <Form.Item name="normal_value_max_female" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Divider orientation="left" plain>
            ค่าวิกฤติ
          </Divider>
          <Form.Item label="เพศชายอยู่ในช่วง :" style={{ marginBottom: "5px" }}>
            <Input.Group compact>
              <Form.Item name="critical_range_min_male" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
              <Input
                style={{
                  width: 38,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="ถึง"
                disabled
              />
              <Form.Item name="critical_range_max_male" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="เพศหญิงอยู่ในช่วง :"
            style={{ marginBottom: "5px" }}
          >
            <Input.Group compact>
              <Form.Item name="critical_range_min_female" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
              <Input
                style={{
                  width: 38,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="ถึง"
                disabled
              />
              <Form.Item name="critical_range_max_female" noStyle>
                <Input
                  style={{
                    width: 90,
                  }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="ตัวอักษร :"
            name="critical_value"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12} style={{ paddingLeft: "10px" }}>
          <p style={{ marginBottom: "5px" }}>Posible Value :</p>
          <Form.Item
            name="possible_value"
            style={{ marginBottom: "5px" }}
            noStyle
          >
            <TextArea
              rows={20}
              style={{
                resize: "none",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12} style={{ paddingTop: "20px" }}>
          <Form.Item
            label="ค่า Delta :"
            name="delta_percent_ref"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="จุดทศนิยม :"
            name="digit_num"
            style={{ marginBottom: "5px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="เวลาการตรวจ :"
            name="wait_hour"
            rules={[
              {
                required: true,
                message: "กรุณากรอกเวลาการตรวจ",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Input suffix="นาที" />
          </Form.Item>
        </Col>
        <Col span={12} style={{ paddingTop: "20px" }}>
          <Form.Item
            name="show_in_barcode"
            valuePropName="checked"
            style={{ marginBottom: "5px", paddingLeft: "10px" }}
          >
            <Checkbox>: แสดงใน Barcode</Checkbox>
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
