import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Button, Table } from 'antd';

import XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';

const ToolsStatreport = () => {
    
    const onChangedDateStart = (date, dateString) => { setdatestart(dateString); }
    const onChangedDateStop = (date, dateString) => { setdatestop(dateString); }
    const [date_start, setdatestart] = useState('2022-09-01');
    const [date_stop, setdatestop] = useState('2023-02-01');

    const [data, setData] = useState();

    const ExportExcel = ({excelData, fileName}) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
        const fileExtension = '.xlsx';

        const exportToExcel = async () => {
           const ws = XLSX.utils.json_to_sheet(excelData);
           const wb = { Sheets: { 'data': ws }, SheetNames: ['data']};
           const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
           const data = new Blob([excelBuffer], { type: fileType });
           FileSaver.saveAs(data, fileName + fileExtension);
        }
    }

    const columns = [
        {
            title: 'Lab Order Number',
            dataIndex: 'lab_order_number',
            key: 'lab_order_number',
        },
        {
            title: 'Doctor Code',
            dataIndex: 'doctor_code',
            key: 'doctor_code',
        },
        {
            title: 'VN',
            dataIndex: 'vn',
            key: 'vn',
        },
        {
            title: 'Lab Head Remark',
            dataIndex: 'lab_head_remark',
            key: 'lab_head_remark',
        },
        {
            title: 'HN',
            dataIndex: 'hn',
            key: 'hn',
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            key: 'order_date',
        },
        {
            title: 'Report Date',
            dataIndex: 'report_date',
            key: 'report_date',
        },
        {
            title: 'Report Name',
            dataIndex: 'report_name',
            key: 'report_name',
        },
        {
            title: 'Report Time',
            dataIndex: 'report_time',
            key: 'report_time',
        },
        {
            title: 'Confirm Report',
            dataIndex: 'confirm_report',
            key: 'confirm_report',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Form Name',
            dataIndex: 'form_name',
            key: 'form_name',
        },
        {
            title: 'Order Time',
            dataIndex: 'order_time',
            key: 'order_time',
        },
        {
            title: 'Receive Date',
            dataIndex: 'receive_date',
            key: 'receive_date',
        },
        {
            title: 'Receive Time',
            dataIndex: 'receive_time',
            key: 'receive_time',
        },
        {
            title: 'Ward',
            dataIndex: 'ward',
            key: 'ward',
        },
        {
            title: 'Approved Staff',
            dataIndex: 'approve_staff',
            key: 'approve_staff',
        },
        {
            title: 'LIS Order No',
            dataIndex: 'lis_order_no',
            key: 'lis_order_no',
        },
        {
            title: 'Receive Computer',
            dataIndex: 'receive_computer',
            key: 'receive_computer',
        },
        {
            title: 'Order Department',
            dataIndex: 'order_department',
            key: 'order_department',
        },
        {
            title: 'Lab Perform Status ID',
            dataIndex: 'lab_perform_status_id',
            key: 'lab_perform_status_id',
        },
        {
            title: 'Receive Status',
            dataIndex: 'receive_status',
            key: 'receive_status',
        },
        {
            title: 'Report Status',
            dataIndex: 'report_status',
            key: 'report_status',
        },
        {
            title: 'Approver Name',
            dataIndex: 'approver_name',
            key: 'approver_name',
        },
        {
            title: 'Approved Date',
            dataIndex: 'approved_date',
            key: 'approved_date',
        },
        {
            title: 'Approved Time',
            dataIndex: 'approved_time',
            key: 'approved_time',
        },
        {
            title: 'HOSxp LIS No',
            dataIndex: 'HOSxP4LISNO',
            key: 'HOSxP4LISNO',
        }];

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_report_log',
        {date_start:date_start, date_stop:date_stop})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <a>From: </a><DatePicker format="DD-MM-YYYY" onChange={onChangedDateStart}/>
        <a> To: </a><DatePicker format="DD-MM-YYYY" onChange={onChangedDateStop}/>
        <a> </a>
        <Button shape="round" type="primary" onClick = {sendValue}>Display Data</Button>
        <Table dataSource={data} rowKey={'lab_order_number'} columns={columns}/>
        <br></br>
        <p>Create Report</p>
        <ExportExcel excelData={data} fileName={"Statistic Report"}/>
      </div>
    )
}

export default ToolsStatreport