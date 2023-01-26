import { Empty, Input, Button } from "antd";
import {
  DiffOutlined,
  PrinterOutlined,
  FileDoneOutlined,
  SaveOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const LabOrderComponent = (props) => {
  const { data, formDisable, labOrderData } = props;
  const changeInput_lab_order_result_manual = (event) => {
    labOrderData(event.target.id, event.target.value);
  };

  return (
    <>
      <table
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
          borderCollapse: "collapse",
        }}
      >
        <thead className={"ant-table-thead"}>
          <tr>
            <th className={"ant-table-cell"}>Test Name</th>
            <th className={"ant-table-cell"} width={"15%"}>
              ผลตรวจเครื่อง
            </th>
            <th className={"ant-table-cell"} width={"15%"}>
              ผลตรวจเอง
            </th>
            <th className={"ant-table-cell"} width={"10%"}>
              Flag
            </th>
            <th className={"ant-table-cell"} width={"15%"}>
              หน่วย
            </th>
            <th className={"ant-table-cell"} width={"15%"}>
              ค่าปกติ
            </th>
            <th className={"ant-table-cell"} width={"10%"}>
              P#1
            </th>
            <th className={"ant-table-cell"} width={"10%"}>
              P#2
            </th>
            <th className={"ant-table-cell"} width={"10%"}>
              P#3
            </th>
          </tr>
        </thead>
        <tbody className={"ant-row-design"}>
          {data.length > 0 ? (
            data.map((item, index) => {
              let text;
              if (
                index === 0 ||
                data[index].sub_code !== data[index - 1].sub_code
              ) {
                if (data[index].sub_code !== null) {
                  text = (
                    <tr style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "8px 8px" }} colSpan={11}>
                        {item["lab_items_sub_group_name"]}
                      </td>
                    </tr>
                  );
                } else {
                  text = null;
                }
              } else {
                text = null;
              }

              return (
                <>
                  {text}
                  <tr key={index}>
                    <td
                      style={{
                        padding: "8px 8px",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      {item["lab_items_sub_group_name"] !== null ? (
                        <span style={{ paddingLeft: "15px" }}>
                          {item["lab_items_name"]}
                        </span>
                      ) : (
                        <>{item["lab_items_name"]}</>
                      )}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["lab_order_result_instrument"]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      <Input
                        defaultValue={item["lab_order_result_manual"]}
                        onChange={changeInput_lab_order_result_manual}
                        id={item["lab_items_code"]}
                        key={item["lab_order_number"] + item["lab_items_code"]}
                        disabled={formDisable}
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      {item["flag"] === "H" ? (
                        <b style={{ color: "red" }}>{item["flag"]}</b>
                      ) : item["flag"] === "L" ? (
                        <b style={{ color: "blue" }}>{item["flag"]}</b>
                      ) : (
                        <>{item["flag"]}</>
                      )}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["lab_items_unit"]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["lab_items_normal_value"]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["P1"]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["P2"]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {item["P3"]}
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan={11}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default LabOrderComponent;
