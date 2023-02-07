import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, Table, Input, Button, Space} from 'antd';

const LabReject = () => {
    const onChangedDateStart = (date, dateString) => { setdatestart(dateString); }
    const onChangedDateStop = (date, dateString) => { setdatestop(dateString); }
    const [date_start, setdatestart] = useState('2022-09-01');
    const [date_stop, setdatestop] = useState('2023-02-01');
    const [lab_order_number, setlabordernumber] = useState();
    const [data, setData] = useState();

    const columns = [
    {
        title: 'วันที่',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Ward',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Lab Order Number',
        dataIndex: 'lab_order_number',
        key: 'lab_order_number',
    },
    {
        title: 'ไม่มีรายการตรวจทาง LAB',
        dataIndex: 'ch1',
        key: 'ch1',
    },
    {
        title: 'เจาเลือดไม่ถูกชนิด',
        dataIndex: 'ch2',
        key: 'ch2',
    },
    {
        title: 'ชื่อในใบกับหลอดเลือดไม่ตรงกัน',
        dataIndex: 'ch3',
        key: 'ch3',
    },
    {
        title: 'ปิดฝาหลอดเลือดสลับกัน',
        dataIndex: 'ch4',
        key: 'ch4',
    },
    {
        title: 'ไม่มีฉลากติด',
        dataIndex: 'ch5',
        key: 'ch5',
    },
    {
        title: 'Hemolysis',
        dataIndex: 'ch6',
        key: 'ch6',
    },
    {
        title: 'เลือด Clotted (CBC, FBS)',
        dataIndex: 'ch7',
        key: 'ch7',
    },
    {
        title: 'ไม่มีใบนำส่ง',
        dataIndex: 'ch8',
        key: 'ch8',
    },
    {
        title: 'ไม่มี Sample',
        dataIndex: 'ch9',
        key: 'ch9',
    },
    {
        title: 'ส่ง LAB ผิด',
        dataIndex: 'ch10',
        key: 'ch10',
    },
    {
        title: 'ปริมาณ Sample ไม่ถูกต้อง',
        dataIndex: 'ch11',
        key: 'ch11',
    },
    {
        title: 'อื่นๆ',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: 'ผู้ตรวจสอบ / ผู้เเจ้ง',
        dataIndex: 'name_call',
        key: 'name_call',
    },
    {
        title: 'แนวทางแก้ไข',
        dataIndex: 'edit',
        key: 'edit',
    },
    {
        title: 'ผู้รับแจ้ง',
        dataIndex: 'name_rec',
        key: 'name_rec',
    },
    {
        title: 'เวลาที่แจ้ง',
        dataIndex: 'date',
        key: 'date',
    },];

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_lis_order_reject',
        {date_start:date_start, date_stop:date_stop, lab_order_number:lab_order_number})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <a>From: </a><DatePicker onChange={onChangedDateStart}/>
        <a> To: </a><DatePicker onChange={onChangedDateStop}/>
        <a> </a>
        <a>HN: </a>
        <input type="text" value={lab_order_number} onChange={e => setlabordernumber(e.target.value)}/>
        <br></br>
        <br></br>
        <Button type="primary" shape="round" onClick = {sendValue}>Reload</Button>
        <a> </a>
        <Button shape="round" onClick = {sendValue}>Print</Button>
        <Table dataSource={data} rowKey={'lab_order_number'} columns={columns}/>
      </div>
    )
}

export default LabReject
