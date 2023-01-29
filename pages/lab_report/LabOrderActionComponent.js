import { React, useEffect, useState } from "react";
import { Input, Col, Row, Select } from "antd";
const { TextArea } = Input;

const LabOrderActionComponent = (props) => {
  const { getFormData, doctorList } = props;
  const [formCode, setFormCode] = useState("");
  const [formComment, setFormComment] = useState("");
  const inputFormCode = (event) => {
    setFormCode(event);
  };
  const inputFormComment = (event) => {
    setFormComment(event.target.value);
  };

  useEffect(() => {
    getFormData(formCode, formComment);
  }, [formCode, formComment]);

  return (
    <Row>
      <Col span={24}>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "30%" }}>เลขที่สั่ง : </td>
            <td>เลขที่สั่ง</td>
          </tr>
          <tr>
            <td style={{ width: "30%" }}>รหัส : </td>
            <td>
              <Select
                showSearch
                onChange={inputFormCode}
                style={{
                  width: 200,
                }}
                options={doctorList}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%" }}>Comment : </td>
            <td>
              <TextArea
                onChange={inputFormComment}
                rows={4}
                style={{
                  resize: "none",
                }}
              />
            </td>
          </tr>
        </table>
      </Col>
    </Row>
  );
};

export default LabOrderActionComponent;
