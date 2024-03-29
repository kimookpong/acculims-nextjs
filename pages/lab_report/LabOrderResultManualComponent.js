import { Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { LineChartOutlined, WarningOutlined } from "@ant-design/icons";

const LabOrderResultManualComponent = (props) => {
  const {
    item,
    reportStatus,
    formDisable,
    labOrderData,
    labOrderNumber,
    checkCritical,
    showModalCritical,
    handleKeyPress,
    inputRefs,
    index,
  } = props;

  //find min and max
  //let rangevalue = "";
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [itemCri, setItemCri] = useState();
  const [itemFlag, setItemFlag] = useState();

  useEffect(() => {
    //setRangevalue(!!item ? item["lab_items_normal_value"] : null);
    let rangevalue = !!item ? item["lab_items_normal_value"] : null;
    if (!!rangevalue) {
      if (rangevalue.includes("-")) {
        setMinValue(parseFloat(rangevalue.split("-")[0]));
        setMaxValue(parseFloat(rangevalue.split("-")[1]));
      } else if (rangevalue.includes("<")) {
        setMinValue(parseFloat(rangevalue.split("<")[1]));
      } else if (rangevalue.includes(">")) {
        setMaxValue(parseFloat(rangevalue.split(">")[1]));
      }
    }
    setItemFlag(
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
    setItemCri(
      !!item ? (
        !!item["lab_order_result_manual"] ? (
          parseFloat(item["lab_order_result_manual"]) >
            parseFloat(item["critical_range_max"]) ||
          parseFloat(item["lab_order_result_manual"]) <
            parseFloat(item["critical_range_min"]) ? (
            <WarningOutlined
              onClick={() => {
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
  }, [item]);

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
  const eventCheck = (event) => {
    checkHighLow(event);
    checkCriticalValueEvent(event);
  };

  const checkHighLow = (event) => {
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
      } else if (!!maxValue && parseFloat(event.target.value) > maxValue) {
        setItemFlag(<b style={{ color: "red" }}>H</b>);
        return "H";
      } else if (!!minValue && parseFloat(event.target.value) < minValue) {
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
              onChange={eventCheck}
              id={item["lab_items_code"]}
              key={item["lab_order_number"] + item["lab_items_code"]}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ) : (
            <Input
              defaultValue={item["lab_order_result_manual"]}
              onBlur={changeInput_lab_order_result_manual}
              onChange={eventCheck}
              id={item["lab_items_code"]}
              key={item["lab_order_number"] + item["lab_items_code"]}
              disabled={formDisable}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
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
