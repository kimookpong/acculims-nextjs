import {
  Modal,
  message,
  Empty,
  Input,
  Popover,
  Checkbox,
  Tooltip as TT,
} from "antd";
import { LineChartOutlined, WarningOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
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
import LabOrderCriticalComponent from "./LabOrderCriticalComponent";
import LabOrderResultManualComponent from "./LabOrderResultManualComponent";
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
  const {
    data,
    formDisable,
    labOrderData,
    dataItemGroupSelect,
    checkRerun,
    reportStatus,
    labOrderNumber,
    reloadReport,
    dataLab,
  } = props;

  const [messageApi, messageContext] = message.useMessage();

  const [titleInformation, setTitleInformation] = useState("");
  const [information, setInformation] = useState("");
  const [rerunArray, setRerunArray] = useState([]);
  const [itemCodeSelect, setItemCodeSelect] = useState();
  const [dataCriticalAccept, setCriticalAccept] = useState();

  const [dataCriticalOrderNumber, setCriticalOrderNumber] = useState([]);
  const [formCritical, setFormCritical] = useState();

  // Modal Critical
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalCritical = () => {
    setFormCritical(
      <LabOrderCriticalComponent
        dataItem={dataLab}
        dataCriticalForm={dataCriticalForm}
        dataOrderNumber={criricalValue}
      />
    );

    setIsModalOpen(true);
    console.log(dataCriticalOrderNumber);
  };
  const handleOk = () => {
    dataAcceptForm();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let criricalValue = [];

  useEffect(() => {
    console.log("change critical list", dataCriticalOrderNumber);
  }, [dataCriticalOrderNumber]);
  useEffect(() => {
    setCriticalOrderNumber([]);
    criricalValue = [];
    if (!!data && data.length > 0) {
      data.map((item, index) => {
        let dataCri = checkCriticalDefault(item);
        if (!!dataCri) {
          console.log(index, dataCri);
          criricalValue = [...criricalValue, dataCri];
        }
      });
    }
    setCriticalOrderNumber(criricalValue);
    console.log(criricalValue);
  }, [data]);

  useEffect(() => {
    let dataRaw = rerunArray;
    if (checkRerun) {
      if (!!data && data.length > 0) {
        data.map((item, index) => {
          if (!!item["lab_order_result_rerun"]) {
            dataRaw = [...dataRaw, item["lab_items_code"]];
          }
        });
      }
      rerunAction(dataRaw);
      setRerunArray(dataRaw);
    } else {
      rerunAction([]);
      setRerunArray([]);
    }
  }, [checkRerun]);

  const checkCritical = (dataCri) => {
    criricalValue = dataCriticalOrderNumber;
    let dataDump = [];
    console.log("check", criricalValue);
    let found = criricalValue.find((item) => {
      return item.lab_items_code === parseInt(dataCri.lab_items_code);
    });
    if (dataCri.lab_order_result_manual !== "") {
      if (!!dataCri.critical_range_min || !!dataCri.critical_range_max) {
        if (!!found) {
          console.log("found", found, dataCri);
        } else {
          dataDump = [
            ...criricalValue,
            {
              lab_items_code: parseInt(dataCri["lab_items_code"]),
              lab_items_name: dataCri["lab_items_name"],
              critical_range_min: dataCri["critical_range_min"],
              critical_range_max: dataCri["critical_range_max"],
              lab_order_result_manual: dataCri["lab_order_result_manual"],
              lab_order_result_instrument:
                dataCri["lab_order_result_instrument"],
            },
          ];

          console.log("not found", dataDump);
        }
      }
    } else {
      dataDump = criricalValue.filter(
        (itemThis) =>
          parseInt(itemThis.lab_items_code) !== parseInt(dataCri.lab_items_code)
      );
      criricalValue = dataDump;
      console.log("remove");
    }

    setCriticalOrderNumber(dataDump);
  };

  const checkCriticalDefault = (itemCheckCritical) => {
    if (!!itemCheckCritical["lab_order_result_manual"]) {
      if (
        parseFloat(itemCheckCritical["lab_order_result_manual"]) >
          parseFloat(itemCheckCritical["critical_range_max"]) ||
        parseFloat(itemCheckCritical["lab_order_result_manual"]) <
          parseFloat(itemCheckCritical["critical_range_min"])
      ) {
        return {
          lab_items_code: itemCheckCritical["lab_items_code"],
          lab_items_name: itemCheckCritical["lab_items_name"],
          critical_range_min: itemCheckCritical["critical_range_min"],
          critical_range_max: itemCheckCritical["critical_range_max"],
          lab_order_result_manual: itemCheckCritical["lab_order_result_manual"],
          lab_order_result_instrument:
            itemCheckCritical["lab_order_result_instrument"],
        };
      }
    } else if (!!itemCheckCritical["lab_order_result_instrument"]) {
      if (
        parseFloat(itemCheckCritical["lab_order_result_instrument"]) >
          parseFloat(itemCheckCritical["critical_range_max"]) ||
        parseFloat(itemCheckCritical["lab_order_result_instrument"]) <
          parseFloat(itemCheckCritical["critical_range_min"])
      ) {
        return {
          lab_items_code: itemCheckCritical["lab_items_code"],
          lab_items_name: itemCheckCritical["lab_items_name"],
          critical_range_min: itemCheckCritical["critical_range_min"],
          critical_range_max: itemCheckCritical["critical_range_max"],
          lab_order_result_manual: itemCheckCritical["lab_order_result_manual"],
          lab_order_result_instrument:
            itemCheckCritical["lab_order_result_instrument"],
        };
      }
    }
  };

  const checkCriticalValue = (itemCheckCritical) => {
    if (!!itemCheckCritical["lab_order_result_manual"]) {
      if (
        parseFloat(itemCheckCritical["lab_order_result_manual"]) >
          parseFloat(itemCheckCritical["critical_range_max"]) ||
        parseFloat(itemCheckCritical["lab_order_result_manual"]) <
          parseFloat(itemCheckCritical["critical_range_min"])
      ) {
        return (
          <WarningOutlined
            onClick={() => {
              actionDeltaCheck(itemCheckCritical);
            }}
          />
        );
      }
    } else if (!!itemCheckCritical["lab_order_result_instrument"]) {
      if (
        parseFloat(itemCheckCritical["lab_order_result_instrument"]) >
          parseFloat(itemCheckCritical["critical_range_max"]) ||
        parseFloat(itemCheckCritical["lab_order_result_instrument"]) <
          parseFloat(itemCheckCritical["critical_range_min"])
      ) {
        return (
          <WarningOutlined
            onClick={() => {
              actionDeltaCheck(itemCheckCritical);
            }}
          />
        );
      }
    }
  };

  const rerunAction = (rerunDataArray) => {
    let rerunArrayData = [];
    data.map((itemCheck, index) => {
      if (rerunDataArray.includes(itemCheck["lab_items_code"])) {
        rerunArrayData = [
          ...rerunArrayData,
          {
            lab_items_code: itemCheck["lab_items_code"],
            lab_order_result: !!itemCheck["lab_order_result_manual"]
              ? itemCheck["lab_order_result_manual"]
              : !!itemCheck["lab_order_result_rerun"]
              ? itemCheck["lab_order_result_rerun"]
              : !!itemCheck["lab_order_result_instrument"]
              ? itemCheck["lab_order_result_instrument"]
              : "",
            check_rerun: "R",
          },
        ];
      } else {
        rerunArrayData = [
          ...rerunArrayData,
          {
            lab_items_code: itemCheck["lab_items_code"],
            lab_order_result: !!itemCheck["lab_order_result_manual"]
              ? itemCheck["lab_order_result_manual"]
              : !!itemCheck["lab_order_result_instrument"]
              ? itemCheck["lab_order_result_instrument"]
              : "",
            check_rerun: "",
          },
        ];
      }
    });
    if (rerunDataArray.length > 0) {
      return axios
        .post("/api/lab_report_update_rerun", {
          lab_order_number: labOrderNumber,
          data: rerunArrayData,
        })
        .then(function (response) {});
    }
  };

  const dataCriticalForm = (dataForm) => {
    setCriticalAccept(dataForm);
  };
  const dataAcceptForm = () => {
    if (!!dataCriticalAccept) {
      return axios
        .post("/api/add_lis_critical", {
          data: dataCriticalAccept,
        })
        .then(function (response) {
          console.log(response.data);
          // reloadReport();
        });
    } else {
      messageApi.open({
        type: "error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }
  };

  const actionDeltaCheck = (dataItem) => {
    //criricalValue = dataCriticalOrderNumber;
    console.log(dataCriticalOrderNumber);
    Modal.confirm({
      centered: true,
      title: "บันทึกข้อมูล ค่าวิกฤติ",
      icon: <WarningOutlined />,
      width: 730,
      content: (
        <LabOrderCriticalComponent
          dataItem={dataItem}
          dataCriticalForm={dataCriticalForm}
          dataOrderNumber={criricalValue}
        />
      ),
      onOk() {
        dataAcceptForm();
      },
    });
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
    if (isNotNumber && itemCodeSelect != 963) {
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
            ...RearrangeData["value"],
            parseFloat(dataGraphItem["value"][index]),
          ];

          RearrangeData["label"] = [
            ...RearrangeData["label"],
            dataGraphItem["label"][index],
          ];

          RearrangeData["color"] = [
            ...RearrangeData["color"],
            index === 0 ? "rgba(5,145,255,1)" : "rgba(5,145,255,0.5)",
          ];

          RearrangeData["point"] = [
            ...RearrangeData["point"],
            index !== 0 ? 3 : 5,
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
      rerunAction([...rerunArray, record.target.lab_items_code]);
      setRerunArray([...rerunArray, record.target.lab_items_code]);
    } else {
      rerunAction(
        rerunArray.filter((items, i) => items !== record.target.lab_items_code)
      );
      setRerunArray(
        rerunArray.filter((items, i) => items !== record.target.lab_items_code)
      );
    }
  };

  return (
    <div>
      {messageContext}
      <Modal
        title="บันทึกข้อมูล ค่าวิกฤติ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="730px"
      >
        {formCritical}
      </Modal>
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
                        <tr
                          key={index + "_header"}
                          style={{ borderTop: "1px solid #f0f0f0" }}
                        >
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
                      <tr key={index}>
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
                        <LabOrderResultManualComponent
                          key={item["lab_items_code"]}
                          item={item}
                          reportStatus={reportStatus}
                          formDisable={formDisable}
                          labOrderData={labOrderData}
                          labOrderNumber={labOrderNumber}
                          checkCritical={checkCritical}
                          checkCriticalValue={checkCriticalValue}
                          actionDeltaCheck={actionDeltaCheck}
                          showModalCritical={showModalCritical}
                        />
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          {item["lab_order_result_rerun"]}
                        </td>
                        <td style={{ border: "1px solid #f0f0f0" }}>
                          <Checkbox
                            key={
                              item["lab_order_number"] + item["lab_items_code"]
                            }
                            lab_items_code={item["lab_items_code"]}
                            lab_order_result_instrument={
                              item["lab_order_result_instrument"]
                            }
                            lab_order_result_manual={
                              item["lab_order_result_manual"]
                            }
                            lab_order_result_rerun={
                              item["lab_order_result_rerun"]
                            }
                            checked={
                              rerunArray.includes(item["lab_items_code"]) ||
                              (rerunArray.length === 0 &&
                                item["check_rerun"] === "R")
                            }
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
