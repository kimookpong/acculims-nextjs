import { Row, Col, Input } from "antd";
const { TextArea } = Input;
const LabOrderCriticalComponent = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "27%", textAlign: "right" }}>HN : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เพิ่ม LAB : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ค่าวิกฤติ : </td>
                <td>
                  <TextArea
                    autoSize={{
                      minRows: 4,
                      maxRows: 6,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เวลา : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ผู้โทร : </td>
                <td>
                  <Input />
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span={12}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "27%", textAlign: "right" }}>
                  ชื่อ-สกุล :{" "}
                </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ยกเลิก LAB : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ผลที่ได้ : </td>
                <td>
                  <TextArea
                    autoSize={{
                      minRows: 4,
                      maxRows: 6,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เวลา : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>หน่วยงาน : </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ผู้รับโทรศัพท์ : </td>
                <td>
                  <Input />
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};
export default LabOrderCriticalComponent;
