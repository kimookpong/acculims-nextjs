import React, { useState, useRef } from 'react';
import axios from 'axios';
import { DatePicker, Table, Input, Button } from 'antd';

const ControlLogPage = () => {
    const componentRef = useRef();

    const onChangedDateStart = (date, dateString) => { setDatestart(dateString); }
    const onChangedDateStop = (date, dateString) => { setDatestop(dateString); }
    const [date_start, setDatestart] = useState('2023-03-01');
    const [date_stop, setDatestop] = useState('2023-06-01');

    const [test_name, setTestname] = useState();
    const [data_control, setDataControl] = useState();
    const [data_test, setDataTest] = useState();

    const [value, setValue] = useState([]);
    const handleMenuClick = e => { setValue(e.key) };

    const columns_control = [
    {
        title: 'Lot Name',
        dataIndex: 'lot_name',
        key: 'lot_name',
    },
    {
        title: 'Lot Number',
        dataIndex: 'lot_number',
        key: 'lot_number',
    },
    {
        title: 'วันที่เปิดใช้',
        dataIndex: 'date_add',
        key: 'date_add',
    },
    {
        title: 'วันหมดอายุ',
        dataIndex: 'date_expire',
        key: 'date_expire',
    },
    {
        title: 'ชื่อการทดสอบ',
        dataIndex: 'test_name',
        key: 'test_name',
    },
    {
        title: 'Control Level',
        dataIndex: 'control_level',
        key: 'control_level',
    },
    {
        title: 'Control Mean',
        dataIndex: 'control_mean',
        key: 'control_mean',
    },
    {
        title: 'Control SD',
        dataIndex: 'control_sd',
        key: 'control_sd',
    },];

    const columns_test = [
        {
            title: 'วันที่',
            dataIndex: 'date_add',
            key: 'date_add',
        },
        {
            title: 'ชื่อการทดสอบ',
            dataIndex: 'test_name',
            key: 'test_name',
        },
        {
            title: 'ค่าตรวจวัด',
            dataIndex: 'test_value',
            key: 'test_value',
        },
    ];

    async function sendValue(value) {
        axios.post('/api/get_qc_control',
        {date_start:date_start, date_stop:date_stop, test_name:test_name})
            .then(response => {
            console.log(response.data);
            setDataControl(response.data);
            })
            .catch(error => { console.error(error); }
        );

        axios.post('/api/get_qc_test',
        {date_start:date_start, date_stop:date_stop, test_name:test_name})
            .then(response => {
            console.log(response.data);
            setDataTest(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <a>From: </a><DatePicker onChange={onChangedDateStart}/>
        <a> To: </a><DatePicker onChange={onChangedDateStop}/>
        <p>Select Test: </p>
        <input type="text" value={test_name} onChange={e => setTestname(e.target.value)}/>
        <br></br>
        <br></br>
        <div ref={componentRef}>
            <Table
            dataSource={data_control}
            rowKey={"id"}
            columns={columns_control}
            size="small"
            scroll={{ x: 1500, }}
            />

            <Table
            dataSource={data_test}
            rowKey={"id"}
            columns={columns_test}
            size="small"
            scroll={{ x: 1500, }}
            />
        </div>
        <Button type="primary" shape="round" onClick = {sendValue}>Reload</Button>
      </div>
    )
}

export default ControlLogPage
