import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Button, Table, Spin } from "antd";

import ExportExcel from "./ExportExcel";

const ToolsStatreport = () => {
  const [loadingData, setLoadingData] = useState(false);
  const onChangedDateStart = (date, dateString) => {
    setdatestart(dateString);
  };
  const onChangedDateStop = (date, dateString) => {
    setdatestop(dateString);
  };
  const [date_start, setdatestart] = useState("2022-09-01");
  const [date_stop, setdatestop] = useState("2023-02-01");

  const [data, setData] = useState();

  const columns = [
    {
      title: "Lab Order Number",
      dataIndex: "lab_order_number",
      key: "lab_order_number",
    },
    {
      title: "Doctor Code",
      dataIndex: "doctor_code",
      key: "doctor_code",
    },
    {
      title: "VN",
      dataIndex: "vn",
      key: "vn",
    },
    {
      title: "Lab Head Remark",
      dataIndex: "lab_head_remark",
      key: "lab_head_remark",
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Report Date",
      dataIndex: "report_date",
      key: "report_date",
    },
    {
      title: "Report Name",
      dataIndex: "report_name",
      key: "report_name",
    },
    {
      title: "Report Time",
      dataIndex: "report_time",
      key: "report_time",
    },
    {
      title: "Confirm Report",
      dataIndex: "confirm_report",
      key: "confirm_report",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Form Name",
      dataIndex: "form_name",
      key: "form_name",
    },
    {
      title: "Order Time",
      dataIndex: "order_time",
      key: "order_time",
    },
    {
      title: "Receive Date",
      dataIndex: "receive_date",
      key: "receive_date",
    },
    {
      title: "Receive Time",
      dataIndex: "receive_time",
      key: "receive_time",
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Approved Staff",
      dataIndex: "approve_staff",
      key: "approve_staff",
    },
    {
      title: "LIS Order No",
      dataIndex: "lis_order_no",
      key: "lis_order_no",
    },
    {
      title: "Receive Computer",
      dataIndex: "receive_computer",
      key: "receive_computer",
    },
    {
      title: "Order Department",
      dataIndex: "order_department",
      key: "order_department",
    },
    {
      title: "Lab Perform Status ID",
      dataIndex: "lab_perform_status_id",
      key: "lab_perform_status_id",
    },
    {
      title: "Receive Status",
      dataIndex: "receive_status",
      key: "receive_status",
    },
    {
      title: "Report Status",
      dataIndex: "report_status",
      key: "report_status",
    },
    {
      title: "Approver Name",
      dataIndex: "approver_name",
      key: "approver_name",
    },
    {
      title: "Approved Date",
      dataIndex: "approved_date",
      key: "approved_date",
    },
    {
      title: "Approved Time",
      dataIndex: "approved_time",
      key: "approved_time",
    },
    {
      title: "HOSxp LIS No",
      dataIndex: "HOSxP4LISNO",
      key: "HOSxP4LISNO",
    },
  ];

  async function sendValue(value) {
    setLoadingData(true);
    return axios
      .post("/api/get_report_log", {
        date_start: date_start,
        date_stop: date_stop,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);

        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <a>From: </a>
      <DatePicker format="DD-MM-YYYY" onChange={onChangedDateStart} />
      <a> To: </a>
      <DatePicker format="DD-MM-YYYY" onChange={onChangedDateStop} />
      <a> </a>
      <Button shape="round" type="primary" onClick={sendValue}>
        Display Data
      </Button>
      <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล">
        <Table
          dataSource={data}
          rowKey={"lab_order_number"}
          columns={columns}
          size="small"
          scroll={{
            x: 1500,
          }}
        />
      </Spin>
      <br></br>
      <p>Download Report</p>
      <ExportExcel excelData={data} fileName={"Statistic Report"} />
      <br></br>

      <a> </a>
      <Button shape="round">Workload Report</Button>
      <a> </a>
      <Button shape="round">Turn around time Report</Button>
    </div>
  );
};

export default ToolsStatreport;
