import { Row, Col, Input, TimePicker } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
const currDate = dayjs();

const { TextArea } = Input;
const LabOrderCriticalComponent = (props) => {
  const { dataItem, dataCriticalForm } = props;
  const currValue = !!dataItem
    ? !!dataItem["lab_order_result_manual"]
      ? dataItem["lab_order_result_manual"]
      : dataItem["lab_order_result_instrument"]
    : "";
  const [dataLabItemsNameAdd, SetLabItemsNameAdd] = useState(
    !!dataItem ? dataItem["lab_items_name"] : ""
  );
  const [dataLabItemsNameRemove, SetLabItemsNameRemove] = useState("");
  const [dataCriticalValue, SetCriticalValue] = useState(
    !!dataItem
      ? dataItem["lab_items_name"] +
          "= < " +
          dataItem["critical_range_min"] +
          ", > " +
          dataItem["critical_range_max"]
      : ""
  );
  const [dataCurrentValue, SetCurrentValue] = useState(
    !!dataItem ? dataItem["lab_items_name"] + " = " + currValue : ""
  );
  const [dataDepartment, SetDepartment] = useState(
    !!dataItem ? dataItem["department"] : ""
  );

  const [dataTimeCall, SetTimeCall] = useState();
  const [dataCallName, SetCallName] = useState("");
  const [dataTimeTake, SetTimeTake] = useState();
  const [dataTakeName, SetTakeName] = useState("");
  useEffect(() => {
    dataCriticalForm({
      lab_order_number: !!dataItem ? dataItem["lab_order_number"] : "",
      time_call: dayjs(dataTimeCall).format("HH:mm:ss"),
      position: dataDepartment,
      call_name: dataCallName,
      hn: !!dataItem ? dataItem["hn"] : "",
      patient_name: !!dataItem ? dataItem["patient_name"] : "",
      test_name: dataLabItemsNameAdd,
      cancle: dataLabItemsNameRemove,
      critical_ref: dataCriticalValue,
      result: dataCurrentValue,
      time_take: dayjs(dataTimeTake).format("HH:mm:ss"),
      take_name: dataTakeName,
      date_save: currDate.format("YYYY-MM-DD"),
    });
  }, [
    dataItem,
    dataLabItemsNameAdd,
    dataLabItemsNameRemove,
    dataCriticalValue,
    dataCurrentValue,
    dataDepartment,
    dataTimeCall,
    dataCallName,
    dataTimeTake,
    dataTakeName,
  ]);
  return (
    <>
      <Row>
        <Col span={12}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "27%", textAlign: "right" }}>HN : </td>
                <td>
                  <Input value={!!dataItem ? dataItem["hn"] : ""} disabled />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เพิ่ม LAB : </td>
                <td>
                  <Input
                    value={dataLabItemsNameAdd}
                    onChange={(e) => SetLabItemsNameAdd(e.target.value)}
                  />
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
                    value={dataCriticalValue}
                    onChange={(e) => SetCriticalValue(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เวลา : </td>
                <td>
                  <TimePicker
                    value={dataTimeCall}
                    onChange={(e) => SetTimeCall(e)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ผู้โทร : </td>
                <td>
                  <Input
                    value={dataCallName}
                    onChange={(e) => SetCallName(e.target.value)}
                  />
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
                  <Input
                    value={!!dataItem ? dataItem["patient_name"] : ""}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ยกเลิก LAB : </td>
                <td>
                  <Input
                    value={dataLabItemsNameRemove}
                    onChange={(e) => SetLabItemsNameRemove(e.target.value)}
                  />
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
                    value={dataCurrentValue}
                    onChange={(e) => SetCurrentValue(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>เวลา : </td>
                <td>
                  <TimePicker
                    value={dataTimeTake}
                    onChange={(e) => SetTimeTake(e)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>หน่วยงาน : </td>
                <td>
                  <Input
                    value={dataDepartment}
                    onChange={(e) => SetDepartment(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>ผู้รับโทรศัพท์ : </td>
                <td>
                  <Input
                    value={dataTakeName}
                    onChange={(e) => SetTakeName(e.target.value)}
                  />
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
