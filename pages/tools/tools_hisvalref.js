import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const tools_hisvalref = () => {
    
    const [data, setData] = useState();

    const columns = [
    {
        title: 'Instrument',
        dataIndex: 'Instrument',
        key: 'Instrument',
    },
    {
        title: 'Link EQ',
        dataIndex: 'Link_EQ',
        key: 'Link_EQ',
    },
    {
        title: 'LIS Item Code',
        dataIndex: 'Item_Code_LIS',
        key: 'Item_Code_LIS',
    },
    {
        title: 'HIS Item Code',
        dataIndex: 'Item_Code_HIS',
        key: 'Item_Code_HIS',
    },
    {
        title: 'Item Name',
        dataIndex: 'LIS_Items_Name',
        key: 'LIS_Items_Name',
    },
    {
        title: 'Abb Name',
        dataIndex: 'Abb_Name',
        key: 'Abb_Name',
    },
    {
        title: 'Sugar',
        dataIndex: 'Sugar',
        key: 'Sugar',
    },
    {
        title: 'Calculation',
        dataIndex: 'Calculation',
        key: 'Calculation',
    },
    {
        title: 'Remark',
        dataIndex: 'Remark',
        key: 'Remark',
    },
    {
        title: 'Profile',
        dataIndex: 'Profile',
        key: 'Profile',
    }];

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_lis_link_instrument')
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <button onClick = {sendValue}>Show Data</button>
        <Table dataSource={data} rowKey={'id_link_instrument'} columns={columns}/>
      </div>
    )
}

export default tools_hisvalref
