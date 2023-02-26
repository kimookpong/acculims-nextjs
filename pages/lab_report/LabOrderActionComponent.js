import { React, useEffect, useState, useRef } from "react";
import { Input, Button, Form, Col, Row, Select, Checkbox } from "antd";
const { TextArea } = Input;

const LabOrderActionComponent = (props) => {
  const inputRef = useRef(null);

  const { getFormData, orderNumber, action } = props;
  const [formCode, setFormCode] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formPartial, setFormPartial] = useState(false);
  const [formLab, setFormLab] = useState(false);
  const [formPrint, setFormPrint] = useState(false);
  const inputFormCode = (event) => {
    setFormCode(event.target.value);
  };
  const inputFormComment = (event) => {
    setFormComment(event.target.value);
  };
  const inputFormPartial = (event) => {
    setFormPartial(event.target.checked);
  };
  const inputFormLab = (event) => {
    setFormLab(event.target.checked);
  };
  const inputFormPrint = (event) => {
    setFormPrint(event.target.checked);
  };
  const actionFormReturn = () => {
    return getFormData(formCode, formComment, formPartial, formLab, formPrint);
  };
  useEffect(() => {
    inputRef.current.focus({
      cursor: "start",
    });
  }, []);

  useEffect(() => {
    actionFormReturn();
  }, [formCode, formComment, formPartial, formLab, formPrint]);

  return (
    <>
      <Form.Item label="เลขที่สั่ง" style={{ marginBottom: "5px" }}>
        {orderNumber}
      </Form.Item>
      <Form.Item
        label="รหัส"
        name="username"
        rules={[
          {
            required: true,
            message: "กรุณากรอกรหัส",
          },
        ]}
        style={{ marginBottom: "5px" }}
      >
        <Input onChange={inputFormCode} autoFocus={true} ref={inputRef} />
      </Form.Item>
      <Form.Item label="Comment" style={{ marginBottom: "5px" }}>
        <TextArea
          onChange={inputFormComment}
          rows={4}
          style={{
            resize: "none",
          }}
        />
      </Form.Item>
      {action === "approve" ? (
        <>
          <Form.Item label="ปล่อยผลบางส่วน" style={{ marginBottom: "5px" }}>
            <Checkbox onChange={inputFormPartial} />
          </Form.Item>
          <Form.Item label="HbA1C,MALB" style={{ marginBottom: "5px" }}>
            <Checkbox onChange={inputFormLab} />
          </Form.Item>
          <Form.Item label="Print" style={{ marginBottom: "5px" }}>
            <Checkbox onChange={inputFormPrint} />
          </Form.Item>
        </>
      ) : null}
    </>
  );
};

export default LabOrderActionComponent;
