import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const tools_logvalref = () => {
    
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
        axios.post('http://localhost:3000/api/get_approved_log')
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <Table dataSource={data} rowKey={'id_link_instrument'} columns={columns}/>
        <button onClick = {sendValue}>Refresh</button>
      </div>
    )
}

export default tools_logvalref