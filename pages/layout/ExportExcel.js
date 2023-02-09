import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const ExportExcel = ({ excelData, fileName }) => {
  useEffect(() => {
    if (!!excelData) {
      console.log("yes");
    } else {
      console.log("no");
    }
  }, [excelData]);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    if (!!excelData) {
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }
  };

  return (
    <Button
      onClick={() => exportToExcel("Statistic Report")}
      style={{
        padding: 10,
        cursor: "pointer",
        height: "auto",
        minWidth: 100,
      }}
    >
      <div>
        <FileExcelOutlined
          style={{
            fontSize: 40,
          }}
        />
      </div>
      <div>ส่งออกเป็น Excel</div>
    </Button>
  );
};

export default ExportExcel;
