import { React, useEffect, useState } from "react";
import { Input, Col, Row, Select, Checkbox } from "antd";
const { TextArea } = Input;

const LabOrderActionComponent = (props) => {
  const { getFormData, doctorList, orderNumber, action } = props;
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
    actionFormReturn();
  }, [formCode, formComment, formPartial, formLab, formPrint]);

  return (
    <Row>
      <Col span={24}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>เลขที่สั่ง : </td>
              <td>{orderNumber}</td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>รหัส : </td>
              <td>
                <Input onChange={inputFormCode} />
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
          </tbody>
        </table>
        {action === "approve" ? (
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>ปล่อยผลบางส่วน</td>
                <td>
                  <Checkbox onChange={inputFormPartial} />
                </td>
              </tr>
              <tr>
                <td>HbA1C,MALB</td>
                <td>
                  <Checkbox onChange={inputFormLab} />
                </td>
              </tr>
              <tr>
                <td>Print</td>
                <td>
                  <Checkbox onChange={inputFormPrint} />
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </Col>
    </Row>
  );
};

export default LabOrderActionComponent;
