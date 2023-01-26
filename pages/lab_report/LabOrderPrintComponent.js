import { React, useEffect, useState } from "react";
import { Empty, Input } from "antd";

const LabOrderPrintComponent = (props) => {
  const { data } = props;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  return (
    <table style={{ width: "100%", fontSize: "70%" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
          <th className={"ant-table-cell"}>Test Name</th>
          <th className={"ant-table-cell"} width={"10%"}>
            ผลตรวจเครื่อง
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            ผลตรวจเอง
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            Flag
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            หน่วย
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            ค่าปกติ
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            P#1
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            P#2
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            P#3
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            P#4
          </th>
          <th className={"ant-table-cell"} width={"7%"}>
            P#5
          </th>
        </tr>
      </thead>
      <tbody>
        {dataList.length > 0 ? (
          dataList.map((item, index) => {
            let text;

            if (
              index === 0 ||
              dataList[index].sub_code !== dataList[index - 1].sub_code
            ) {
              if (dataList[index].sub_code !== null) {
                text = (
                  <tr
                    key={
                      item["lab_items_sub_group_name"].toString() +
                      item["lab_items_name"].toString()
                    }
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
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
                <tr
                  key={item["lab_items_name"].toString()}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <td style={{ padding: "8px 8px" }}>
                    {item["lab_items_sub_group_name"] !== null ? (
                      <span style={{ paddingLeft: "15px" }}>
                        {item["lab_items_name"]}
                      </span>
                    ) : (
                      <>{item["lab_items_name"]}</>
                    )}
                  </td>
                  <td>{item["lab_order_result_instrument"]}</td>
                  <td>{item["lab_order_result_manual"]}</td>
                  <td style={{ textAlign: "center" }}>
                    {item["flag"] === "H" ? (
                      <b style={{ color: "red" }}>{item["flag"]}</b>
                    ) : item["flag"] === "L" ? (
                      <b style={{ color: "blue" }}>{item["flag"]}</b>
                    ) : (
                      <>{item["flag"]}</>
                    )}
                  </td>
                  <td>{item["lab_items_unit"]}</td>
                  <td>{item["lab_items_normal_value"]}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
  );
};

export default LabOrderPrintComponent;
