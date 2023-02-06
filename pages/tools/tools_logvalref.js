import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Table } from 'antd';

const tools_logvalref = () => {    
    const onChangedDateStart = (date, dateString) => { setdatestart(dateString); }
    const onChangedDateStop = (date, dateString) => { setdatestop(dateString); }
    const [date_start, setdatestart] = useState('2022-09-01');
    const [date_stop, setdatestop] = useState('2023-02-01');

    const [data, setData] = useState();

    const columns = [
    {
        title: 'Date Time',
        dataIndex: 'date_time',
        key: 'date_time',
    },
    {
        title: 'Approved Drder',
        dataIndex: 'approved_order',
        key: 'approved_order',
    },
    {
        title: 'Computer Name',
        dataIndex: 'com_name',
        key: 'com_name',
    },
    {
        title: 'Report Name',
        dataIndex: 'report_name',
        key: 'report_name',
    },
    {
        title: 'Approved Name',
        dataIndex: 'approved_name',
        key: 'approved_name',
    }];

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_approved_log',
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
        <a>From: </a><DatePicker onChange={onChangedDateStart}/>
        <a> To: </a><DatePicker onChange={onChangedDateStop}/>
        <Table dataSource={data} rowKey={'id_link_instrument'} columns={columns}/>
        <button onClick = {sendValue}>Refresh</button>
      </div>
    )
}

export default tools_logvalref