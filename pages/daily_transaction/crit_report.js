import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, Table, Button} from 'antd';
import styles from '../../styles/Home.module.css'

const CritReport = () => {
    
    const onChangedDateStart = (date, dateString) => { setdatestart(dateString); }
    const onChangedDateStop = (date, dateString) => { setdatestop(dateString); }
    const [date_start, setdatestart] = useState('2022-09-01');
    const [date_stop, setdatestop] = useState('2023-02-01');
    const [hn, sethn] = useState();
    const [patient_name, setpname] = useState();
    const [call_name, setcall] = useState();
    const [take_name, settake] = useState();
    const [data, setData] = useState();

    const columns = [
    {
        title: 'วันที่',
        dataIndex: 'date_save',
        key: 'date_save',
    },
    {
        title: 'เวลา',
        dataIndex: 'time_call',
        key: 'time_call',
    },
    {
        title: 'ผู้โทร',
        dataIndex: 'call_name',
        key: 'call_name',
    },
    {
        title: 'หน่วยงาน',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'HN',
        dataIndex: 'hn',
        key: 'hn',
    },
    {
        title: 'ชื่อ-สกุล',
        dataIndex: 'patient_name',
        key: 'patient_name',
    },
    {
        title: 'เพิ่ม LAB',
        dataIndex: 'test_name',
        key: 'test_name',
    },
    {
        title: 'ยกเลิก LAB',
        dataIndex: '',
        key: '',
    },
    {
        title: 'ค่าวิกฤติ',
        dataIndex: 'critical_ref',
        key: 'critical_ref',
    },
    {
        title: 'ผล LAB',
        dataIndex: 'result',
        key: 'result',
    },
    {
        title: 'เวลา',
        dataIndex: 'time_take',
        key: 'time_take',
    },
    {
        title: 'ผู้รับโทรศัพท์',
        dataIndex: 'take_name',
        key: 'take_name',
    },];

    async function sendValue(value) {
        axios.post('/api/get_lis_critical', 
        {date_start:date_start, date_stop:date_stop, hn:hn, patient_name:patient_name, call_name:call_name, take_name:take_name})
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
        <br></br>
        <p className={styles.card}>
            <a>HN: </a>
            <input type="text" value={hn} onChange={e => sethn(e.target.value)}/>
            <br></br>
            <a>ชื่อ-สกุล: </a>
            <input type="text" value={patient_name} onChange={e => setpname(e.target.value)}/>
            <br></br>
            <a>ชื่อผู้โทร: </a>
            <input type="text" value={call_name} onChange={e => setcall(e.target.value)}/>
            <br></br>
            <a>ชื่อผู้รับสาย: </a>
            <input type="text" value={take_name} onChange={e => settake(e.target.value)}/>
        </p>
        <Button type="primary" shape="round" onClick = {sendValue}>Reload</Button>
        <a> </a>
        <Button shape="round" onClick = {sendValue}>Print</Button>
        <Table dataSource={data} rowKey={'lab_order_number'} columns={columns}/>
      </div>
    )
}

export default CritReport