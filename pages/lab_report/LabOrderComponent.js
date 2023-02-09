import { Empty, Input, Popover, Checkbox, Tooltip as TT } from "antd";
import { LineChartOutlined, WarningOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LabOrderComponent = (props) => {
  const { data, formDisable, labOrderData, dataItemGroupSelect, checkRerun } =
    props;
  const [titleInformation, setTitleInformation] = useState("");
  const [information, setInformation] = useState("");
  const [rerunArray, setRerunArray] = useState([0]);
  const [itemCodeSelect, setItemCodeSelect] = useState();

  const changeInput_lab_order_result_manual = (event) => {
    labOrderData(event.target.id, event.target.value);
  };
  const optionsGraph = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
      datalabels: {
        align: "top",
        anchor: "center",
        //offset: 25,
        padding: -2,
      },
    },
  };

  const openGraph = (lab_items_name, dataGraphItem, isNotNumber) => {
    setTitleInformation(
      <>
        <LineChartOutlined /> ประวัติข้อมูล {lab_items_name}
      </>
    );
    let dataType;
    if (isNotNumber && itemCodeSelect != itemCodeSelect) {
      dataType = (
        <table
          style={{
            width: "100%",
            overflowX: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead className={"ant-table-thead"}>
            <tr>
              <th
                width={"50%"}
                style={{ padding: "8px 8px", border: "1px solid #f0f0f0" }}
              >
                วันที่
              </th>
              <th style={{ padding: "8px 8px", border: "1px solid #f0f0f0" }}>
                ค่า
              </th>
            </tr>
          </thead>
          <tbody>
            {dataGraphItem["value"].map((itemGraph, index) => {
              if (dataGraphItem["value"][index] !== null) {
                return (
                  <tr key={dataGraphItem["value"][index]}>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {dataGraphItem["label"][index]}
                    </td>
                    <td style={{ border: "1px solid #f0f0f0" }}>
                      {dataGraphItem["value"][index]}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      );
    } else {
      let RearrangeData = { value: [], label: [], color: [], point: [] };
      dataGraphItem["value"].map((itemValue, index) => {
        if (dataGraphItem["value"][index] !== null) {
          RearrangeData["value"] = [
            parseFloat(dataGraphItem["value"][index]),
            ...RearrangeData["value"],
          ];

          RearrangeData["label"] = [
            dataGraphItem["label"][index],
            ...RearrangeData["label"],
          ];

          RearrangeData["color"] = [
            index === 0 ? "rgba(5,145,255,1)" : "rgba(5,145,255,0.5)",
            ...RearrangeData["color"],
          ];

          RearrangeData["point"] = [
            index !== 0 ? 3 : 5,
            ...RearrangeData["point"],
          ];
        }
      });

      let dataGraph = {
        labels: RearrangeData["label"],
        datasets: [
          {
            label: lab_items_name,
            data: RearrangeData["value"],
            borderColor: "rgba(5,145,255,0.5)",
            pointBorderColor: RearrangeData["color"],
            pointBackgroundColor: RearrangeData["color"],
            pointRadius: RearrangeData["point"],
          },
        ],
      };
      dataType = <Line options={optionsGraph} data={dataGraph} />;
    }
    setInformation(<div style={{ width: "400px" }}>{dataType}</div>);
  };

  const replaceHistory = (data) => {
    let dataRawValue = [];
    let dataRawLabel = [];
    if (data["lab_order_result" !== null]) {
      dataRawValue = [
        data["lab_order_result"]
          ? data["lab_order_result"].replace(/,/g, "")
          : null,
        null,
        null,
        null,
        null,
      ];
      dataRawLabel = [data["order_date_time"], null, null, null, null];
    } else {
      for (let i = 0; i < 5; i++) {
        if (!!data[i]) {
          dataRawValue[i] = data[i]["lab_order_result"]
            ? data[i]["lab_order_result"].replace(/,/g, "")
            : null;
          dataRawLabel[i] = data[i]["order_date_time"];
        } else {
          dataRawValue[i] = null;
          dataRawLabel[i] = null;
        }
      }
    }
    return { value: dataRawValue, label: dataRawLabel };
  };

  const warningModalBox = (record) => {
    if (record.target.checked) {
      console.log("add");
      setRerunArray([...rerunArray, record.target.lab_items_code]);
    } else {
      console.log("remove");
      setRerunArray(
        rerunArray.filter((items, i) => items !== record.target.lab_items_code)
      );
    }

    console.log(rerunArray);
  };

  return (
    <div>
      <table
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
          borderCollapse: "collapse",
          maxHeight: "485px",
        }}
      >
        <thead className={"ant-table-thead"}>
          <tr>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
            >
              Test Name
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"10%"}
            >
              ผลตรวจเครื่อง
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"15%"}
            >
              ผลตรวจเอง
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"5%"}
            >
              Flag
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"5%"}
            ></th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              Rerun
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"5%"}
            ></th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"15%"}
            >
              หน่วย
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"15%"}
            >
              ค่าปกติ
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              P#1
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              P#2
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              P#3
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              P#4
            </th>
            <th
              style={{ padding: "8px 8px", backgroundColor: "#f1ffb8" }}
              className={"ant-table-cell"}
              width={"8%"}
            >
              P#5
            </th>
          </tr>
        </thead>
        <tbody className={"ant-row-design"}>
          {!!data ? (
            data.length > 0 ? (
              data.map((item, index) => {
                if (
                  dataItemGroupSelect === "All" ||
                  dataItemGroupSelect === item["group_code"]
                ) {
                  let text;
                  let arrayHistory;
                  if (!!item["history"]) {
                    arrayHistory = replaceHistory(item["history"]);
                  } else {
                    arrayHistory = {
                      value: [
                        data["lab_order_result"]
                          ? data["lab_order_result"].replace(/,/g, "")
                          : null,
                        null,
                        null,
                        null,
                        null,
                      ],
                      label: [data["order_date_time"], null, null, null, null],
                    };
                  }
                  if (
                    index === 0 ||
                    data[index].sub_code !== data[index - 1].sub_code
                  ) {
                    if (data[index].sub_code !== null) {
                      text = (
                        <tr style={{ borderTop: "1px solid #f0f0f0" }}>
                          <td
                            style={{
                              padding: "8px 8px",
                              border: "1px solid #f0f0f0",
                            }}
                            colSpan={15}
                          >
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
                      <tr>
                        <td
                          style={{
                            padding: "8px 8px",
                            border: "1px solid #f0f0f0",
                            cursor: "pointer",
                          }}
                          onMouseOver={() => {
                            setItemCodeSelect(item["lab_items_code"]);
                            let currentHistory = {
                              value: item["lab_order_result_manual"]
                                ? item["lab_order_result_manual"].replace(
                                    /,/g,
                                    ""
                                  )
                                : item["lab_order_result_instrument"]
                                ? item["lab_order_result_instrument"].replace(
                                    /,/g,
                                    ""
                                  )
                                : null,
                              label: item["order_date_time"],
                            };
                            openGraph(
                              item["lab_items_name"],
                              {
                                value: [
                                  currentHistory["value"],
                                  ...arrayHistory["value"],
                                ],
                                label: [
                                  currentHistory["label"],
                                  ...arrayHistory["label"],
                                ],
                              },
                              isNaN(currentHistory["value"]) ||
                                isNaN(arrayHistory["value"][0]) ||
                                isNaN(arrayHistory["value"][1]) ||
                                isNaN(arrayHistory["value"][2]) ||
                                isNaN(arrayHistory["value"][3]) ||
                                isNaN(arrayHistory["value"][4])
                            );
                          }}
                        >
                          <Popover
                            placement="leftBottom"
                            content={information}
                            title={titleInformation}
                          >
                            {item["lab_items_sub_group_name"] !== null ? (
                              <div
                                style={{ width: "100%", paddingLeft: "15px" }}
                              >
                                {item["lab_items_name"]}
                              </div>
                            ) : (
                              <div style={{ width: "100%" }}>
                                {item["lab_items_name"]}
                              </div>
                            )}
                          </Popover>
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          {item["lab_order_result_instrument"]}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <Input
                            defaultValue={item["lab_order_result_manual"]}
                            onChange={changeInput_lab_order_result_manual}
                            id={item["lab_items_code"]}
                            key={
                              item["lab_order_number"] + item["lab_items_code"]
                            }
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
                        <td
                          style={{ border: "1px solid #f0f0f0", color: "red" }}
                        >
                          {item["lab_order_result_rerun"] ? (
                            <WarningOutlined onClick={warningModalBox} />
                          ) : null}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          {item["lab_order_result_rerun"]}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <Checkbox
                            key={
                              item["lab_order_number"] + item["lab_items_code"]
                            }
                            lab_items_code={item["lab_items_code"]}
                            lab_order_result_rerun={
                              item["lab_order_result_rerun"]
                            }
                            // checked={
                            //   (checkRerun &&
                            //     !!item["lab_order_result_rerun"]) ||
                            //   rerunArray.includes(item["lab_items_code"])
                            // }
                            disabled={!item["lab_order_result_rerun"]}
                            onChange={warningModalBox}
                          />
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          {item["lab_items_unit"]}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          {item["lab_items_normal_value"]}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <TT title={arrayHistory["label"][0]}>
                            {arrayHistory["value"][0]}
                          </TT>
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <TT title={arrayHistory["label"][1]}>
                            {arrayHistory["value"][1]}
                          </TT>
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <TT title={arrayHistory["label"][2]}>
                            {arrayHistory["value"][2]}
                          </TT>
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <TT title={arrayHistory["label"][3]}>
                            {arrayHistory["value"][3]}
                          </TT>
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <TT title={arrayHistory["label"][4]}>
                            {arrayHistory["value"][4]}
                          </TT>
                        </td>
                      </tr>
                    </>
                  );
                }
              })
            ) : (
              <tr key={"55555"}>
                <td colSpan={15}>
                  <Empty description={false} style={{ padding: "20px" }} />
                </td>
              </tr>
            )
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LabOrderComponent;
