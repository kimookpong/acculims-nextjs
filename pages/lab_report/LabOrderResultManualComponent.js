import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { LineChartOutlined, WarningOutlined } from "@ant-design/icons";

const LabOrderResultManualComponent = (props) => {
  let minValue = null;
  let maxValue = null;
  const {
    item,
    reportStatus,
    formDisable,
    labOrderData,
    labOrderNumber,
    checkCritical,
    checkCriticalValue,
    actionDeltaCheck,
    showModalCritical,
  } = props;

  //find min and max
  let rangevalue = !!item ? item["lab_items_normal_value"] : null;
  if (!!rangevalue) {
    if (rangevalue.includes("-")) {
      minValue = parseFloat(rangevalue.split("-")[0]);
      maxValue = parseFloat(rangevalue.split("-")[1]);
    } else if (rangevalue.includes("<")) {
      minValue = parseFloat(rangevalue.split("<")[1]);
    } else if (rangevalue.includes(">")) {
      maxValue = parseFloat(rangevalue.split(">")[1]);
    }
  }
  // let itemFlag = !!item ? (
  //   item["flag"] === "H" ? (
  //     <b style={{ color: "red" }}>{item["flag"]}</b>
  //   ) : item["flag"] === "L" ? (
  //     <b style={{ color: "blue" }}>{item["flag"]}</b>
  //   ) : (
  //     <>{item["flag"]}</>
  //   )
  // ) : (
  //   <></>
  // );
  // const setItemFlag = (dataFlag) => {
  //   itemFlag = dataFlag;
  // };
  const [itemCri, setItemCri] = useState(
    !!item ? (
      !!item["lab_order_result_manual"] ? (
        parseFloat(item["lab_order_result_manual"]) >
          parseFloat(item["critical_range_max"]) ||
        parseFloat(item["lab_order_result_manual"]) <
          parseFloat(item["critical_range_min"]) ? (
          <WarningOutlined
            onClick={() => {
              //actionDeltaCheck(item);
              showModalCritical();
            }}
          />
        ) : (
          <></>
        )
      ) : !!item["lab_order_result_instrument"] ? (
        parseFloat(item["lab_order_result_instrument"]) >
          parseFloat(item["critical_range_max"]) ||
        parseFloat(item["lab_order_result_instrument"]) <
          parseFloat(item["critical_range_min"]) ? (
          <WarningOutlined
            onClick={() => {
              //actionDeltaCheck(item);
              showModalCritical();
            }}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )
    ) : (
      <></>
    )
  );
  const [itemFlag, setItemFlag] = useState(
    !!item ? (
      item["flag"] === "H" ? (
        <b style={{ color: "red" }}>{item["flag"]}</b>
      ) : item["flag"] === "L" ? (
        <b style={{ color: "blue" }}>{item["flag"]}</b>
      ) : (
        <>{item["flag"]}</>
      )
    ) : (
      <></>
    )
  );

  const checkCriticalValueEvent = (event) => {
    if (!!event.target.value) {
      if (!!item["critical_range_min"] || !!item["critical_range_max"]) {
        if (
          parseFloat(event.target.value) <
            parseFloat(item["critical_range_min"]) ||
          parseFloat(event.target.value) >
            parseFloat(item["critical_range_max"])
        ) {
          setItemCri(
            <WarningOutlined
              onClick={() => {
                //actionDeltaCheck(item);
                showModalCritical();
              }}
            />
          );
        } else {
          setItemCri();
        }
      } else {
        setItemCri();
      }
    } else {
      setItemCri();
    }

    checkCritical({
      lab_items_code: event.target.id,
      lab_order_result_manual: event.target.value,
      lab_order_result_instrument: item["lab_order_result_instrument"],
      lab_items_name: item["lab_items_name"],
      critical_range_min: item["critical_range_min"],
      critical_range_max: item["critical_range_max"],
    });
  };

  const changeInput_lab_order_result_manual_realtime = (event) => {
    return axios
      .post("/api/lab_report_update_realtime", {
        lab_order_number: labOrderNumber,
        lab_items_code: event.target.id,
        lab_order_result_manual: event.target.value,
        lab_order_result: !!event.target.value
          ? event.target.value
          : !!item["lab_order_result_instrument"]
          ? item["lab_order_result_instrument"]
          : "",
        flag: checkHighLow(event),
      })
      .then(function (response) {
        console.log(response.data);
      });
  };
  const changeInput_lab_order_result_manual = (event) => {
    labOrderData(event.target.id, event.target.value, checkHighLow(event));
  };

  const checkHighLow = (event) => {
    checkCriticalValueEvent(event);
    if (!!event.target.value) {
      if (
        item["normal_value_max"] &&
        parseFloat(event.target.value) > parseFloat(item["normal_value_max"])
      ) {
        setItemFlag(<b style={{ color: "red" }}>H</b>);
        return "H";
      } else if (
        item["normal_value_min"] &&
        parseFloat(event.target.value) < parseFloat(item["normal_value_min"])
      ) {
        setItemFlag(<b style={{ color: "blue" }}>L</b>);
        return "L";
      } else if (maxValue && parseFloat(event.target.value) > maxValue) {
        setItemFlag(<b style={{ color: "red" }}>H</b>);
        return "H";
      } else if (minValue && parseFloat(event.target.value) < minValue) {
        setItemFlag(<b style={{ color: "blue" }}>L</b>);
        return "L";
      } else {
        setItemFlag(<></>);
        return "";
      }
    } else {
      setItemFlag(<></>);
      return "";
    }
  };

  return (
    <>
      <td style={{ border: "1px solid #f0f0f0" }}>
        {!!item ? (
          reportStatus === "Pending" ||
          reportStatus === "Process" ||
          reportStatus === "Completed" ? (
            <Input
              defaultValue={item["lab_order_result_manual"]}
              onBlur={changeInput_lab_order_result_manual_realtime}
              onChange={checkHighLow}
              id={item["lab_items_code"]}
              key={item["lab_order_number"] + item["lab_items_code"]}
            />
          ) : (
            <Input
              defaultValue={item["lab_order_result_manual"]}
              onChange={changeInput_lab_order_result_manual}
              id={item["lab_items_code"]}
              key={item["lab_order_number"] + item["lab_items_code"]}
              disabled={formDisable}
            />
          )
        ) : null}
      </td>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #f0f0f0",
        }}
      >
        {!!item ? itemFlag : null}
      </td>
      <td style={{ border: "1px solid #f0f0f0", color: "red" }}>{itemCri}</td>
    </>
  );
};
export default LabOrderResultManualComponent;
