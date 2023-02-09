import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Button, Table } from "antd";

import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const ExportExcel = ({ excelData, fileName }) => {
  console.log(excelData);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button shape="round" onClick={() => exportToExcel("Statistic Report")}>
      Work Sheet
    </Button>
  );
};

export default ExportExcel;
