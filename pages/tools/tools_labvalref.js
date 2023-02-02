import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, Table} from 'antd';

function page() {
    
    const [lab_group, setlabgroup] = useState();
    const [lab_name, setlabname] = useState();
    const [data, setData] = useState();

    const columns = [
    {
        title: 'รหัส',
        dataIndex: 'lab_items_code',
        key: 'lab_items_code',
    },
    {
        title: 'Order',
        dataIndex: 'display_order',
        key: 'display_order',
    },
    {
        title: 'Sub Group',
        dataIndex: '',
        key: '',
    },
    {
        title: 'ชื่อ Lab',
        dataIndex: 'lab_items_name',
        key: 'lab_items_name',
    },
    {
        title: 'หน่วย',
        dataIndex: 'lab_items_unit',
        key: 'lab_items_unit',
    },
    {
        title: 'ค่าปกติ',
        dataIndex: 'lab_items_normal_value',
        key: 'lab_items_normal_value',
    },
    {
        title: 'คำช่วยเหลือ',
        dataIndex: 'lab_items_hint',
        key: 'lab_items_hint',
    },
    {
        title: 'ค่ามาตรฐาน',
        dataIndex: '',
        key: '',
    },
    {
        title: 'ราคา',
        dataIndex: 'service_price',
        key: 'service_price',
    },
    {
        title: 'Out Lab',
        dataIndex: 'range_check',
        key: 'range_check',
    }];

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_lab_items', {lab_group:lab_group, lab_name:lab_name})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return (
      <div>
        <a>กลุ่ม Lab: </a>
        <input type="text" value={lab_group} onChange={e => setlabgroup(e.target.value)}/>
        <a>ชื่อ Lab: </a>
        <input type="text" value={lab_name} onChange={e => setlabname(e.target.value)}/>
        <br></br>
        <button onClick = {sendValue}>Show</button>
        <Table dataSource={data} rowKey={'lab_order_number'} columns={columns}/>
      </div>
    )
}

export default page